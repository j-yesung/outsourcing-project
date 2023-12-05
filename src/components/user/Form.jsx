import { authenticateUser } from 'api/firebase/firebase';
import useInput from 'hooks/useInput';
import React from 'react';
import { useParams } from 'react-router-dom';

const Form = () => {
  const params = useParams();
  console.log('params: ', params);
  const [email, onChangeEmailHandler] = useInput();
  const [password, onChangePasswordHandler] = useInput();
  const [nickname, onChangeNicknameHandler] = useInput();

  // params로 회원가입, 로그인 분기처리 진행하세요.

  // 회원가입 함수
  const signupHandler = async (e) => {
    e.preventDefault();
    await authenticateUser(email, password);
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
        <input
          type="text"
          name="nickname"
          value={nickname}
          placeholder="닉네임"
          onChange={onChangeNicknameHandler}
          required
        />
      </form>
      <button type="submit" onClick={signupHandler}>
        회원가입
      </button>
    </>
  );
};

export default Form;
