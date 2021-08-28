import Reset from '../components/Reset';

export default function TokenPage({ query }) {
  console.log({ query });
  return <Reset token={query.token} />;
}
