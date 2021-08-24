import Link from 'next/link';
import styled from 'styled-components';
import NavStyles from './styles/NavStyles';

export default function Nav() {
  return (
    <NavStyles>
      <Link href="/products">Product</Link>
      <Link href="/sell">Sell</Link>
      <Link href="/orders">Orders</Link>
      <Link href="/account">Account </Link>
      <Link href="/contacts">Contact</Link>
    </NavStyles>
  );
}
