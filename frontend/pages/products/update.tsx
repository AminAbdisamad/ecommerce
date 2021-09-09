import UpdateProduct from '../../components/UpdateProduct';
import { x } from './index';

export default function UpdatePage({ query }) {
  return <UpdateProduct id={query.id} />;
}
const y = x();
console.log(y);
