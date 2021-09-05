import * as React from 'react';
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { loadStripe, StripeError } from '@stripe/stripe-js';
import styled from 'styled-components';
import CommerceButton from './styles/CommerceButton';
import nProgress from 'nprogress';

const CheckoutFormStyles = styled.form`
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.4);
  border-radius: 5px;
  padding: 1rem;
  display: grid;
  gap: 1rem;
`;

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

const CheckoutFrom = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<StripeError | null>();
  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (e) => {
    //1. Stop the form the submitting & turn the loader on
    e.preventDefault();
    setLoading(true);
    console.log('Series business is about to start');
    nProgress.start();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
    console.log(paymentMethod);
    if (error) {
      setError(error);
    }
    // Code goes here

    setLoading(false);
    nProgress.done();
  };
  return (
    <CheckoutFormStyles onSubmit={handleSubmit}>
      {error && (
        <p style={{ fontSize: '1.5rem', color: 'red' }}>{error.message}</p>
      )}
      <CardElement />
      <CommerceButton type="submit">Checkout Now</CommerceButton>
    </CheckoutFormStyles>
  );
};

const Checkout = () => {
  return (
    <Elements stripe={stripeLib}>
      <CheckoutFrom></CheckoutFrom>
    </Elements>
  );
};

export default Checkout;
