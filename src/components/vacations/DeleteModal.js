import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  MDBBtn,
  MDBCol,
  MDBRow,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBInput
} from 'mdbreact';
import { deleteVacation } from '../../actions/vacation';

const DeleteModal = ({ vacationId, deleteVacation }) => {
  const [displayModal, toggleModal] = useState(false);

  return (
    <div>
      <MDBBtn
        color='danger'
        onClick={async e => {
          await toggleModal(!displayModal);
        }}
      >
        Delete
      </MDBBtn>

      {displayModal && (
        <Fragment>
          <MDBModal isOpen={true} size='lg' centered>
            <MDBModalHeader toggle={() => toggleModal(!displayModal)}>
              Delete vacation
            </MDBModalHeader>

            <MDBModalBody>
              Are you sure you want to delete this vacation?
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn
                color='secondary'
                onClick={() => toggleModal(!displayModal)}
              >
                Cancel
              </MDBBtn>
              <MDBBtn
                color='primary'
                type='submit'
                onClick={e => {
                  deleteVacation(vacationId);
                }}
              >
                Delete
              </MDBBtn>
            </MDBModalFooter>
          </MDBModal>
        </Fragment>
      )}
    </div>
  );
};

DeleteModal.propTypes = {
  deleteVacation: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteVacation }
)(DeleteModal);
