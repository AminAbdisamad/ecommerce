import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head';
import styled from 'styled-components';
import formatMoney from '../../lib/formatMoney';

const GET_SINGLE_PRODUCT = gql`
  query GET_SINGLE_PRODUCT($id: ID!) {
    Product(where: { id: $id }) {
      id
      name
      description
      status
      price
      photo {
        altText
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

interface Product {
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

const ProductStyles = styled.div`
  background: var(--secondaryColor);
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  justify-content: center;
  align-items: center;
  div {
    margin: 0 auto;
    span {
      font-size: 2rem;
      font-weight: 700;
      color: var(--primaryColor);
    }
  }
  img {
    width: 100%;
  }
`;

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
    <ProductStyles>
      <Head>
        <title>Ecommerce | {Product.name}</title>
      </Head>
      <img
        src={Product.photo?.image?.publicUrlTransformed}
        alt={Product.photo?.altText}
      />
      <div>
        <h2>{Product.name}</h2>
        <p>{Product.description}</p>
        <p>
          <span> {formatMoney(Product.price)}</span>
        </p>
        <p>{Product.status}</p>
      </div>
    </ProductStyles>
  );
}
