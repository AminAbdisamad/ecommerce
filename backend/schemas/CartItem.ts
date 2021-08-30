import { list } from '@keystone-next/keystone/schema';
import { text, relationship, password, integer } from '@keystone-next/fields';

export const CartItem = list({
  // access
  // ui
  fields: {
    //   Cart labels here
    quantity: integer({
      defaultValue: 1,
      isRequired: true,
    }),
    product: relationship({
      ref: 'Product.cart',
    }),
    user: relationship({
      ref: 'User.cart',
    }),
  },
});
