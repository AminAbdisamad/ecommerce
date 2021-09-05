import { list } from '@keystone-next/keystone/schema';
import { text, relationship, password, checkbox } from '@keystone-next/fields';

export const User = list({
  // access
  // ui
  fields: {
    name: text({ isRequired: true }),
    email: text({ isRequired: true, isUnique: true }),
    isAdmin: checkbox(),
    password: password(),
    orders: relationship({
      ref: 'Order.user',
      many: true,
    }),
    cart: relationship({
      ref: 'CartItem.user',
      many: true,
    }),
  },

  ui: {
    // createView: {
    //   defaultFieldMode: 'hiden',
    // },
    // itemView:{
    //   fieldMo
    // }
    createView: { fieldMode: 'hidden' },
    // listView: { fieldMode: 'hidden' },
    itemView: { fieldMode: 'read' },
  },
});
