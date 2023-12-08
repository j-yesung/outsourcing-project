import { useState } from 'react';

const useInput = (validator) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const onChangeHanler = (e) => setValue(e.target.value);

  return [value, onChangeHanler];
};

export default useInput;
