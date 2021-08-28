import Link from 'next/link';
import Router from 'next/router';
import SignIn from '../components/SignIn';
import useUser from '../components/User';
import styled from 'styled-components';
import SignUp from '../components/SignUp';
import RequestReset from '../components/RequestReset';

const GridStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  grid-gap: 2rem;
`;
export default function SignInPage() {
  const user = useUser();

  return (
    <GridStyles>
      {/*  // Check if already signed in */}
      {/* {user && Router.push('/')} */}
      {/* {!user && <SignIn />} */}
      <SignIn />
      <SignUp />
      <RequestReset />
    </GridStyles>
  );
}
