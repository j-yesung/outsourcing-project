import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setMapInfo } from 'store/modules/mapInfoSlice';

export const useKakaoFn = () => {
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState('');
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [currentInfowindow, setCurrentInfowindow] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isMapLoading, setIsMapLoading] = useState(true);
  const selectedMarkerInfoWindow = useRef(null);

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
      setIsLoading(true);
      setIsMapLoading(false);
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
          setIsLoading(false);
          setIsMapLoading(true);
        },
        (error) => {
          console.error('현재위치 찾기 오류발생! 다른브라우저를 사용하세요!', error);
        },
        { enableHighAccuracy: false, timeout: 5000, maximumAge: Infinity }
      );
    }
  };

  return {
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
  };
};
