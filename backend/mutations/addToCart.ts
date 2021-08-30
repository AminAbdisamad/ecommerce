import { KeystoneContext } from '@keystone-next/types';
import { Session } from '../types';

export default async function addToCart(
  root: any,
  { productId }: { productId: string },
  context: KeystoneContext
): Promise<any> {
  // Get check signedin user
  console.log({ productId });
  const signedIn = context.session as Session;
  if (!signedIn.itemId) {
    throw new Error(' You Must be logged in to add products to cart');
  }

  const allCartItems = await context.lists.CartItem.findMany({
    where: {
      user: {
        id: signedIn.itemId,
      },
      product: {
        id: productId,
      },
    },
    resolveFields: 'id,quantity',
  });

  const existingItem: { quantity: number; id: string } = allCartItems[0];
  console.log(existingItem);
  if (existingItem) {
    console.log(
      `There are already ${existingItem.quantity} Items in the cart Adding new one`
    );

    return context.lists.CartItem.updateOne({
      id: existingItem.id,
      data: {
        quantity: existingItem.quantity + 1,
      },
    });
  }

  return context.lists.CartItem.createOne({
    data: {
      product: { connect: { id: productId } },
      user: { connect: { id: signedIn.itemId } },
    },
  });
}

// https://www.gittigidiyor.com/cart-login?returnUrl=%2Fsepetim%2Fsubmit-after-login%3FdiscountId%3D0%26cartItemIds%255B0%255D%3D490113302
