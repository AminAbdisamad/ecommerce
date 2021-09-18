import Order from '../components/Order';

function OrderPage({ query }) {
  return <Order id={query.id} />;
}

export default OrderPage;
