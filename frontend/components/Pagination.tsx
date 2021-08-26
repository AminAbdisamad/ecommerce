import * as React from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head';
import Link from 'next/link';

import PaginationStyles from './styles/PaginationStyle';
import DisplayError from '../lib/DisplayError';
import { perPage } from '../config';

export const PAGINATION_COUNT = gql`
  query PAGINATION_COUNT {
    _allProductsMeta {
      count
    }
  }
`;

const Pagination: React.FC<{ page: number }> = ({ page }) => {
  const { data, loading, error } = useQuery(PAGINATION_COUNT);
  if (loading) {
    return <p>Loading..</p>;
  }
  if (error) {
    return <DisplayError error={error} />;
  }
  const { count } = data._allProductsMeta;

  const pageCount = Math.ceil(count / perPage);

  return (
    <>
      <PaginationStyles>
        <Head>
          <title>E commerce | Page {page} of _ </title>
        </Head>
        <Link href={`/products/${page - 1}`}>
          <a aria-disabled={page <= 1}>Previous </a>
        </Link>
        <p>
          Page {page} of {pageCount}
        </p>
        <p>{count} Items total </p>
        <Link href={`/products/${page + 1}`}>
          <a aria-disabled={page >= pageCount}>Next</a>
        </Link>
      </PaginationStyles>
    </>
  );
};

export default Pagination;
