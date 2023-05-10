import React from "react";
import styles from "./index.module.css";
import Image from "next/image";

import { useCartDispatch } from "../../../context/cartContext";

const CardList = ({ products }) => {
  const dispatch = useCartDispatch();

  const handleAddToCart = (product) => {
    dispatch({ type: 'add', payload: product });
  };


  return products.map((product, index) => {
    return (
      <div key={index} className={styles["product-list__product-card"]}>
        <div className={styles["product-list__product-card__image"]}>
          <Image
            src={product.img_product}
            alt={product.name}
            style={{ objectFit: "contain" }}
            fill
            sizes="(max-width: 768px) 100vw,
  
            (max-width: 1200px) 50vw,
              33vw"
            priority={false}
            placeholder={product.name}
          />
        </div>
        <div className={styles["product-list__product-card__desc"]}>
          <div>
            <p>{product.name}</p>
            <p>{product.price}</p>
            <div className={styles.product_stock}>
              <p>Stock: {product.stock}</p>
            </div>
          </div>
          <button onClick={() => handleAddToCart(product)}>+</button>
        </div>
      </div>
    );
  });
};

const ProductList = ({ products }) => {
  return (
    <div className={styles["product-list"]}>
      <CardList products={products} />
    </div>
  );
};
export default ProductList;
