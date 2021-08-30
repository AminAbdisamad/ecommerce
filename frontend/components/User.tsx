import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { CurrentUserType } from './Types';

export const CURRENT_USER = gql`
  query {
    authenticatedItem {
      ... on User {
        id
        email
        name
        cart {
          id
          quantity
          product {
            name
            price
            photo {
              image {
                publicUrlTransformed
              }
            }
          }
        }
      }
    }
  }
`;

const useUser = () => {
  const { data } = useQuery<CurrentUserType>(CURRENT_USER);
  return data?.authenticatedItem;
};

export default useUser;
