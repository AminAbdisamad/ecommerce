import { CartEntity } from '../components/Types';

export default function calculateTotalPrice(cart: CartEntity[]): number {
  return cart.reduce((tally, cartItem) => {
    if (!cartItem.product) return tally; // deleted products could still be in your cart
    return tally + cartItem.quentity * cartItem.product.price;
  }, 0);
}
