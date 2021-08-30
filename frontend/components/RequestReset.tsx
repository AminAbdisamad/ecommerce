import { useMutation, useQuery } from '@apollo/client';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import gql from 'graphql-tag';
import { CURRENT_USER } from './User';

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      code
      message
    }
  }
`;

const RequestReset = () => {
  // ! Custome Mutations - Before anything check if ther provided email exist

  const { inputs, handleChange, clearForm } = useForm({
    email: '',
  });

  // ? TODO? improve this later

  const [requestReset, { data, loading, error }] = useMutation(
    REQUEST_RESET_MUTATION,
    {
      variables: inputs,
    }
  );
  console.log({ data, loading, error });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await requestReset().catch(console.error);
    console.log(res);
    clearForm();
    // Redirect to home page when signed in sucess
  };

  return (
    <div>
      <h1>Forget Password</h1>

      <Form onSubmit={handleSubmit}>
        <fieldset>
          {data?.sendUserPasswordResetLink === null && (
            <p>If that email exist, we have sent Password Forget Link</p>
          )}
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
          <button type="submit">Forget Password</button>
        </fieldset>
      </Form>
    </div>
  );
};

export default RequestReset;
