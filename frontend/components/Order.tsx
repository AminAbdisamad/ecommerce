import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import * as React from 'react';
import { OrderType } from './Types';

const ORDER_QUERY = gql`
  query ORDER_QUERY($id: ID!) {
    Order(where: { id: $id }) {
      id
      total
      charge

      user {
        name
        email
        isAdmin
        cart {
          quantity
        }
      }
      items {
        name
        description
        price
        quantity
        photo {
          id
          image {
            publicUrlTransformed
          }
        }
      }
    }
  }
`;
const Order: React.FC<{ id: string }> = ({ id }) => {
  const { data, loading, error } = useQuery(ORDER_QUERY, {
    variables: {
      id: id,
    },
  });

  const { Order } = data;
  console.log(id);

  return (
    <div>
      <p>{Order?.total}</p>
      <p>{data?.Order?.charge}</p>
      <p>{data?.Order?.user?.name}</p>
    </div>
  );
};

export default Order;
