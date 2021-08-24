import * as React from 'react';

export default function useForm(initials = {}) {
  const [inputs, setInputs] = React.useState(initials);

  function handleChange(e) {
    setInputs({
      //   copy exising data
      ...inputs,
      [e.target.name]: e.target.value,
    });
  }
  return { inputs, handleChange };
}
