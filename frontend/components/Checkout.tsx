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
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

const CheckoutFormStyles = styled.form`
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.4);
  border-radius: 5px;
  padding: 1rem;
  display: grid;
  gap: 1rem;
`;

const CHECKOUT_MUTATION = gql`
  mutation CHECKOUT_MUTATION($token: String!) {
    checkout(token: $token) {
      total
      charge
      items {
        name
        description
        price
        quantity
      }
    }
  }
`;

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

const CheckoutFrom = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<StripeError | null>();
  const [checkout, { error: graphQLError }] = useMutation(CHECKOUT_MUTATION);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: any) => {
    //1. Stop the form the submitting & turn the loader on
    e.preventDefault();
    setLoading(true);
    console.log('Series business is about to start');
    nProgress.start();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
    console.log(paymentMethod.id);
    if (error) {
      setError(error);
      nProgress.done();
      return; // stop function when errors
    }

    // Code goes here
    const order = await checkout({ variables: { token: paymentMethod.id } });
    console.log('Displaying orders');
    console.log(order);
    setLoading(false);
    nProgress.done();
  };
  return (
    <CheckoutFormStyles onSubmit={handleSubmit}>
      {error && (
        <p style={{ fontSize: '1.5rem', color: 'red' }}>{error.message}</p>
      )}
      {graphQLError && (
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
