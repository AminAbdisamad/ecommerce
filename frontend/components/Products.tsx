import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { perPage } from '../config';
import Product from './Product';
import { ProductTypes } from './Types';

export const ALL_PRODUCT_QEURY = gql`
  query ALL_PRODUCT_QEURY($skip: Int = 0, $first: Int) {
    allProducts(skip: $skip, first: $first) {
      id
      name
      description
      status
      price
      photo {
        image {
          id
          publicUrlTransformed
        }
      }
    }
  }
`;

const ProductListStyle = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`;

const Products: React.FC<{ page: number }> = ({ page }) => {
  const { data, error, loading } = useQuery(ALL_PRODUCT_QEURY, {
    variables: {
      skip: page * perPage - perPage,
      first: perPage,
    },
  });

  if (loading) {
    return <p>Loading products ...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <ProductListStyle>
        {data.allProducts.map((product: ProductTypes) => (
          <Product key={product.id} product={product} />
        ))}
      </ProductListStyle>
    </>
  );
};

export default Products;
