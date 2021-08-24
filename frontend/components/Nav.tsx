import Link from 'next/link';
import styled from 'styled-components';

const NavStyle = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  a {
    text-decoration: none;
    font-size: 1.2rem;
  }
`;
export default function Nav() {
  return (
    <NavStyle>
      <Link href="/products">
        <a> Products </a>
      </Link>
      <Link href="/sell">
        <a> Sell </a>
      </Link>
      <Link href="/orders">
        <a> Orders </a>
      </Link>
      <Link href="/account">
        <a> Account </a>
      </Link>
      <Link href="/contacts">
        <a> Contacts </a>
      </Link>
    </NavStyle>
  );
}
