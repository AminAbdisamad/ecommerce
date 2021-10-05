import * as React from "react";
function Form() {
  const [email, setEmail] = React.useState<string | null>("");
  const [password, setPassword] = React.useState<string | null>("");

  function inputHandler(e) {
    setEmail(e.target.value);
  }
  function inputHandlers(e) {
    setPassword(e.target.value);
  }
  console.log({ email, password });
  function onSubmitHandler(e) {
    e.preventDefault();
    console.log(e);
  }
  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <label htmlFor='email'>
          Email
          <input
            name='name'
            type='email'
            value={email}
            onChange={inputHandler}
          />
        </label>
        <label htmlFor='email'>
          Password
          <input
            name='password'
            type='password'
            value={password}
            onChange={inputHandlers}
          />
        </label>
        <button type='submit'> Send</button>
      </form>
    </div>
  );
}

export default Form;
