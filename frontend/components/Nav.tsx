import Link from 'next/link';
import styled from 'styled-components';
import SignOut from './SignOut';
import NavStyles from './styles/NavStyles';
import useUser from './User';

export default function Nav() {
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
