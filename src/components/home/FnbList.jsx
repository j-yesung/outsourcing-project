import { getMapList, getSpecificMapList } from 'api/firebase/firebase';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFnbInfo } from 'store/modules/mapInfoSlice';
import * as S from '../../styles/pages/Home.styled';
import { useNavigate } from 'react-router-dom';

const FnbList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const mapInfo = useSelector((state) => state.mapInfoSlice.mapInfo);
  // console.log('kakaoMapInfo: ', mapInfo);
  const fnbData = useSelector((state) => state.mapInfoSlice.fnbInfo);
  console.log('fnbInfo: ', fnbData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMapList();
        dispatch(setFnbInfo(data));
        // TODO: 카테고리 누를 때에 이름 전달
        // const res = await getSpecificMapList(fnbData.category_name);
        // // dispatch 추가하기
        // console.log('파이어베이스에 담긴 필터된 리스트: ', res);
      } catch (error) {
        console.error('공습 경보 😵', error);
      }
    };
    fetchData();
  }, [dispatch]);

  return (
    <>
      {fnbData && (
        <S.HomeWrapper>
          {fnbData.map((item) => (
            <S.FnbList key={item.id} onClick={() => navigate(`/detail/${item.id}`)}>
              <p>{item.place_name}</p>
            </S.FnbList>
          ))}
        </S.HomeWrapper>
      )}
    </>
  );
};

export default FnbList;
