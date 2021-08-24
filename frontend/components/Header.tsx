import Link from 'next/link';
import styled from 'styled-components';
import Nav from './Nav';
const Logo = styled.h1`
  margin-top: 0;
  margin-left: 2rem;
  background: var(--primaryColor);
  font-size: 2rem;
  padding: 2rem;
  a {
    color: white;
    text-decoration: none;
  }
`;

const HeaderStyle = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Header = () => {
  return (
    <HeaderStyle>
      <Logo>
        <Link href="/">Commerce</Link>
      </Logo>
      <Nav />
    </HeaderStyle>
  );
};
export default Header;
