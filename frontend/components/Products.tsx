import { useQuery } from '@apollo/client';
import qql from 'graphql-tag';
import styled from 'styled-components';
import Product from './Product';
import { ProductTypes } from './Types';

export const ALL_PRODUCT_QEURY = qql`
query ALL_PRODUCT_QEURY {
  allProducts{
    id
    name
    description
    status
    price
  	photo{
     image{
      id
      publicUrlTransformed
    }
    }
  }}`;

const ProductListStyle = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`;

const Products = () => {
  const { data, error, loading } = useQuery(ALL_PRODUCT_QEURY);
  console.log(data, error, loading);

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
