import React from "react";
import styles from "./index.module.css";

const TransactionList = ({ transactions }) => {
    return (
        <div className={styles.transactions_list}>
            {transactions.map((transaction) => (
                <div key={transaction.id} className={styles["transaction-list__transaction-card"]}>
                    <div>
                        <h1>Nomer Order: {transaction.no_order}</h1>
                        <p>Total Harga: {transaction.total_price}</p>
                        <p>Dibayar: {transaction.paid_amount}</p>

                    </div>
                    <div className={styles.products_list}>
                        <h1>Daftar Produk</h1>
                        {transaction.products.map((product) => (
                            <div key={product.id}>
                                <p>{product.product} - {product.quantity}</p>
                            </div>
                        ))}

                    </div>
                </div>
            ))}
        </div>
    );
}

export default TransactionList;