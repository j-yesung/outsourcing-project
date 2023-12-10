import { ImgUpload } from 'components/Upload/ImgUpload';
import Content from 'components/home/Content';
import * as S from '../styles/pages/Profile.styled';
import React from 'react';

const Profile = () => {
  return (
    <>
      <S.TopWrapper>
        <ImgUpload />
      </S.TopWrapper>
      <Content />
    </>
  );
};

export default Profile;
