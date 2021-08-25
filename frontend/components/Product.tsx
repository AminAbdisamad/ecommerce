import * as React from 'react';
import Link from 'next/link';

import { ProductTypes } from './Types';
import ItemStyles from './styles/ItemStyles';
import Title from './styles/Title';
import PriceTag from './styles/PriceTagStyle';
import formatMoney from '../lib/formatMoney';
import DeleteProduct from './DeleteProduct';

const Product: React.FC<{ product: ProductTypes }> = ({ product }) => {
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
      <Link
        href={{
          pathname: 'update',
          query: {
            id: product.id,
          },
        }}
      >
        <button>Edit</button>
      </Link>
      <DeleteProduct id={product.id} />
    </ItemStyles>
  );
};

export default Product;
