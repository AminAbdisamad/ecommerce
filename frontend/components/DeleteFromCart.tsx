import { ApolloCache, useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import * as React from 'react';
import CloseButton from './styles/CloseButton';
import { CURRENT_USER } from './User';

const DELETE_ITEM_FROM_CART = gql`
  mutation DELETE_ITEM_FROM_CART($cartId: ID!) {
    deleteCartItem(id: $cartId) {
      id
    }
  }
`;

// Update cart after removing
const update = (cache: any, payload: any) => {
  cache.evict(cache.identify(payload.data.deleteCartItem));
};

const DeleteFromCart: React.FC<{ cartId: string }> = ({ cartId }) => {
  const [deleteItemFromCart, { loading, error, data }] = useMutation(
    DELETE_ITEM_FROM_CART,
    {
      variables: {
        cartId,
      },
      // Update apollo cache
      // update,
      refetchQueries: [
        {
          query: CURRENT_USER,
        },
      ],
    }
  );
  if (error) {
    return <p>{error.message}</p>;
  }
  console.log(data);
  return (
    <CloseButton disabled={loading} onClick={deleteItemFromCart} color="red">
      X
    </CloseButton>
  );
};

export default DeleteFromCart;
