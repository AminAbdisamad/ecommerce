import { graphQLSchemaExtension } from '@keystone-next/keystone/schema';
import addToCart from './addToCart';
import { checkout, getUserByEmail } from './checkout';

const graphql = String.raw

export const extendGraphQLSchema = graphQLSchemaExtension({
  typeDefs: graphql`
    type Mutation {
      addToCart(productId: ID): CartItem
    }
    type Mutation {
      checkout(token: String): OrderItem
    }
    type Query {
      getUserByEmail(email: String): User
    }
  `,
  resolvers: {
    Mutation: {
      addToCart,
      checkout,
    },
    Quary: {
      getUserByEmail,
    },
  },
});
