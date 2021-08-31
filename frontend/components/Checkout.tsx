import * as React from 'react';
import { CardElement, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import styled from 'styled-components';
import CommerceButton from './styles/CommerceButton';

const CheckoutFormStyles = styled.form`
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.4);
  border-radius: 5px;
  padding: 1rem;
  display: grid;
  gap: 1rem;
`;

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

const Checkout = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Series business is about to start');
  };
  return (
    <Elements stripe={stripeLib}>
      <CheckoutFormStyles onSubmit={handleSubmit}>
        <CardElement />
        <CommerceButton type="submit">Checkout Now</CommerceButton>
      </CheckoutFormStyles>
    </Elements>
  );
};

export default Checkout;
