import * as React from 'react';
import Link from 'next/link';
import { ProductTypes } from './Types';
import ItemStyles from './styles/ItemStyles';
import Title from './styles/Title';
import PriceTag from './styles/PriceTagStyle';

const Product = ({ product }) => {
  console.log('============ ');
  console.log(product.price);
  return (
    <ItemStyles>
      <img src={product.photo.image.publicUrlTransformed} alt={product.name} />
      <Title>
        <Link href={`product/${product.id}`}>{product.name}</Link>
      </Title>
      <PriceTag>{product?.price}</PriceTag>
    </ItemStyles>
  );
};

export default Product;
