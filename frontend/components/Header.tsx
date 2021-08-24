import Link from 'next/link';
import styled from 'styled-components';
import Nav from './Nav';
const Logo = styled.h1`
  background: var(--primaryColor);
  font-size: 2rem;
  padding: 1rem;
  a {
    color: white;
    text-decoration: none;
  }
`;

const Header = () => {
  return (
    <header>
      <Logo>
        <Link href="/">E-Commerce</Link>
      </Logo>
      <Nav />
    </header>
  );
};
export default Header;
