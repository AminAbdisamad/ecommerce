import * as React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { ProductTypes } from './Types';
import ItemStyles from './styles/ItemStyles';
import Title from './styles/Title';
import PriceTag from './styles/PriceTagStyle';
import formatMoney from '../lib/formatMoney';
import DeleteProduct from './DeleteProduct';
import useUser from './User';
import AddToCart from './AddToCart';

const ButtonSyles = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid var(--secondaryColor);
  border-bottom: 1px solid var(--secondaryColor);
  padding: 1rem;
`;
const Product: React.FC<{ product: ProductTypes }> = ({ product }) => {
  const user = useUser();
  return (
    <ItemStyles>
      <img
        src={product?.photo?.image?.publicUrlTransformed}
        alt={product.name}
      />
      <Title>
        <Link href={`product/${product.id}`}>{product.name}</Link>
      </Title>
      <PriceTag>{formatMoney(product.price)}</PriceTag>
      <p>{product.description}</p>
      {/* btn  */}
      {user && (
        <ButtonSyles>
          <Link
            href={{
              pathname: 'products/update',
              query: {
                id: product.id,
              },
            }}
          >
            <button type="button">Edit Product</button>
          </Link>
          <AddToCart productId={product.id} />
          <DeleteProduct id={product.id} />
        </ButtonSyles>
      )}
    </ItemStyles>
  );
};

export default Product;
