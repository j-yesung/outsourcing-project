import { useState } from 'react';

const useInput = (validator) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return emailRegex.test(email) ? '' : '올바른 이메일 주소를 입력해주세요.';
  };

  const onChangeHanler = (e) => setValue(e.target.value);

  return [value, onChangeHanler];
};

export default useInput;
