import { useMutation } from '@apollo/client';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import gql from 'graphql-tag';
import { CURRENT_USER } from './User';

const SIGNUP_MUATION = gql`
  mutation SIGNUP_MUATION($email: String!, $password: String!, $name: String!) {
    createUser(data: { email: $email, password: $password, name: $name }) {
      id
      name
      email
    }
  }
`;
const SignUp = () => {
  const { inputs, handleChange, clearForm } = useForm({
    email: '',
    password: '',
    name: '',
  });
  const [signup, { data, loading, error }] = useMutation(SIGNUP_MUATION, {
    variables: inputs,
    // When user signs we want to refech and sign user
    // refetchQueries: [{ query: CURRENT_USER }],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup().catch(console.error);

    clearForm();
    // Redirect to home page when signed in sucess
  };

  const emailAlreadyExist = error?.message.includes('duplicate key')
    ? 'Email Already Exist '
    : null;

  return (
    <div>
      <h1>Create Account</h1>

      <Form onSubmit={handleSubmit}>
        <div>
          {emailAlreadyExist && (
            <h3 style={{ color: 'red' }}> {emailAlreadyExist}</h3>
          )}
        </div>
        <fieldset>
          <label htmlFor="name">
            Name:
            <input
              name="name"
              id="name"
              type="name"
              autoComplete="name"
              placeholder="Name"
              value={inputs.name}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="email">
            Email:{' '}
            <input
              name="email"
              id="email"
              type="email"
              autoComplete="email"
              placeholder="Your Email"
              value={inputs.email}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="password">
            Password:{' '}
            <input
              name="password"
              id="password"
              type="password"
              autoComplete="password"
              placeholder="Your Password"
              value={inputs.password}
              onChange={handleChange}
            />
            {inputs.password.length < 8 && (
              <p>Password must be more 8 characters</p>
            )}
          </label>
          <button type="submit">Sign Up</button>
        </fieldset>
      </Form>
    </div>
  );
};

export default SignUp;
