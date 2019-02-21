import React, { Fragment } from "react";
import { FaAngleDoubleUp } from "react-icons/fa";
import { pastTransactions } from "../data/pastTransactions";
import TransferForm from "./TransferForm";
import ConfirmationModal from "./ConfirmationModal";
import ResponseModal from "./ResponseModal";
import TransactionList from "./TransactionList";
import Header from "./Header";

class TransferPage extends React.Component {
  state = {
    balance: 0,
    transactions: [],
    isResponseModalOpen: false,
    isModeSend: true,
    transactionToBeConfirmed: {
      isModeSend: undefined,
      selectedName: undefined,
      amount: undefined,
      note: undefined,
      isConfirmed: false
    }
  };

  firstPage = React.createRef();
  secondPage = React.createRef();

  componentDidMount() {
    this.setState(() => pastTransactions);
  }

  confirmTransaction = () => {
    console.log("transaction confirmed");
    this.setState(
      prevState => ({
        transactionToBeConfirmed: {
          ...prevState.transactionToBeConfirmed,
          isConfirmed: true
        }
      }),
      this.processTransaction(this.state.transactionToBeConfirmed)
    );
  };

  closeModal = () => {
    this.setState(prevState => ({
      ...prevState,
      transactionToBeConfirmed: {
        isModeSend: undefined,
        selectedName: undefined,
        amount: undefined,
        note: undefined,
        isConfirmed: false
      }
    }));
  };

  handleSubmitForm = (isModeSend, selectedName, amount, note) => {
    this.setState(() => ({
      transactionToBeConfirmed: {
        isModeSend,
        selectedName,
        amount: parseFloat(amount),
        note,
        isConfirmed: false
      }
    }));
  };

  processTransaction = transaction => {
    const { isModeSend, selectedName, amount, note } = transaction;
    const { balance } = this.state;
    const newBalance = isModeSend ? balance - amount : balance;
    const date = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric"
    });

    this.setState(
      prevState => ({
        balance: newBalance,
        transactions: [
          {
            isModeSend,
            executed: false,
            selectedName,
            amount,
            note,
            newBalance,
            date
          },
          ...prevState.transactions
        ]
      }),
      this.executeTransaction
    );
  };

  executeTransaction = () => {
    const transactions = [...this.state.transactions];
    const newBalance = transactions[0].newBalance + transactions[0].amount;
    transactions[0] = { ...transactions[0], executed: true, newBalance };
    if (!transactions[0].isModeSend) {
      setTimeout(() => {
        this.setState(() => ({
          transactions,
          balance: newBalance,
          isResponseModalOpen: true
        }));
      }, 7000);
    }
  };

  closeResponseModal = () => {
    this.setState(() => ({ isResponseModalOpen: false }));
  };

  toggleSendMode = () => {
    this.setState(() => ({ isModeSend: true }));
    this.scroll(this.secondPage);
  };

  toggleRequestMode = () => {
    this.setState(() => ({ isModeSend: false }));
    this.scroll(this.secondPage);
  };

  scrollToFirstPage = () => {
    this.scroll(this.firstPage);
  };

  scroll = ref => {
    ref.current.scrollIntoView({ block: "start", behavior: "smooth" });
  };

  render() {
    const {
      transactionToBeConfirmed,
      transactions,
      balance,
      isResponseModalOpen,
      isModeSend
    } = this.state;
    return (
      <Fragment>
        <div className="TransferPage__FirstScreen" ref={this.firstPage}>
          <Header balance={balance} />
          <div className="TransferPage__FirstScreen__ButtonsBlock">
            <div className="TransferPage__FirstScreen__ButtonsBlock__Buttons">
              <button className="button" onClick={this.toggleSendMode}>
                Send money
              </button>
              <button className="button" onClick={this.toggleRequestMode}>
                Request money
              </button>
            </div>
          </div>
        </div>
        <div className="TransferPage__SecondScreen" ref={this.secondPage}>
          <div className="TransferPage__SecondScreen__Header">
            <button
              className="inverted-button"
              onClick={this.scrollToFirstPage}
            >
              <FaAngleDoubleUp />
            </button>
            <h1 className="balance">
              Balance: <span className="balance__number">€ {balance} </span>
            </h1>
          </div>

          <ConfirmationModal
            transactionToBeConfirmed={transactionToBeConfirmed}
            closeModal={this.closeModal}
            confirmTransaction={this.confirmTransaction}
          />

          {/* ResponseModal used for fake request fullfillments */}
          <ResponseModal
            transaction={transactions[0]}
            isResponseModalOpen={isResponseModalOpen}
            closeResponseModal={this.closeResponseModal}
            transactionToBeConfirmed={transactionToBeConfirmed}
          />
          <TransferForm
            isModeSend={isModeSend}
            balance={balance}
            handleSubmitForm={this.handleSubmitForm}
          />
          <TransactionList transactions={transactions} />
        </div>
      </Fragment>
    );
  }
}

export default TransferPage;
