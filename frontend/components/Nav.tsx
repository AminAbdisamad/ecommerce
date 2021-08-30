import Link from 'next/link';
import styled from 'styled-components';
import { useCart } from '../lib/globalState';
import SignOut from './SignOut';
import NavStyles from './styles/NavStyles';
import useUser from './User';

export default function Nav() {
  const { openCart } = useCart();
  const user = useUser();

  return (
    <NavStyles>
      {user && (
        <>
          <Link href="/">
            <a>Welcome Back, {user.name}!</a>
          </Link>
          <Link href="/products">Product</Link>
          <Link href="/sell">Sell</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/account">Account </Link>
          <SignOut />
          <button type="button" onClick={openCart}>
            My Cart
          </button>
        </>
      )}
      {!user && (
        <>
          <Link href="/products">Product</Link>
          <Link href="/contacts">Contact</Link>
          <Link href="/signin">Sign In</Link>
          <Link href="/signup">Create Account</Link>
        </>
      )}
    </NavStyles>
  );
}
