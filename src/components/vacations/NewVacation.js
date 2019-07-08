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
import { addVacation } from '../../actions/vacation';

const NewVacation = ({ addVacation }) => {
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

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div>
      <MDBBtn
        color='info'
        onClick={e => {
          toggleModal(!displayModal);
        }}
      >
        Add Vacation
      </MDBBtn>

      {displayModal && (
        <Fragment>
          <MDBModal isOpen={true} size='lg' centered>
            <MDBModalHeader toggle={() => toggleModal(!displayModal)}>
              Add vacation
            </MDBModalHeader>
            <form
              onSubmit={e => {
                e.preventDefault();
                toggleModal(!displayModal);
                console.log(formData);
                addVacation({ formData });
                setFormData({
                  vacationDescription: '',
                  image: '',
                  startingDate: '',
                  endingDate: '',
                  price: ''
                });
              }}
            >
              <MDBModalBody>
                <div className='form-group'>
                  <MDBRow>
                    <MDBCol>
                      {' '}
                      <MDBInput
                        label='Vacation description'
                        name='vacationDescription'
                        valueDefault={vacationDescription}
                        onChange={e => onChange(e)}
                      />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol>
                      <MDBInput
                        label='Image link'
                        name='image'
                        valueDefault={image}
                        onChange={e => onChange(e)}
                      />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol size={6}>
                      <MDBInput
                        type='date'
                        label='Start date'
                        name='startingDate'
                        valueDefault={startingDate}
                        onChange={e => onChange(e)}
                      />
                    </MDBCol>
                    <MDBCol size={6}>
                      <MDBInput
                        type='date'
                        label='End date'
                        name='endingDate'
                        valueDefault={endingDate}
                        onChange={e => onChange(e)}
                      />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol>
                      {' '}
                      <MDBInput
                        label='Price'
                        name='price'
                        valueDefault={price}
                        onChange={e => onChange(e)}
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

NewVacation.propTypes = {
  addVacation: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  vacation: state.vacation.vacation
});

export default connect(
  null,
  { addVacation }
)(NewVacation);
