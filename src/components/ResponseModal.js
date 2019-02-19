import React, { Fragment } from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";

const ResponseModal = props => {
  ResponseModal.propTypes = {
    transaction: PropTypes.object
  };
  return (
    <Modal
      isOpen={
        props.isResponseModalOpen &&
        props.transactionToBeConfirmed.selectedName === undefined
      }
      onRequestClose={props.closeResponseModal}
      contentLabel="Transfer Details"
      className="modal"
      ariaHideApp={false}
    >
      {props.transaction && (
        <Fragment>
          <h2>
            Received €{props.transaction.amount} from{" "}
            {props.transaction.selectedName}
          </h2>
          <button className="button" onClick={props.closeResponseModal}>
            Great
          </button>
        </Fragment>
      )}
    </Modal>
  );
};

export default ResponseModal;
