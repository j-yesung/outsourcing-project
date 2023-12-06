import React from 'react';
import { loginUser, registerUser } from 'api/firebase/firebase';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useInput from 'hooks/useInput';
import useValid from 'hooks/useValid';
import * as S from '../../styles/user/User.styled';

const Form = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, onChangeEmail] = useInput();
  const [password, onChangePassword] = useInput();
  const [passwordChk, onChangePasswordChk] = useInput();
  const [nickname, onChangeNickname] = useInput();
  const { isValid, emailErrorMessage, passwordErrorMessage } = useValid(email, password, passwordChk, nickname);
  const isPathAvailability = location.pathname === '/login';

  // 회원가입 함수
  const signupHandler = async (e) => {
    e.preventDefault();

    try {
      await registerUser(email, password, nickname);
      navigate('/login');
    } catch (error) {
      console.error(error.message);
    }
  };
  // 로그인 함수
  const loginHandler = async (e) => {
    e.preventDefault();
    const response = await loginUser(email, password);
    localStorage.setItem(
      'userInfo',
      JSON.stringify({
        accessToken: response.accessToken,
        nickname: response.displayName,
        email: response.email,
        image: response.photoURL
      })
    );
    toast.success(`${response.displayName}님 반가워요!`);
    if (response.accessToken) navigate('/');
    try {
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <S.Wrapper>
        <S.Form>
          <S.Logo>찾기 쉽죠?</S.Logo>
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
              onClick={loginHandler}
              disabled={!isValid}
              $active={!isValid}
              $isWidth={isPathAvailability}
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
              onClick={signupHandler}
              disabled={!isValid}
              $active={!isValid}
              $isWidth={isPathAvailability}
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
      <ToastContainer autoClose={1000} />
    </>
  );
};

export default Form;
