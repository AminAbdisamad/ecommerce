import { config, createSchema } from '@keystone-next/keystone/schema';
import { createAuth } from '@keystone-next/auth';
import {
  withItemData,
  statelessSessions,
} from '@keystone-next/keystone/session';
import { OrderItem } from './schemas/OrderItem';
import { Role } from './schemas/Role';
import { Session } from './types';
import { CartItem } from './schemas/CartItem';
import { ProductImage } from './schemas/ProductImage';
import { Product } from './schemas/Product';
import { User } from './schemas/User';
import { Order } from './schemas/Order';
import 'dotenv/config';
import { insertSeedData } from './data';
import { sendPasswordResetEmail } from './lib/mail';
import { extendGraphQLSchema } from './mutations';
import { permissionsList } from './schemas/fields';

const databaseURL = process.env.DATABASE_URL as string;

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360,
  secret: process.env.COOKIE_SECRET as string,
};

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
  },
  passwordResetLink: {
    async sendToken(args) {
      // await args;
      await sendPasswordResetEmail(args.token, args.identity);
    },
  },
});

export default withAuth(
  config({
    server: {
      cors: {
        origin: [process.env.FRONTEND_URL as string],
        credentials: true,
      },
    },
    db: {
      adapter: 'mongoose',
      url: databaseURL,
      async onConnect(keystone) {
        console.log('connected to the database');
        // Only insert
        if (process.argv.includes('--data')) {
          await insertSeedData(keystone);
        }
      },
    },
    lists: createSchema({
      User,
      Product,
      ProductImage,
      CartItem,
      OrderItem,
      Order,
      Role,
    }),
    extendGraphqlSchema: extendGraphQLSchema,
    ui: {
      isAccessAllowed: ({ session }: { session: Session }) => {
        console.log('Logged In User Info ', session);
        return !!session?.data;
      },
    },
    session: withItemData(statelessSessions(sessionConfig), {
      user: `id name email role{ ${permissionsList.join(' ')} }`,
    }),
  })
);
