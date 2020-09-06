import { useState } from 'react';

export default function useFormInput (initialValue: string){
  const [value, setValue] = useState(initialValue);
  const handleChange = event => {
    setValue(event.target.value);
  };
  return {value, onChange: handleChange };
};
