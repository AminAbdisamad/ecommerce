import { useMutation } from '@apollo/client';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import gql from 'graphql-tag';
import { CURRENT_USER } from './User';

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
          name
          email
        }
      }
    }
  }
`;
const SignIn = () => {
  const { inputs, handleChange, clearForm } = useForm({
    email: '',
    password: '',
  });
  const [signin, { data, loading }] = useMutation(SIGNIN_MUTATION, {
    variables: inputs,
    // When user signs we want to refech and sign user
    refetchQueries: [{ query: CURRENT_USER }],
  });

  const error =
    data?.authenticateUserWithPassword?.__typename ===
    'UserAuthenticationWithPasswordFailure'
      ? data?.authenticateUserWithPassword
      : undefined;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signin();
    clearForm();
    // Redirect to home page when signed in sucess
  };

  return (
    <div>
      <h1>Sign In Form</h1>

      <Form onSubmit={handleSubmit}>
        {error && (
          <h3 style={{ color: 'red' }}> Email or Password Incorrect</h3>
        )}
        <fieldset>
          <label htmlFor="email">
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
            <input
              name="password"
              id="password"
              type="password"
              autoComplete="password"
              placeholder="Your Password"
              value={inputs.password}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Sign In</button>
        </fieldset>
      </Form>
    </div>
  );
};

export default SignIn;
