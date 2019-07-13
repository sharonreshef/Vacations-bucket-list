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
import { getVacationData, editVacation } from '../../actions/vacation';

const EditModal = ({
  vacationId,
  vacation,
  getVacationData,
  editVacation,
  loading
}) => {
  console.log(vacation);
  const [formData, setFormData] = useState({
    vacationDescription: '',
    image: '',
    startingDate: '',
    endingDate: '',
    price: ''
  });

  const [displayModal, toggleModal] = useState(false);

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();

    if (Date.parse(formData.endingDate) <= Date.parse(formData.startingDate)) {
      alert('End date should be greater than Start date');
      console.log('wrong dates');
      return;
    } else if (isNaN(formData.price)) {
      alert('price should be in numbers');
      return;
    } else {
      console.log(formData);
      console.log(vacationId, formData);
      editVacation(vacationId, formData, vacation);
      toggleModal(!displayModal);
    }
  };

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

      {displayModal && vacation != null && (
        <Fragment>
          <MDBModal isOpen={true} size='lg' centered>
            <MDBModalHeader toggle={() => toggleModal(!displayModal)}>
              Edit Vacation
            </MDBModalHeader>
            <form onSubmit={e => onSubmit(e)}>
              <MDBModalBody>
                <div className='form-group'>
                  <MDBRow>
                    <MDBCol>
                      {' '}
                      <MDBInput
                        name='vacationDescription'
                        label='Vacation description'
                        onChange={e => onChange(e)}
                        valueDefault={vacation[0].vacationDescription}
                      />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol>
                      <MDBInput
                        name='image'
                        label='Image link'
                        onChange={e => onChange(e)}
                        valueDefault={vacation[0].image}
                      />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol size={6}>
                      <MDBInput
                        type='date'
                        name='startingDate'
                        label='Start date'
                        onChange={e => onChange(e)}
                        valueDefault={vacation[0].startingDate}
                      />
                    </MDBCol>
                    <MDBCol size={6}>
                      <MDBInput
                        type='date'
                        name='endingDate'
                        label='End date'
                        onChange={e => onChange(e)}
                        valueDefault={vacation[0].endingDate}
                      />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol>
                      {' '}
                      <MDBInput
                        name='price'
                        label='Price'
                        onChange={e => onChange(e)}
                        valueDefault={vacation[0].price}
                      />
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
                <MDBBtn color='primary' type='submit'>
                  Save changes
                </MDBBtn>
              </MDBModalFooter>
            </form>
          </MDBModal>
        </Fragment>
      )}
    </div>
  );
};

EditModal.propTypes = {
  getVacationData: PropTypes.func.isRequired,
  vacation: PropTypes.object.isRequired,
  editVacation: PropTypes.func.isRequired,
  loading: PropTypes.bool
};

const mapStateToProps = state => ({
  vacation: state.vacation.vacation,
  loading: state.vacation.loading
});

export default connect(
  mapStateToProps,
  { getVacationData, editVacation }
)(EditModal);
