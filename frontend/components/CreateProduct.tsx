import * as React from 'react';
import gql from 'graphql-tag';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import { useMutation } from '@apollo/client';

const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    $name: String!
    $description: String
    $price: Int!
    $image: Upload
  ) {
    createProduct(
      data: {
        name: $name
        description: $description
        price: $price
        status: "AVAILABLE"
        photo: { create: { image: $image, altText: $name } } # Photo is a separate record, this is Specific to KeystoneJS
      }
    ) {
      id
      name
      price
      description
    }
  }
`;

const CreateProduct = () => {
  const { resetForm, clearForm, inputs, handleChange } = useForm({
    name: 'Macawis',
    description: 'new and awesome',
    price: 1234,
  });

  const [createProduct, { data, loading, error }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    { variables: inputs }
  );

  return (
    <div>
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          //   console.log(inputs);
          const res = await createProduct();
          console.log(res);
          clearForm();
        }}
      >
        <fieldset>
          <label htmlFor="image">
            Image:
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleChange}
            />
          </label>
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
          <button type="submit">Submit Form</button>
        </fieldset>
      </Form>
    </div>
  );
};

export default CreateProduct;
