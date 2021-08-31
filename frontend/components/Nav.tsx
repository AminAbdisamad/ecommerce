import Link from 'next/link';
import styled from 'styled-components';
import { useCart } from '../lib/globalState';
import Search from './Search';
import SignOut from './SignOut';
import NavStyles from './styles/NavStyles';
import useUser from './User';

const Span = styled.span`
  position: absolute;
  top: 0px;
  right: 20px;
  width: 20px;
  height: 20px;
  background: red;
  font-weight: 300;
  color: white;
  font-size: 1rem;
  border-radius: 50%;
  padding-top: 0.3rem;
`;

export default function Nav() {
  const { openCart } = useCart();
  const user = useUser();

  return (
    <div>
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
            {/* Changes cart state from close to open */}
            <button type="button" onClick={openCart}>
              My Cart
              {user.cart.length !== 0 && (
                // Count Items in the cart
                <Span>
                  {user.cart.reduce((tally, item) => item.quantity + tally, 0)}
                </Span>
              )}
            </button>
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
      <Search />
    </div>
  );
}
