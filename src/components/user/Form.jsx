import { useLocation, useNavigate, Link } from 'react-router-dom';
import * as S from '../../styles/user/User.styled';
import { useAuth } from 'hooks/useAuth';
import useInput from 'hooks/useInput';
import useValid from 'hooks/useValid';
import React from 'react';

const Form = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, onChangeEmail] = useInput();
  const [password, onChangePassword] = useInput();
  const [passwordChk, onChangePasswordChk] = useInput();
  const [nickname, onChangeNickname] = useInput();
  const { isValid, emailErrorMessage, passwordErrorMessage } = useValid(email, password, passwordChk, nickname);
  const isPathAvailability = location.pathname === '/login';

  const { registerAuthUser, loginAuthUser } = useAuth();

  return (
    <>
      <S.Wrapper>
        <S.Form>
          <S.Logo onClick={() => navigate('/')}>찾기 쉽죠?</S.Logo>
          <S.Input type="text" name="email" value={email} placeholder="이메일" onChange={onChangeEmail} required />
          {emailErrorMessage && <S.Caption>{emailErrorMessage}</S.Caption>}
          <S.Input
            type="password"
            name="password"
            minLength={6}
            maxLength={10}
            value={password}
            placeholder="비밀번호"
            onChange={onChangePassword}
            required
          />
          {location.pathname === '/signup' && (
            <>
              <S.Input
                type="password"
                name="passwordChk"
                minLength={6}
                maxLength={10}
                value={passwordChk}
                placeholder="비밀번호 확인"
                onChange={onChangePasswordChk}
                required
              />
              {passwordErrorMessage && <S.Caption>{passwordErrorMessage}</S.Caption>}
              <S.Input
                type="text"
                name="nickname"
                minLength={2}
                maxLength={6}
                value={nickname}
                placeholder="닉네임"
                onChange={onChangeNickname}
                required
              />
            </>
          )}
        </S.Form>
        {isPathAvailability ? (
          <>
            <S.Button
              type="submit"
              disabled={!isValid}
              $active={!isValid}
              $isWidth={isPathAvailability}
              onClick={(e) => {
                e.preventDefault();
                loginAuthUser({ email, password });
              }}
            >
              로그인
            </S.Button>
            <hr />
            <S.LinkWrapper>
              <Link to="/signup">회원가입하러 가기</Link>
            </S.LinkWrapper>
          </>
        ) : (
          <>
            <S.Button
              type="submit"
              disabled={!isValid}
              $active={!isValid}
              $isWidth={isPathAvailability}
              onClick={(e) => {
                e.preventDefault();
                registerAuthUser({ email, password, nickname });
              }}
            >
              회원가입
            </S.Button>
            <hr />
            <S.LinkWrapper>
              <Link to="/login">로그인하러 가기</Link>
            </S.LinkWrapper>
          </>
        )}
      </S.Wrapper>
    </>
  );
};

export default Form;
