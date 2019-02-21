import React from "react";
import PropTypes from "prop-types";

const Transaction = props => {
  Transaction.propTypes = {
    transaction: PropTypes.object.isRequired
  };

  const {
    isModeSend,
    executed,
    amount,
    selectedName,
    note,
    date,
    newBalance
  } = props.transaction;
  return (
    <div className="transaction">
      <div className="transaction__left__left">
        <div className="transaction__left__message">
          {isModeSend ? "Sent" : executed ? "Received" : "Requested"} €{amount}{" "}
          {isModeSend ? "to" : "from"} {selectedName}
        </div>
        {note && <div className="transaction__left__note">{note}</div>}
      </div>
      <div className="transaction__right">
        <div className="transaction__right__date">{date}</div>
        <div className="transaction__right__balance">
          {" "}
          Balance: € {newBalance}
        </div>
      </div>
    </div>
  );
};

export default Transaction;
