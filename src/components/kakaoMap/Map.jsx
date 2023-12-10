import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useKakaoFn } from 'hooks/useKakaoFn';
import * as S from '../../styles/kakaoMap/kakaoMap.styled';

const Map = () => {
  const navigate = useNavigate();

  const { setMap, keyword, setKeyword, searchResults, selectedMarkerInfoWindow, handleEnterKeyPress, searchPlaces, handleCurrentLocation } =
    useKakaoFn();

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
  }, [selectedMarkerInfoWindow, setMap]);

  return (
    <>
      <S.GlobalStyle />
      <S.Container>
        <div>
          <S.SearchBox>
            <S.Input
              type="text"
              placeholder="검색어를 입력하세요."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyPress={handleEnterKeyPress}
            />
            <S.Button onClick={searchPlaces}>검색</S.Button>
            <S.Button onClick={handleCurrentLocation}>현재위치</S.Button>
          </S.SearchBox>
        </div>
        <S.SearchContainer>
          <S.MapContainer id="map" />
          <S.ResultContainer $showResults={searchResults.length > 0}>
            {searchResults.map((result, index) => (
              <S.ResultItem key={index} onClick={() => navigate(`/detail/${result.id}`)}>
                <p>
                  {index + 1}. {result.place_name} - {result.address_name}
                </p>
                <p>도로명 주소: {result.road_address_name}</p>
              </S.ResultItem>
            ))}
          </S.ResultContainer>
        </S.SearchContainer>
      </S.Container>
    </>
  );
};

export default Map;
