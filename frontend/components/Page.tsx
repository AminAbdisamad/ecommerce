import Header from './Header';
import Footer from './Footer';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
@font-face{
font-family:'Roboto' ;
src: url('/assets/Roboto-Black.ttf')
format('ttf')
}
html {
    --primaryColor: #3DB2FF;
    --secondaryColor : #FFEDDA;
    --black: #000000;
    --grey:#AAAAAA;
    --ofWhite:#ededed;
    --maxWidth:1000px;
    --bs: 'box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1)';
    box-sizing: border-box;
}
*,*:after, *:before {
    box-sizing: inherit;

}
body {
font-family: 'Roboto',-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
padding: 0;
margin: 0;
font-size: 1.5rem;
line-height: 2;
}
a {
    text-decoration: none;
    color: var(---black)
}
button {
    font-family: 'Roboto',-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}`;

const MainContentStyles = styled.div`
  max-width: var(--maxWidth);
  margin: 0 auto;
  padding: 2rem;
`;
const Page = ({ children }) => {
  return (
    <div>
      <GlobalStyles />
      <Header />
      <MainContentStyles>{children}</MainContentStyles>
      <Footer />
    </div>
  );
};
export default Page;
