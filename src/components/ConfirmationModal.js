import React, { Fragment } from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";
import SuccessAnimation from "./SuccessAnimation";

const ConfirmationModal = props => {
  ConfirmationModal.propTypes = {
    transactionToBeConfirmed: PropTypes.object,
    closeModal: PropTypes.func,
    confirmTransaction: PropTypes.func
  };

  const {
    isModeSend,
    selectedName,
    amount,
    isConfirmed
  } = props.transactionToBeConfirmed;
  const { transactionToBeConfirmed, closeModal, confirmTransaction } = props;
  return (
    <Modal
      isOpen={transactionToBeConfirmed.selectedName !== undefined}
      onRequestClose={closeModal}
      contentLabel="Transfer Details"
      className="modal"
      ariaHideApp={false}
    >
      {!isConfirmed && (
        <Fragment>
          <h2 className="">
            {isModeSend ? "Send" : "Request"} €{amount}{" "}
            {isModeSend ? "to" : "from"} {selectedName}?
          </h2>
          <button className="button negative" onClick={closeModal}>
            Cancel
          </button>
          <button className="button positive" onClick={confirmTransaction}>
            {isModeSend ? "Send" : "Request"}
          </button>
        </Fragment>
      )}

      {isConfirmed && (
        <Fragment>
          <SuccessAnimation />
          <h2 className="success">
            You {isModeSend ? "sent" : "requested"} €{amount}{" "}
            {isModeSend ? "to" : "from"} {selectedName}!
          </h2>
          <button className="button" onClick={closeModal}>
            Okay
          </button>
        </Fragment>
      )}
    </Modal>
  );
};

export default ConfirmationModal;
