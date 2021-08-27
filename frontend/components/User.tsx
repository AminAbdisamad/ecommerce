import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

export const CURRENT_USER = gql`
  query {
    authenticatedItem {
      ... on User {
        id
        email
        name
        # cart item
      }
    }
  }
`;

const useUser = () => {
  const { data } = useQuery(CURRENT_USER);
  return data?.authenticatedItem;
};

export default useUser;
