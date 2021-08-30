import { KeystoneContext } from '@keystone-next/types';
import { Session } from '../types';
import { CartItemCreateInput } from '../.keystone/schema-types';

export default async function addToCart(
  root: any,
  { productId }: { productId: string },
  context: KeystoneContext
) {
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

  const [existingItem] = allCartItems as Array<any>;
  console.log(existingItem);
  if (existingItem) {
    console.log(
      `There are already ${existingItem.quantity}Items in the cart Adding new one`
    );
  }
}
