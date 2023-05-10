import React, { createContext, useContext, useReducer, useState } from "react";

const CartContext = createContext(null);
const CartDispatchContext = createContext(null);


const cartsReducer = (state, action) => {
  switch (action.type) {
    case 'add':
      const existingCart = state.find((cart) => cart.id === action.payload.id);

      if (existingCart) {
        return state.map((cart) =>
          cart.id === action.payload.id
            ? { ...cart, quantity: cart.quantity + 1 }
            : cart
        );
      } else {
        return [...state, { ...action.payload, quantity: 1 }];
      }
    case 'remove':
      return state.filter((cart) => cart.id !== action.payload.id);
    case 'increment':
      return state.map((cart) =>
        cart.id === action.payload.id
          ? { ...cart, quantity: cart.quantity + 1 }
          : cart
      );
    case 'decrement':
      return state.map((cart) => {
        if (cart.id === action.payload.id && cart.quantity > 1) {
          return { ...cart, quantity: cart.quantity - 1 };
        } else {
          return cart;
        }
      }).filter((cart) => cart.quantity > 0);
    case 'clear':
      return [];

    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};



const initialState = [];

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartsReducer, initialState);

  return (
    <CartContext.Provider value={state}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartContext.Provider>
  );
};

export default CartProvider;

export function useCart() {
  return useContext(CartContext);
}

export function useCartDispatch() {
  return useContext(CartDispatchContext);
}
