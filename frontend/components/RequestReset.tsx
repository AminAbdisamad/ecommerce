import { useMutation } from '@apollo/client';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import gql from 'graphql-tag';
import { CURRENT_USER } from './User';

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    sendUserPasswordLink(email: $email) {
      id
      name
      email
    }
  }
`;
const RequestReset = () => {
  const { inputs, handleChange, clearForm } = useForm({
    email: '',
  });
  const [signup, { data, loading, error }] = useMutation(
    REQUEST_RESET_MUTATION,
    {
      variables: inputs,
      // When user signs we want to refech and sign user
      // refetchQueries: [{ query: CURRENT_USER }],
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup().catch(console.error);

    clearForm();
    // Redirect to home page when signed in sucess
  };

  return (
    <div>
      <h1>Forget Password</h1>

      <Form onSubmit={handleSubmit}>
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
          <button type="submit">Forget Password</button>
        </fieldset>
      </Form>
    </div>
  );
};

export default RequestReset;
