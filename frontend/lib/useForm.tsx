import * as React from 'react';

export interface FormTypes {
  name?: string;
  description?: string;
  price?: number;
  status?: string;
  photo?: Object;
  email?: string;
  password?: string;
}
export default function useForm(initial: FormTypes = {}) {
  const [inputs, setInputs] = React.useState(initial);

  //   Fix for wait item to load

  const initValues = Object.values(initial).join('');

  React.useEffect(() => {
    setInputs(initial);
  }, [initValues]);

  function handleChange(e) {
    let { name, type, value } = e.target;
    if (type === 'number') {
      // change value from string to number if type is number
      value = parseInt(value);
    }
    if (type === 'file') {
      [value] = e.target.files;
      //   Its like
      // value = e.target.files[0]
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

// tests should be written
