import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUserInfo } from 'store/modules/authSlice';
import styled from 'styled-components';

const HeaderWrapper = styled.header`
  display: flex;
  padding: 20px;
  align-items: center;
  justify-content: space-between;
`;
const HeaderLogo = styled.h1`
  cursor: pointer;
  font-size: 30px;
  font-weight: 900;
  font-family: 'Pretendard-Regular';
`;
const HeaderButtons = styled.div`
  gap: 10px;
  display: flex;
  align-items: center;
`;

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.authSlice.userInfo);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    dispatch(setUserInfo(null));
    navigate('/');
  };

  return (
    <>
      <HeaderWrapper>
        <HeaderLogo onClick={() => navigate('/')}>찾기 쉽죠?</HeaderLogo>
        <HeaderButtons>
          {userInfo && userInfo.accessToken !== null ? (
            <>
              <p>{userInfo.nickname}님 안녕하세요.</p>
              <button onClick={() => navigate('/')}>메인으로</button>
              <button onClick={() => navigate('/profile')}>마이페이지</button>
              <button onClick={handleLogout}>로그아웃</button>
            </>
          ) : (
            <>
              <button onClick={() => navigate('/')}>메인으로</button>
              <button onClick={() => navigate('/login')}>로그인</button>
              <button onClick={() => navigate('/signup')}>회원가입</button>
            </>
          )}
        </HeaderButtons>
      </HeaderWrapper>
    </>
  );
};

export default Header;
