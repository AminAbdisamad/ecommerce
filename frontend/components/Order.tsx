import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import * as React from 'react';
import { OrderType } from './Types';
import styled from 'styled-components';
import formatMoney from '../lib/formatMoney';

const OrderStyles = styled.div`
  text-align: center;
  font-size: 1.5rem;
  div {
    div {
      display: flex;
      justify-content: center;
      align-items: center;
      border-bottom: 1px dashed #5f5f5f;
      padding: 1rem;
    }
    ul {
      list-style: none;
    }
  }
`;
const ORDER_QUERY = gql`
  query ORDER_QUERY($id: ID!) {
    Order(where: { id: $id }) {
      id
      total
      charge

      user {
        name
        email
        isAdmin
        cart {
          quantity
        }
      }
      items {
        name
        description
        price
        quantity
        photo {
          id
          image {
            publicUrlTransformed
          }
        }
      }
    }
  }
`;

interface Order {
  Order: OrderType;
}
const Order: React.FC<{ id: string }> = ({ id }) => {
  const { data, loading, error } = useQuery<Order>(ORDER_QUERY, {
    variables: { id },
  });

  console.log(id);
  if (loading) {
    return <div>{loading && <p>Loading...</p>}</div>;
  }
  if (error) {
    return <div>{error && <p>{error.message}</p>}</div>;
  }
  const { Order: orderData } = data;
  return (
    <OrderStyles>
      <p>
        Hello {orderData?.user.name}, Your order is being completed successfully
      </p>
      <p>Here are your order details</p>
      <div>
        {orderData?.items.map((item) => (
          <div>
            <img width="100px" src={item.photo?.image?.publicUrlTransformed} />
            <ul>
              <li>
                <h3>{item.name}</h3>
              </li>
              <li>{item.description}</li>
              <li>
                {formatMoney(item.price)} &times;{item.quantity}{' '}
              </li>
            </ul>
          </div>
        ))}

        <h2>Total: {formatMoney(orderData?.total)}</h2>
      </div>
    </OrderStyles>
  );
};

export default Order;
