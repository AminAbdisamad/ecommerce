import * as React from 'react';
import { ProductTypes } from './Types';

const Product = ({ product }) => {
  return <p>{product.name}</p>;
};

export default Product;
