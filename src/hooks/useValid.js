import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const useValid = (email, password, passwordChk, nickname) => {
  const location = useLocation();
  const [isValid, setIsValid] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  useEffect(() => {
    if (location.pathname === '/signup') {
      const isPasswordMatch = password === passwordChk && password !== '';
      const areFieldsFilled =
        email.trim() !== '' && password.trim() !== '' && passwordChk.trim() !== '' && nickname.trim() !== '';

      // 에러 메세지 처리
      setEmailErrorMessage(email.trim() !== '' && !isEmailValid ? '올바른 이메일 형식이 아닙니다.' : '');
      setPasswordErrorMessage(password.trim() !== '' && !isPasswordMatch ? '비밀번호가 일치하지 않습니다.' : '');

      setIsValid(isEmailValid && isPasswordMatch && areFieldsFilled);
    } else {
      const areFieldsFilled = email.trim() !== '' && password.trim() !== '';

      setIsValid(isEmailValid && areFieldsFilled);
      setEmailErrorMessage(email.trim() !== '' && !isEmailValid ? '올바른 이메일 형식이 아닙니다.' : '');
    }
  }, [email, password, passwordChk, nickname, location.pathname, isEmailValid]);

  return { isValid, emailErrorMessage, passwordErrorMessage };
};

export default useValid;
