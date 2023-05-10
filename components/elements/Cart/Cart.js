import React, { useState, useEffect } from "react";
import { useCart, useCartDispatch } from "../../../context/cartContext";
import styles from "./index.module.css";
import api from "../../../api"; //absolute import -> '@/api'
import ReactModal from "react-modal";


const Cart = () => {
  const carts = useCart();

  const dispatch = useCartDispatch();

  const handleRemoveFromCart = (product) => {
    dispatch({ type: 'decrement', payload: product });
  };

  const handleAddToCart = (product) => {
    dispatch({ type: 'increment', payload: product });
  }

  const handleClearFromCart = (product) => {
    dispatch({ type: 'clear', payload: product });
  }

  function setTotalPrice() {
    const total = carts.reduce((a, b) => a + b.price * b.quantity, 0)
    setTotal(total)
  }




  const [getPaidAmount, setPaidAmount] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transaction, setTransaction] = useState(null);

  const handleCheckout = async () => {

    const paid = parseInt(getPaidAmount)

    // get carts just id and quantity
    const products = carts.
      map((cart) => {
        return {
          id: cart.id,
          quantity: cart.quantity
        }
      })


    const data = {
      total_price: carts.reduce((a, b) => a + b.price * b.quantity, 0),
      paid_amount: paid,
      products: products
    }

    try {
      const response = await api.post("/transactions", data);
      setTransaction(response.data.payload[0]);
      setIsModalOpen(true);
      dispatch({ type: "clear" });
    } catch (err) {
      console.log(err)
    }
  }

  const total = carts.reduce((a, b) => a + b.price * b.quantity, 0);


  return (
    <div className={styles.cart}>

      {isModalOpen && (
        <ReactModal isOpen={isModalOpen}>
          <div className={styles.modal}>
            <h2>Transaction Success</h2>
            <h1>Nomer Transaksi: {transaction?.no_order}</h1>
            <p>Total Belanja: {transaction?.total_price}</p>
            <p>Total Dibayar: {getPaidAmount}</p>
            <p>Kembalian
              : {getPaidAmount - transaction?.total_price}
            </p>
            <button onClick={() => {
              setIsModalOpen(false);
              setPaidAmount("");
            }} className={styles.button_close}>
              Selesai
            </button>

          </div>
        </ReactModal>
      )}

      <h3>MYCART</h3>
      <div className={styles.cart__list}>
        {carts.map((cart, index) => {
          return (
            <div key={index} className={styles.cart__list__item}>
              <img src={cart.img_product} alt={cart.name} className={styles.cart__list__item__image} />
              <div className={styles.info_product}>
                <p>{cart.name}</p>

                <p>{cart.price}</p>
              </div>

              <button className={styles.button} onClick={
                () => handleRemoveFromCart(cart)
              }>-</button>

              <p className={styles.qty}>{cart.quantity}</p>

              <button className={styles.button} onClick={
                () => handleAddToCart(cart)
              }>+</button>


            </div>
          );
        })}
      </div>

      <div className={styles.total}>
        <p>Total Price</p>
        <p>{carts.reduce((a, b) => a + b.price * b.quantity, 0)}</p>
        <input type="hidden" name="total" value={carts.reduce((a, b) => a + b.price * b.quantity, 0)} />
      </div>

      {carts.length > 0 && (
        <div className={styles.paid}>
          <p>Bayar</p>
          <input type="number" className={styles.paid_input} onChange={(e) => setPaidAmount(e.target.value)} value={getPaidAmount} />
        </div>
      )}

      <button className={styles.button_clear} onClick={
        () => handleClearFromCart()
      }>Clear Cart</button>

      {carts.length > 0 && (
        <button className={styles.button_clear} onClick={() => handleCheckout()}>
          Checkout
        </button>
      )}
    </div>

  );
};

export default Cart;
