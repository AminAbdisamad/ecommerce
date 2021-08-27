import { PAGINATION_COUNT } from '../components/Pagination';

export default function paginationField() {
  return {
    keyArgs: false, // tells apollo we handle pagination by ourselves
    read(exisiting = [], { args, cache }) {
      const { skip, first: perPage } = args;
      //   Read number of items on page from the cache
      const data = cache.readQuery({ query: PAGINATION_COUNT });
      const count = data?._allProductsMeta?.count; // get count of all products
      const page = skip / perPage + 1; // calculates what page we're currently on
      const pages = Math.ceil(count / perPage); // how many pages
      //  Check if there's existing items
      const items = exisiting.slice(skip, skip + perPage).filter((x) => x);

      //   Lets say your perPage is set to 4, perPage=4
      // and you there's only 2 items left
      // We need to display

      if (items.length && items.length !== perPage && page === pages) {
        //   We're in the page which don't satisfy perPage

        return items;
      }

      if (items.length !== perPage) {
        //   we don't have items, go to the network and fetch them
        return false;
      }

      //   Display Item when safisfies perPage, 4 in our example
      if (items.length) {
        return items;
      }

      return false;

      //   ! TODO :- When Last Page has only Single Item you delete
      // ! It should return to the previous page
    },
    merge(existing: Array<[]>, incoming: Array<[]>, { args }) {
      const { skip, first: perPage } = args;
      // Run when apollo comes back from request with our data

      //   Merge & if there are existing items will take copy of them otherwise
      const merged = existing ? existing.slice(0) : [];

      for (let i = skip; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip];
      }
      console.log(merged);
      return merged;
    },
  };
}
