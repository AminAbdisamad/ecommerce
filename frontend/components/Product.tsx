import * as React from 'react';
import Link from 'next/link';
import { ProductTypes } from './Types';
import ItemStyles from './styles/ItemStyles';
import Title from './styles/Title';

const Product = ({ product }) => {
  return (
    <ItemStyles>
      <img src={product.photo.image.publicUrlTransformed} alt={product.name} />
      <Title>
        <Link href={`product/${product.id}`}>{product.name}</Link>
      </Title>
    </ItemStyles>
  );
};

export default Product;
