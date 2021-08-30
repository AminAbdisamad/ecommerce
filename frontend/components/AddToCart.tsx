import * as React from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { CURRENT_USER } from './User';

const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION($productId: ID!) {
    addToCart(productId: $productId) {
      quantity
      product {
        id
        name
      }
    }
  }
`;

const AddToCart: React.FC<{ productId: string }> = ({ productId }) => {
  const [addToCart, { loading }] = useMutation(ADD_TO_CART_MUTATION, {
    variables: {
      productId: productId,
    },
    refetchQueries: [{ query: CURRENT_USER }],
  });

  return (
    <div>
      <button
        type="button"
        disabled={loading}
        onClick={async () => {
          await addToCart();
        }}
      >
        Add{loading && 'ing'} To Cart
      </button>
    </div>
  );
};

export default AddToCart;
