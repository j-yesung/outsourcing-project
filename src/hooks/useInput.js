import React, { useState } from 'react';

const useInput = (validator) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return emailRegex.test(email) ? '' : '올바른 이메일 주소를 입력해주세요.';
  };

  const handleChange = (e) => {
    const newValue = e.target.value;

    if (validator === 'email') {
      setError(validateEmail(newValue));
    } else {
      setError(validator(newValue));
    }

    setValue(newValue);
  };
  return {
    value,
    error,
    onChange: handleChange,
    isValid: error === '',
    setValue // setValue를 반환하여 외부에서 직접 값 설정 가능
  };
};

export default useInput;
