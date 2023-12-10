import React from 'react';
import * as S from '../styles/layout/Header.styled';
import { useAuth } from 'hooks/useAuth';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
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
                <S.StyledLink to={'/'} $isActive={location.pathname === '/'}>
                  메인으로
                </S.StyledLink>
                <S.StyledLink to={'/write'} $isActive={location.pathname === '/write'}>
                  글 작성
                </S.StyledLink>
                <S.StyledLink to={'/post'} $isActive={location.pathname === '/post'}>
                  포스트
                </S.StyledLink>
                <S.StyledLink to={'/mypage'} $isActive={location.pathname === '/mypage'}>
                  마이페이지
                </S.StyledLink>
                <S.StyledLink to={'/'} onClick={logOutAuthUser}>
                  로그아웃
                </S.StyledLink>
              </>
            ) : (
              <>
                <Link to={'/'} $isActive={location.pathname === '/'}>
                  메인으로
                </Link>
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
