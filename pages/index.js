import React, { useEffect, useState } from "react";
import Layout from "../components/layouts/Layout"; //absolute import -> '@/components/layouts/Layout'
import api from "../api/index.js"; //absolute import -> '@/api'
import ProductList from "../components/elements/ProductLists"; //absolute import -> '@/components/layouts/ProductList/ProductList versi gegy | kalau versi gue langsung index'
import Cart from "../components/elements/Cart"; // //absolute import -> '@/xxxxx'

import styles from "../styles/Home.module.css";

export default function Home() {
  const [getProducts, setProducts] = useState([]);

  const fetchProduct = async () => {
    try {
      const response = await api.get("/products");
      const data = await response.data.payload;
      setProducts(data);
    } catch (err) {
      console.log({ err: "fetching products failed" });
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <>
      <Layout>
        <h1>👏 BELANJA KUY! 👏</h1>
        <div className={styles.home}>
          <ProductList products={getProducts} />
          <Cart />
        </div>
      </Layout>
    </>
  );
}
