import { useState } from 'react';

const useInput = () => {
  const [value, setValue] = useState('');

  const onChangeHanler = (e) => setValue(e.target.value);

  return [value, onChangeHanler];
};

export default useInput;
