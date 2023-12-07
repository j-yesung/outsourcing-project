import { getMapList, getSpecificMapList } from 'api/firebase/firebase';
import Map from 'components/kakaoMap/Map';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// TODO: 화면 전체 다 뿌려 주기
const FnbList = () => {
  const dispatch = useDispatch();
  // const mapInfo = useSelector((state) => state.mapInfoSlice.mapInfo);
  // console.log('kakaoMapInfo: ', mapInfo);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMapList();
        console.log('data: ', data);
        // dispatch 추가하기
        // dispatch(getMapList())
        const res = await getSpecificMapList();
        console.log('res: ', res);
      } catch (error) {
        console.error('공습 경보 😵', error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <Map />
    </>
  );
};

export default FnbList;
