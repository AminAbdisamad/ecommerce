import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import DisplayError from '../lib/DisplayError';
import useForm from '../lib/useForm';
import { ProductDataTypes } from '../pages/product/[id]';
import Product from './Product';
import Form from './styles/Form';

const GET_SINGLE_PRODUCT = gql`
  query GET_SINGLE_PRODUCT($id: ID!) {
    Product(where: { id: $id }) {
      id
      name
      price
      description
    }
  }
`;

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION(
    $id: ID!
    $name: String
    $description: String
    $price: Int
  ) {
    updateProduct(
      id: $id
      # DONOT Pass ID along
      data: { name: $name, description: $description, price: $price }
    ) {
      id
      name
      description
      price
    }
  }
`;

export default function UpdateProduct({ id }) {
  // We get a product by id and return product information from graphql
  const { data, loading, error } = useQuery<ProductDataTypes>(
    GET_SINGLE_PRODUCT,
    { variables: { id } }
  );

  // We sent Updated data to the our graphql api and mutate it
  const [
    updateProduct,
    { data: updateData, loading: updateLoading, error: updateError },
  ] = useMutation(UPDATE_PRODUCT_MUTATION);

  const { inputs, handleChange } = useForm(
    data?.Product || {
      name: '',
      price: 0,
      description: '',
    }
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error || updateError) {
    return <DisplayError error={error}></DisplayError>;
  }

  return (
    <div>
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          const res = await updateProduct({
            variables: {
              id: id,
              name: inputs.name,
              description: inputs.description,
              price: inputs.price,
            },
          });
        }}
      >
        <DisplayError error={error} />
        <fieldset disabled={updateLoading} aria-busy={updateLoading}>
          <label htmlFor="name">
            Name:
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              value={inputs.name}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="price">
            Price:
            <input
              type="number"
              id="price"
              name="price"
              placeholder="Price"
              value={inputs.price}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="description">
            <textarea
              name="description"
              id="description"
              value={inputs.description}
              onChange={handleChange}
            ></textarea>
          </label>
          <button type="submit">Update Form</button>
        </fieldset>
      </Form>
    </div>
  );
}
