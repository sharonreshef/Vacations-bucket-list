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
import { getVacationData } from '../../actions/vacation';

const EditModal = ({ vacationId, vacation, getVacationData }) => {
  const [formData, setFormData] = useState({
    vacationDescription: '',
    image: '',
    startingDate: '',
    endingDate: '',
    price: ''
  });

  const [displayModal, toggleModal] = useState(false);
  const {
    vacationDescription,
    image,
    startingDate,
    endingDate,
    price
  } = formData;

  console.log(vacationId);

  return (
    <div>
      <MDBBtn
        color='info'
        onClick={async e => {
          await getVacationData(vacationId);
          await toggleModal(!displayModal);
        }}
      >
        Edit
      </MDBBtn>

      {displayModal && (
        <Fragment>
          <MDBModal isOpen={true} size='lg' centered>
            <MDBModalHeader toggle={() => toggleModal(!displayModal)}>
              Edit Vacation
            </MDBModalHeader>
            <MDBModalBody>
              <div className='form-group'>
                <MDBRow>
                  <MDBCol>
                    {' '}
                    <MDBInput
                      label='Vacation description'
                      value={vacation[0].vacationDescription}
                    />
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol>
                    <MDBInput label='Image link' value={vacation[0].image} />
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol size={6}>
                    <MDBInput
                      type='date'
                      label='Start date'
                      value={vacation[0].startingDate}
                    />
                  </MDBCol>
                  <MDBCol size={6}>
                    <MDBInput
                      type='date'
                      label='End date'
                      value={vacation[0].endingDate}
                    />
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol>
                    {' '}
                    <MDBInput label='Price' value={vacation[0].price} />
                  </MDBCol>
                </MDBRow>
              </div>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn
                color='secondary'
                onClick={() => toggleModal(!displayModal)}
              >
                Close
              </MDBBtn>
              <MDBBtn color='primary'>Save changes</MDBBtn>
            </MDBModalFooter>
          </MDBModal>
        </Fragment>
      )}
    </div>
  );
};

EditModal.propTypes = {
  getVacationData: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  vacation: state.vacation.vacation
});

export default connect(
  mapStateToProps,
  { getVacationData }
)(EditModal);
