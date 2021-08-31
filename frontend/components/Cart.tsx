import useUser from './User';
import CartStyles from './styles/CartStyles';
import Supreme from './styles/Supreme';
import CartItem from './CartItem';
import formatMoney from '../lib/formatMoney';
import calculateTotalPrice from '../lib/calculateTotalPrice';
import { useCart } from '../lib/globalState';
import CloseButton from './styles/CloseButton';
import Checkout from './Checkout';

export default function Cart() {
  const { cartOpen, closeCart } = useCart();

  const user = useUser();
  if (!user) {
    return null;
  }

  return (
    <CartStyles open={cartOpen}>
      <header>
        <Supreme>{user?.name}'s Cart</Supreme>
        <CloseButton type="button" onClick={closeCart}>
          X
        </CloseButton>
      </header>

      {!user?.cart.length && (
        <div> Nothing on your cart yet, start your shopping</div>
      )}
      <div>
        {user?.cart?.map((cart) => (
          <CartItem key={cart.id} cart={cart} />
        ))}
      </div>
      <footer>
        <p>{formatMoney(calculateTotalPrice(user.cart))}</p>
        <Checkout />
      </footer>
    </CartStyles>
  );
}
