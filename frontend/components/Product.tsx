import * as React from 'react';
import Link from 'next/link';

import { ProductTypes } from './Types';
import ItemStyles from './styles/ItemStyles';
import Title from './styles/Title';
import PriceTag from './styles/PriceTagStyle';
import formatMoney from '../lib/formatMoney';
import DeleteProduct from './DeleteProduct';
import useUser from './User';

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
        <>
          <Link
            href={{
              pathname: 'products/update',
              query: {
                id: product.id,
              },
            }}
          >
            <button>Edit</button>
          </Link>
          <DeleteProduct id={product.id} />
        </>
      )}
    </ItemStyles>
  );
};

export default Product;
