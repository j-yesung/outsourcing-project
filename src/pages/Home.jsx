import * as S from '../styles/pages/Home.styled';
import FnbList from 'components/home/FnbList';
import Map from 'components/kakaoMap/Map';
import React from 'react';

const Home = () => {
  return (
    <S.HomeWrapper>
      <Map />
      <FnbList />
    </S.HomeWrapper>
  );
};

export default Home;
