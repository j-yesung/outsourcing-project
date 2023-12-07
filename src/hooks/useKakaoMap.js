import { useEffect } from 'react';

const useKakaoMap = (findData, mapRef) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_API_KEY}`;
    document.head.appendChild(script);

    script.onload = () => {
      const container = mapRef.current;
      const options = {
        center: new window.kakao.maps.LatLng(findData.y, findData.x),
        level: 3
      };

      const map = new window.kakao.maps.Map(container, options);

      const markerPosition = new window.kakao.maps.LatLng(findData.y, findData.x);
      const marker = new window.kakao.maps.Marker({
        position: markerPosition
      });
      marker.setMap(map);
    };

    return () => {
      document.head.removeChild(script);
    };
  }, [findData.x, findData.y, mapRef]);
};

export default useKakaoMap;
