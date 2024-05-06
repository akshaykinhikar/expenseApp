import React, { useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import AddExpenseComponent from './AddExpenseComponent';

const EditExpenseModal = (props) => {
    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Expense </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <AddExpenseComponent transaction={props.transaction}
                    closeModal={props.handleClose}
                    recordUpdated={props.recordEdited}
                    setRecordUpdated={props.setRecordEdited}
                />
            </Modal.Body>
            {/* <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={onSubmit(props.transaction)}>
                    Save Changes
                </Button>
            </Modal.Footer> */}
        </Modal>
    )
}

export default EditExpenseModal;