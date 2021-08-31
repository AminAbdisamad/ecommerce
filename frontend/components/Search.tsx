import { useLazyQuery } from '@apollo/client';
import { useCombobox } from 'downshift';
import gql from 'graphql-tag';
import debounce from 'lodash.debounce';
import Router from 'next/router';
import { DropDown, DropDownItem, SearchStyles } from './styles/Dropdown';

const SEARCH_PRODUCTS_QUERY = gql`
  query SEARCH_PRODUCTS_QUERY($searchTerm: String!) {
    searchTerms: allProducts(
      where: {
        OR: [
          { name_contains_i: $searchTerm }
          { description_contains_i: $searchTerm }
        ]
      }
    ) {
      id
      name
      description
      photo {
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

export default function Search() {
  const [fetchItem, { loading, data, error }] = useLazyQuery(
    SEARCH_PRODUCTS_QUERY,
    { fetchPolicy: 'no-cache' }
  );

  //Searching on input change fires a network request every key change
  // This means you're sending loads of network request
  // In this case we can debounce and tell the the app to send
  // network request every 350ms
  const items = data?.searchTerms || [];

  const lazyFetching = debounce(fetchItem, 350);
  const {
    getMenuProps,
    getComboboxProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
    isOpen,
    inputValue,
  } = useCombobox({
    items: items, // Items should be specified otherwise onSelectedItemChange wont work
    onInputValueChange() {
      lazyFetching({
        variables: {
          searchTerm: inputValue,
        },
      });
    },

    onSelectedItemChange({ selectedItem }: any) {
      console.log('on selecttt', selectedItem.id);
      //   /product/61247bc2ad397480e2d2ff42
      Router.push({
        pathname: `/product/${selectedItem.id}`,
      });
    },

    // To change from [object Object] to string to show product name
    itemToString: (item: { name: string }) => item?.name || '',
  });
  return (
    <SearchStyles>
      <div {...getComboboxProps()}>
        <input
          {...getInputProps({
            type: 'search',
            placeholder: 'Search Products ...',
            name: 'search',
            className: loading ? 'loading' : '',
          })}
        />
      </div>
      <DropDown {...getMenuProps()}>
        {/* Return result when search term found */}
        {isOpen &&
          items.map((term: any, index: number) => (
            <DropDownItem
              key={term.id}
              {...getItemProps({ item: term, index: index })}
              highlighted={index === highlightedIndex}
            >
              <img
                src={term.photo?.image?.publicUrlTransformed}
                alt={term.name}
                width="50px"
              />
              {term.name}
            </DropDownItem>
          ))}
        {/* Inform User if search term is not found */}
        {isOpen && !items.length && !loading && (
          <DropDownItem>Sorry No Items found for "{inputValue}" </DropDownItem>
        )}
      </DropDown>
    </SearchStyles>
  );
}
