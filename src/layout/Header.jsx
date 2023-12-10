import React from 'react';
import * as S from '../styles/layout/Header.styled';
import { useAuth } from 'hooks/useAuth';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.authSlice.userInfo);

  const { logOutAuthUser } = useAuth();

  return (
    <>
      <S.HeaderWrapper>
        <S.HeaderContainer>
          <S.HeaderBox>
            <S.HeaderLogo onClick={() => navigate('/')}>찾기 쉽죠?</S.HeaderLogo>
          </S.HeaderBox>
          <S.HeaderButtons>
            {userInfo && userInfo !== null ? (
              <>
                {/* <p>{userInfo.nickname}님 안녕하세요.</p> */}
                <button onClick={() => navigate('/')}>메인으로</button>
                <button onClick={() => navigate('/write')}>글 작성</button>
                <button onClick={() => navigate('/post')}>포스트</button>
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
          </S.HeaderButtons>
        </S.HeaderContainer>
      </S.HeaderWrapper>
    </>
  );
};

export default Header;
