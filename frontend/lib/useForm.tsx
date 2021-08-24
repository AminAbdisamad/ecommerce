import * as React from 'react';

export default function useForm(initial = {}) {
  const [inputs, setInputs] = React.useState(initial);

  function handleChange(e) {
    let { name, type, value } = e.target;
    if (type === 'number') {
      // change value from string to number if type is number
      value = parseInt(value);
    }
    if (type === 'file') {
      value[0] = e.target.files;
    }
    setInputs({
      ...inputs, //   copy exising data
      [name]: value,
    });
  }

  function resetForm() {
    setInputs(initial);
  }

  function clearForm() {
    //   loop and clear object
    const blackState = Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => [key, ''])
    );
    setInputs(blackState);
  }
  return { inputs, handleChange, resetForm, clearForm };
}
