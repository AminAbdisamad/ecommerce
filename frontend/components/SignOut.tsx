import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { CURRENT_USER } from './User';

const SIGN_OUT_MUTATION = gql`
  mutation {
    endSession
  }
`;
const SignOut = () => {
  const [signout] = useMutation(SIGN_OUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER }],
  });
  // @ts-ignore
  return <button onClick={signout}>SignOut</button>;
};

export default SignOut;
