import * as React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Nav from './Nav';

// Styled CSS

const Logo = styled.h1`
  background: red;
`;

export default function Header() {
  return (
    <div>
      <header>
        Header Here
        <div className="bar">
          <Link href="/">
            <Logo>Ecommerce</Logo>
          </Link>
          <Nav />
        </div>
        <div className="sub-bar">
          <p>Search</p>
        </div>
      </header>
    </div>
  );
}
