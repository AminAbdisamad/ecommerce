import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head';

const GET_SINGLE_PRODUCT = gql`
  query GET_SINGLE_PRODUCT($id: ID!) {
    Product(where: { id: $id }) {
      id
      name
      description
      status
      photo {
        altText
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

export interface Product {
  id: string;
  name: string;
  description: string;
  status: string;
  price: number;
  photo: {
    altText: string;
    image: {
      publicUrlTransformed: string;
    };
  };
}

export interface ProductDataTypes {
  Product: Product;
}

export default function SingleProduct({ query }) {
  const { data, error, loading } = useQuery<ProductDataTypes>(
    GET_SINGLE_PRODUCT,
    {
      variables: {
        id: query.id,
      },
    }
  );

  if (loading) {
    return <p>Loading ..</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }
  const { Product } = data;

  return (
    <div>
      <Head>
        <title>Ecommerce | {Product.name}</title>
      </Head>
      <h2>{Product.name}</h2>
      <p>{Product.description}</p>
      <p>{Product.price}</p>
      <img
        src={Product.photo?.image?.publicUrlTransformed}
        alt={Product.photo?.altText}
      />
    </div>
  );
}
