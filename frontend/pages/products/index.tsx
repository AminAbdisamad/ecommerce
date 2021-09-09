import Products from '../../components/Products';
import Pagination from '../../components/Pagination';
import { useRouter } from 'next/router';

export default function ProductPage() {
  const router = useRouter();

  // @ts-ignore
  const page = parseInt(router.query.page);

  return (
    <>
      <Pagination page={page || 1} />
      <Products page={page || 1} />
      <Pagination page={page || 1} />
    </>
  );
}

// named export
// default export

export const x = () => {
  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
};
