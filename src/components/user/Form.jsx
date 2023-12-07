import { authenticateUser, registerUser } from 'api/firebase/firebase';
import useInput from 'hooks/useInput';
import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

const Form = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [email, onChangeEmailHandler] = useInput();
  const [password, onChangePasswordHandler] = useInput();
  const [nickname, onChangeNicknameHandler] = useInput();
  const [local, onChangeLocalHandler] = useInput();

  // params로 회원가입, 로그인 분기처리 진행하세요.

  // 회원가입 함수
  const signupHandler = async (e) => {
    if (password !== passwordChk) {
      console.error('비밀번호가 일치하지 않습니다.');
      return;
    }
    e.preventDefault();
    try {
      await registerUser(email, password, nickname);
      console.log('result', registerUser);
      navigate('/login');
    } catch (error) {
      console.log(error.message);
    }
  };
  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      await registerUser(email, password);
      console.log('result', registerUser);
      navigate('/');
    } catch (error) {
      console.log(error.message);
    }
  };

  // 로그인 함수

  return (
    <>
      <form>
        {/* 나중엔 flex로 내릴 예정. 임시 br 처리 */}
        <input type="text" name="email" value={email} placeholder="이메일" onChange={onChangeEmailHandler} required />
        <br />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="비밀번호"
          onChange={onChangePasswordHandler}
          required
        />
        <br />
        {location.pathname === '/signup' && (
          <>
            <input
              type="text"
              name="nickname"
              value={nickname}
              placeholder="닉네임"
              onChange={onChangeNicknameHandler}
              required
            />
            <div>
              <select value={local} onChange={onChangeLocalHandler}>
                <option>서울</option>
                <option>인천</option>
                <option>경기도</option>
              </select>
            </div>
            <div>
              <select value={local} onChange={onChangeLocalHandler}>
                <option>음식점</option>
                <option>베이커리</option>
                <option>카페</option>
                <option>명소</option>
              </select>
            </div>
          </>
        )}
      </form>
      {location.pathname === '/login' ? (
        <>
          <button type="submit" onClick={loginHandler}>
            로그인
          </button>
          <div>
            <Link to="/signup">회원가입하러 가기</Link>
          </div>
        </>
      ) : (
        <>
          <button type="submit" onClick={signupHandler}>
            회원가입
          </button>
          <div>
            <Link to="/login">로그인하러 가기</Link>
          </div>
        </>
      )}
    </>
  );
};

export default Form;
