import React, { useEffect, useState } from "react";
import Layout from "../components/layouts/Layout";
import api from "../api/index.js";
import TransactionList from "../components/elements/TransactionLists";
export default function Transaction() {
  const [getTransactions, setTransactions] = useState([]);
  console.log(getTransactions)
  const fetchTransaction = async () => {
    try {
      const response = await api.get("/transactions");
      const data = await response.data.payload.transactions;
      setTransactions(data);
    } catch (err) {
      console.log({ err: "fetching transaction failed" });
    }
  };

  useEffect(() => {
    fetchTransaction();
  }, []);


  return (
    <>
      <Layout>
        <h1>Transaction List</h1>
        <TransactionList transactions={getTransactions} />
      </Layout>
    </>
  );
}
