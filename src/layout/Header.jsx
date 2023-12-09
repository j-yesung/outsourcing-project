import React from 'react';
import styled from 'styled-components';
import { useAuth } from 'hooks/useAuth';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

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
  const userInfo = useSelector((state) => state.authSlice.userInfo);

  const { logOutAuthUser } = useAuth();

  return (
    <>
      <HeaderWrapper>
        <HeaderLogo onClick={() => navigate('/')}>찾기 쉽죠?</HeaderLogo>
        <HeaderButtons>
          {userInfo && userInfo !== null ? (
            <>
              {/* <p>{userInfo.nickname}님 안녕하세요.</p> */}
              <button onClick={() => navigate('/')}>메인으로</button>
              <button onClick={() => navigate('/write')}>글 작성</button>
              <button onClick={() => navigate('/mypage')}>마이페이지</button>
              <button onClick={logOutAuthUser}>로그아웃</button>
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
