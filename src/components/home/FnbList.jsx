import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { setFnbInfo } from 'store/modules/mapInfoSlice';
import { useDispatch, useSelector } from 'react-redux';
import * as S from '../../styles/pages/Home.styled';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useNavigate } from 'react-router-dom';
import { getMapList } from 'api/firebase';
import React, { useEffect } from 'react';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';

const FnbList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fnbData = useSelector((state) => state.mapInfoSlice.fnbInfo);

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
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={0}
          slidesPerView={7}
          navigation
          pagination={{ clickable: true }}
          loop={true}
          slidesPerGroup={3}
        >
          {fnbData.map((item, index) => (
            <SwiperSlide key={index}>
              <S.FnbWrapper>
                <S.FnbList onClick={() => navigate(`/detail/${item.id}`)}>
                  <S.ListName>{item.place_name}</S.ListName>
                  <p>{item.road_address_name}</p>
                  <S.ListCategoryName>{item.category_group_name}</S.ListCategoryName>
                </S.FnbList>
              </S.FnbWrapper>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
};

export default FnbList;
