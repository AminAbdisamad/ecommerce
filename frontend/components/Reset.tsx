import * as React from 'react';
import { useMutation } from '@apollo/client';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import gql from 'graphql-tag';
import { CURRENT_USER } from './User';

const RESET_PASSWORD_MUTATION = gql`
  mutation RESET_PASSWORD_MUTATION(
    $email: String!
    $password: String!
    $token: String!
  ) {
    redeemUserPasswordResetToken(
      email: $email
      password: $password
      token: $token
    ) {
      code
      message
    }
  }
`;

const Reset: React.FC<{ token: string }> = ({ token }) => {
  const { inputs, handleChange, clearForm } = useForm({
    email: '',
    password: '',
  });
  console.log({ token });
  const [reset, { data, loading, error }] = useMutation(
    RESET_PASSWORD_MUTATION,
    {
      variables: {
        email: inputs.email,
        password: inputs.password,
        token: token,
      },
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await reset().catch(console.error);
    console.log(res);
    clearForm();
    // Redirect to home page when signed in sucess
  };

  return (
    <div>
      <h1>Reset Password Form</h1>

      <Form onSubmit={handleSubmit}>
        {data?.redeemUserPasswordResetToken?.message && (
          <p style={{ color: 'red' }}>
            {data?.redeemUserPasswordResetToken?.message}
          </p>
        )}
        {data?.redeemUserPasswordResetToken === null && (
          <p style={{ color: 'green' }}>
            You've Successfully reset your password, you can now login
          </p>
        )}
        <fieldset>
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
          <button type="submit">Reset Password</button>
        </fieldset>
      </Form>
    </div>
  );
};

export default Reset;
