import { integer, text, relationship, virtual } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';

export const Order = list({
  fields: {
    label: virtual({
      // virtual field is calculated on demand
      // its not stored in the database

      graphQLReturnType: 'String',
      resolver(item) {
        return item.total;
      },
    }),
    total: integer(),
    items: relationship({ ref: 'OrderItem.order', many: true }),
    user: relationship({
      ref: 'User.orders',
    }),
    charge: text(),
  },
});
