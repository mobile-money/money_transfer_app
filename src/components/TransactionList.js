import React from "react";
import PropTypes from "prop-types";
import Transaction from "./Transaction";

const TransactionList = props => {
  TransactionList.propTypes = {
    transactions: PropTypes.instanceOf(Array)
  };
  return (
    <div className="transactions">
      <h2>History</h2>
      {props.transactions.map((transaction, index) => (
        <Transaction key={index} transaction={transaction} />
      ))}
    </div>
  );
};

export default TransactionList;
