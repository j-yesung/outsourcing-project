import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setMapInfo } from 'store/modules/mapInfoSlice';
import * as S from '../../styles/kakaoMap/kakaoMap.styled';
import styled from 'styled-components';

const Map = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState('');
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [places, setPlaces] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [currentInfowindow, setCurrentInfowindow] = useState(null);
  const selectedMarkerInfoWindow = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = '//dapi.kakao.com/v2/maps/sdk.js?appkey=88ac229e7abd107e56c0799e195683f1';
    document.head.appendChild(script);

    script.onload = () => {
      const container = document.getElementById('map');
      const options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 3
      };

      const initialMap = new window.kakao.maps.Map(container, options);
      setMap(initialMap);

      window.kakao.maps.event.addListener(initialMap, 'click', function () {
        if (selectedMarkerInfoWindow.current) {
          selectedMarkerInfoWindow.current.close();
        }
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const displayMarker = (place, index) => {
    if (map) {
      const markerPosition = new window.kakao.maps.LatLng(place.y, place.x);
      const marker = new window.kakao.maps.Marker({
        map: map,
        position: markerPosition
      });

      const customOverlay = new window.kakao.maps.CustomOverlay({
        content: `<div class="customOverlay">${index + 1}</div>`,
        position: markerPosition,
        zIndex: 1
      });

      window.kakao.maps.event.addListener(marker, 'click', function () {
        if (selectedMarkerInfoWindow.current) {
          selectedMarkerInfoWindow.current.close();
        }

        const infowindowContent = `<div style="padding: 5px; font-size: 12px; max-width: 200px; max-height: 200px; overflow: auto;">${place.place_name} - ${place.address_name}<br/>도로명 주소: ${place.road_address_name}</div>`;
        const infowindow = new window.kakao.maps.InfoWindow({
          content: infowindowContent,
          maxWidth: 200, 
          maxHeight: 200 
          });
          infowindow.open(map, marker);

        selectedMarkerInfoWindow.current = infowindow;

        customOverlay.setMap(null);
      });

      return { marker, customOverlay };
    }
  };

  const searchPlaces = () => {
    if (map && keyword) {
      markers.forEach((marker) => marker.marker.setMap(null));
      const ps = new window.kakao.maps.services.Places();
      const center = map.getCenter();
      ps.keywordSearch(keyword, placesSearchCB, {
        location: new window.kakao.maps.LatLng(center.getLat(), center.getLng()),
        radius: 2000
      });
    }
  };

  const placesSearchCB = (data, status, pagination) => {
    if (status === window.kakao.maps.services.Status.OK && map) {
      const bounds = new window.kakao.maps.LatLngBounds();
      const newMarkers = [];
      const newPlaces = [];

      for (let i = 0; i < data.length; i++) {
        const { marker, customOverlay } = displayMarker(data[i], i);
        bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
        newMarkers.push({ marker, customOverlay });
        newPlaces.push(data[i]);
      }

      setMarkers(newMarkers);
      map.setBounds(bounds);
      setPlaces(newPlaces);
      setSearchResults(newPlaces);
      dispatch(setMapInfo(newPlaces));
    }
  };

  const handleEnterKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchPlaces();
      setKeyword('');
    }
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      // console.log('로딩 창 오픈');
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const currentPosition = new window.kakao.maps.LatLng(latitude, longitude);
          map.panTo(currentPosition);

          if (currentInfowindow) {
            currentInfowindow.close();
          }

          const currentLocationMarker = new window.kakao.maps.Marker({
            map: map,
            position: currentPosition
          });

          const infowindow = new window.kakao.maps.InfoWindow({
            content: '<div style="padding: 5px; font-size: 15px; text-align: center;">현위치</div>'
          });
          
          setCurrentInfowindow(infowindow);
          

          infowindow.open(map, currentLocationMarker);
          // console.log('로딩 창 닫기');
        },
        (error) => {
          console.error('현재위치 찾기 오류발생! 다른브라우저를 사용하세요!', error);
        },
        { enableHighAccuracy: false, timeout: 5000, maximumAge: Infinity }
      );
    }
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <div>
          <Input
            type="text"
            placeholder="검색어를 입력하세요."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyPress={handleEnterKeyPress}
          />
          <Button onClick={searchPlaces}>검색</Button>
          <Button onClick={handleCurrentLocation}>현재위치</Button>
          <ResultContainer $showResults={searchResults.length > 0}>
            {searchResults.map((result, index) => (
              <ResultItem key={index} onClick={() => navigate(`/detail/${result.id}`)}>
                <p>
                  {index + 1}. {result.place_name} - {result.address_name}
                </p>
                <p>도로명 주소: {result.road_address_name}</p>
              </ResultItem>
            ))}
          </ResultContainer>
        </div>
        <MapContainer id="map" />
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  padding: 20px;
`;

const Input = styled.input`
  margin-right: 10px;
`;

const Button = styled.button`
  margin-right: 10px;
`;

const MapContainer = styled.div`
  width: 800px;
  height: 600px;
  margin-left: 20px;
`;

const ResultContainer = styled.div`
  margin-top: 20px;
  max-height: 500px;
  overflow-y: auto;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  display: ${(props) => (props.$showResults ? 'block' : 'none')};
`;

const ResultItem = styled.div`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;
const GlobalStyle = styled.div`
  .customOverlay {
    position: absolute;
    bottom: 12px;
    left: 6px;
    background-color: white;
    border: 1px solid #ccc;
    padding: 6px;
    border-radius: 3px;
    font-size: 12px;
    white-space: nowrap;
    font-weight: 20px;
  }
`;

export default Map;
