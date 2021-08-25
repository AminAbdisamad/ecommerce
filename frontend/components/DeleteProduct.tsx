import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import * as React from 'react';

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
      price
    }
  }
`;
const update = (cache: any, payload: any) => {
  console.log({ payload });
  // Get item from apollo cache and remove
  // uses type and id ex. Product:424274827847
  cache.evict(cache.identify(payload.data.deleteProduct));
};
const DeleteProduct: React.FC<{ id: string }> = ({ id }) => {
  const [deleteProduct, { data, loading, error }] = useMutation(
    DELETE_PRODUCT_MUTATION,
    {
      variables: { id: id },
      update, // update apollo cache when item is delete
    }
  );
  return (
    <div>
      <button
        disabled={loading}
        onClick={async () => {
          if (confirm('Are you sure to delete?')) {
            await deleteProduct().catch((err) => alert(err.message));
            alert(`Product  deleted successfully`);
            console.log(deleteProduct);
          }
        }}
      >
        Delete Product
      </button>
    </div>
  );
};
export default DeleteProduct;
