import * as React from "react";
import { CartEntity } from "./Types";
import styled from "styled-components";
import formatMoney from "../lib/formatMoney";
import DeleteFromCart from "./DeleteFromCart";

const CartItemStyles = styled.div`
  padding: 1rem;
  border-bottom: 1px solid var(--secondaryColor);
  display: flex;

  img {
    margin-right: 1rem;
  }
  h3,
  p {
    margin: 0;
  }
`;

const CartItem: React.FC<{ cart: CartEntity }> = ({ cart }) => {
  return (
    <CartItemStyles>
      <img
        width='100'
        src={cart?.product?.photo?.image?.publicUrlTransformed}
      />
      <div>
        <h3> {cart.product.name}</h3>
        <p>
          {formatMoney(cart.product.price * cart.quantity)} -
          <em style={{ color: "blue", fontWeight: "bold" }}>
            {cart.quantity} &times; {formatMoney(cart.product.price)} each
          </em>
        </p>
      </div>
      <DeleteFromCart cartId={cart.id} />
    </CartItemStyles>
  );
};

export default CartItem;
