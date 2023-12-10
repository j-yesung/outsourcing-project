import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useKakaoFn } from 'hooks/useKakaoFn';
import * as S from '../../styles/kakaoMap/kakaoMap.styled';
import { ModalLoading } from 'components/common/modal/ModalLoading';

const Map = () => {
  const navigate = useNavigate();

  const {
    setMap,
    keyword,
    isLoading,
    isMapLoading,
    setKeyword,
    searchResults,
    selectedMarkerInfoWindow,
    handleEnterKeyPress,
    searchPlaces,
    handleCurrentLocation
  } = useKakaoFn();

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
            <S.SearchInput
              type="text"
              placeholder="검색어를 입력하세요."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyPress={handleEnterKeyPress}
            />
            <S.SearchButton onClick={searchPlaces} $color="#e31c5f">
              검색
            </S.SearchButton>
            <S.SearchButton onClick={handleCurrentLocation} $color="#5FBDFF">
              현 위치로 설정
            </S.SearchButton>
          </S.SearchBox>
        </div>

        <S.SearchContainer>
          <S.MapContainer id="map" $isMapOpen={isMapLoading} />
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
        <S.ModalBox $isOpen={isLoading}>
          <ModalLoading isOpen={isLoading} />
        </S.ModalBox>
      </S.Container>
    </>
  );
};

export default Map;
