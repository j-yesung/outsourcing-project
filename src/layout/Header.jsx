import React from 'react';
import * as S from '../styles/layout/Header.styled';
import { useAuth } from 'hooks/useAuth';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

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
                <Link to={'/'}>메인으로</Link>
                <Link to={'/write'}>글 작성</Link>
                <Link to={'/post'}>포스트</Link>
                <Link to={'/mypage'}>마이페이지</Link>
                <Link to={'/'} onClick={logOutAuthUser}>
                  로그아웃
                </Link>
              </>
            ) : (
              <>
                <Link to={'/'}>메인으로</Link>
                <Link to={'/login'}>로그인</Link>
                <Link to={'/signup'}>회원가입</Link>
              </>
            )}
          </S.HeaderButtons>
        </S.HeaderContainer>
      </S.HeaderWrapper>
    </>
  );
};

export default Header;
