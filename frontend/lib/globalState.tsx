import { createContext, useContext, useState } from 'react';

const LocalStateContext = createContext(null);
const LocalStateProvider = LocalStateContext.Provider; // Provider

// Create Global State & use on high level component
export const CartStateProvider = ({ children }) => {
  const [cartOpen, setCartOpen] = useState(false);

  function cartToggle() {
    !cartOpen;
  }
  function closeCart() {
    setCartOpen(false);
  }
  function openCart() {
    setCartOpen(true);
  }

  return (
    <LocalStateProvider value={{ cartOpen, setCartOpen, closeCart, openCart }}>
      {children}
    </LocalStateProvider>
  );
};

// Consume Global State
export const useCart = () => {
  const all = useContext(LocalStateContext); //Consumer
  return all;
};
