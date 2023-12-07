import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setMapInfo } from 'store/modules/mapInfoSlice';
import * as S from '../../styles/kakaoMap/kakaoMap.styled';

const Map = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [places, setPlaces] = useState([]);

  // TODO: 나중에 커스텀 훅 정리
  // useKakaoMap({ x: 33.450701, y: 126.570667 }, document.getElementById('map'));
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_API_KEY}`;
    document.head.appendChild(script);

    script.onload = () => {
      const container = document.getElementById('map');
      const options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 3
      };

      const initialMap = new window.kakao.maps.Map(container, options);
      setMap(initialMap);
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const searchPlaces = () => {
    if (map && keyword) {
      markers.forEach((marker) => marker.setMap(null));

      const ps = new window.kakao.maps.services.Places();
      ps.keywordSearch(keyword, placesSearchCB);
    }
  };

  const placesSearchCB = (data, status, pagination) => {
    if (status === window.kakao.maps.services.Status.OK && map) {
      const bounds = new window.kakao.maps.LatLngBounds();
      const newMarkers = [];
      const newPlaces = [];

      for (let i = 0; i < data.length; i++) {
        const marker = displayMarker(data[i]);
        bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
        newMarkers.push(marker);
        newPlaces.push(data[i]);
      }

      setMarkers(newMarkers);
      map.setBounds(bounds);
      localStorage.setItem('mapInfo', JSON.stringify(newPlaces));

      setPlaces(newPlaces);
      dispatch(setMapInfo(newPlaces));
    }
  };

  const displayMarker = (place) => {
    if (map) {
      const marker = new window.kakao.maps.Marker({
        map: map,
        position: new window.kakao.maps.LatLng(place.y, place.x)
      });

      window.kakao.maps.event.addListener(marker, 'click', function () {
        searchDetailAddrFromCoords(marker.getPosition(), function (result, status) {
          if (status === window.kakao.maps.services.Status.OK) {
            const detailAddr = !!result[0].road_address
              ? result[0].road_address.address_name
              : result[0].address.address_name;

            const infowindow = new window.kakao.maps.InfoWindow({
              content: '<div style="padding:5px;font-size:12px;">' + place.place_name + '<br/>' + detailAddr + '</div>'
            });

            infowindow.open(map, marker);
          }
        });
      });

      return marker;
    }
  };

  const handleEnterKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchPlaces();
      setKeyword('');
    }
  };

  // const handlePlaceItemClick = (place) => {
  //   const center = new window.kakao.maps.LatLng(place.y, place.x);
  //   map.panTo(center);
  // };

  const searchDetailAddrFromCoords = (coords, callback) => {
    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
  };

  return (
    <div>
      <S.SearchWrapper>
        <S.GuideText>키워드 앞에 "지역구"를 붙여주시면 해당 지역으로 검색됩니다. (ex. 종로구 치킨)</S.GuideText>
        <S.SearchElement>
          <input
            type="text"
            placeholder="검색어를 입력하세요."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyPress={handleEnterKeyPress}
          />
          <button onClick={searchPlaces}>검색</button>
        </S.SearchElement>
      </S.SearchWrapper>

      <div>
        <S.SearchListWrapper>
          {places.map((place) => (
            <S.SearchList key={place.id} onClick={() => navigate(`/detail/${place.id}`)}>
              {place.place_name}
            </S.SearchList>
          ))}
        </S.SearchListWrapper>
      </div>

      <div id="map" style={{ width: '0px', height: '0px' }} />
    </div>
  );
};

export default Map;
