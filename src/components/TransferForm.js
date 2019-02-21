import React from "react";
import PropTypes from "prop-types";
import AutoComplete from "./AutoComplete";

export default class TransferForm extends React.Component {
  static propTypes = {
    isModeSend: PropTypes.bool,
    balance: PropTypes.number.isRequired,
    handleSubmitForm: PropTypes.func
  };

  state = {
    selectedName: undefined,
    amount: "",
    note: "",
    lessThanBalance: false
  };

  handleAmountInputChange = e => {
    const amount = e.target.value;
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ amount }));
      if (this.props.isModeSend) {
        this.compareWithBalance(amount);
      }
    }
  };

  compareWithBalance = amount => {
    if (amount > this.props.balance) {
      this.setState(() => ({ lessThanBalance: true }));
    } else {
      this.setState(() => ({ lessThanBalance: false }));
    }
  };

  setSelectedName = selectedName => {
    this.setState(() => ({ selectedName }));
  };

  validateInputs = () => {
    const { selectedName, amount } = this.state;
    if (!selectedName || !amount) {
      return false;
    } else if (this.props.isModeSend && amount > this.props.balance) {
      return false;
    }
    return true;
  };

  handleSubmitForm = e => {
    e.preventDefault();
    const { selectedName, amount, note } = this.state;
    this.props.handleSubmitForm(
      this.props.isModeSend,
      selectedName,
      amount,
      note
    );
    this.clearInputs(e);
  };

  clearInputs = e => {
    this.setState(() => ({ amount: "", selectedName: "" }));
    e.target.elements.noteInput.value = "";
    this.autocomplete.clearInput();
  };

  render() {
    const { lessThanBalance, amount } = this.state;
    const disabled = !this.validateInputs();
    return (
      <form onSubmit={this.handleSubmitForm}>
        <h2>{this.props.isModeSend ? "Send to" : "Request from"}</h2>
        <AutoComplete
          setSelectedName={this.setSelectedName}
          ref={instance => {
            this.autocomplete = instance;
          }}
        />

        <h2>Amount</h2>
        <span className="input__currencySymbol">
          <input
            className={"input__field " + (lessThanBalance ? "error" : "")}
            onChange={this.handleAmountInputChange}
            type="text"
            name="moneyInput"
            placeholder="5"
            value={amount}
          />
        </span>
        {lessThanBalance && <p className="input-error">Insufficient balance</p>}

        <h2>Note</h2>
        <input
          className="input__field"
          name="noteInput"
          placeholder="Add a note"
          maxLength="26"
        />
        <br />
        <button className="button transferForm__button" disabled={disabled}>
          {this.props.isModeSend ? "Send" : "Request"}
        </button>
      </form>
    );
  }
}
