import { KeystoneContext } from '@keystone-next/types';
import { CartItem } from '../schemas/CartItem';
import { Order } from '../schemas/Order';
import {
  CartItemCreateInput,
  OrderCreateInput,
  UserCreateInput,
} from '../.keystone/schema-types';
import { products } from '../data/data';
import { stripeConfig } from '../lib/stripe';
import { User } from '../schemas/User';
import { Session } from '../types';

const graphQL = String.raw;

export const checkout = async (
  root: any,
  { token }: { token: string },
  context: KeystoneContext
): Promise<OrderCreateInput> => {
  // Get check signedin user
  const userId = context.session.itemId;
  console.log(userId);
  if (!userId) {
    throw new Error('You need logged in to process this task');
  }
  // Get Current User
  const currentUser: UserCreateInput = await context.lists.User.findOne({
    where: { id: userId },
    resolveFields: graphQL`
    id
    name
    email
    cart {
      id
      quantity
      product{
        name
        price
        description
        id
        photo{
          id
          image{
            id
            publicUrlTransformed
          }
        }
      }
    }
    `,
  });
  const cartItems: CartItemCreateInput[] = currentUser.cart?.filter(
    (cartItem: CartItemCreateInput) => cartItem.product
  );
  const amount = cartItems?.reduce(
    (tally: number, cartItem) =>
      tally + cartItem?.quantity * cartItem?.product?.price,
    0
  );

  // Stripe charge
  const charge = await stripeConfig.paymentIntents
    .create({
      amount,
      currency: 'USD',
      confirm: true,
      payment_method: token,
    })
    .catch((err) => {
      console.log(err);
      throw new Error(err.message);
    });

  console.log('charge');
  console.log(charge);

  const orderItems = cartItems.map((cartItem) => {
    const orderItem = {
      name: cartItem.product.name,
      description: cartItem.product.description,
      price: cartItem.product.price,
      quantity: cartItem.quantity,
      photo: { connect: { id: cartItem.product.photo.id } },
    };
    return orderItem;
  });

  // Creat order
  const order: OrderCreateInput = await context.lists.Order.createOne({
    data: {
      total: charge.amount,
      charge: charge.id,
      items: { create: orderItems },
      user: { connect: { id: userId } },
    },
  });

  // clean order cart
  const cartItemIds = cartItems.map((cartItem) => cartItem.id);
  await context.lists.CartItem.deleteMany({
    ids: cartItemIds,
  });
  console.log('order');
  console.log(order);
  return order;
};
