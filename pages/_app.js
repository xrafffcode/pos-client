import React from "react";
import CartProvider from "../context/cartContext";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <CartProvider>
      <Component {...pageProps} />
    </CartProvider>
  );
}
