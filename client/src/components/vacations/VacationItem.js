import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addFollow, removeFollow } from '../../actions/vacation';

import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBCol,
  MDBRow
} from 'mdbreact';

import EditModal from './EditModal';
import DeleteModal from './DeleteModal';

const VacationItem = ({
  auth: { loading, user },
  vacationsFollowedByUser,
  addFollow,
  removeFollow,
  vacation: { id, vacationDescription, image, startingDate, endingDate, price }
}) => {
  let isFollowed;
  if (vacationsFollowedByUser.find(vacation => vacation.id === id)) {
    isFollowed = true;
  }

  return (
    <MDBCol>
      <MDBCard style={{ width: '20rem' }} className='z-depth-1 mb-4 '>
        <MDBCardImage className='img-fluid' src={image} />
        <MDBCardBody>
          <MDBCardTitle className='h5'>{vacationDescription}</MDBCardTitle>
          <MDBCardText>
            Starts on: <Moment format='DD/MM/YYYY'>{startingDate}</Moment>
          </MDBCardText>
          <MDBCardText>
            Ends on: <Moment format='DD/MM/YYYY'>{endingDate}</Moment>
          </MDBCardText>
          <MDBCardText>
            <strong>Price: {price}$</strong>
          </MDBCardText>
          <div>
            {!loading && user.isAdmin && (
              <MDBRow>
                <MDBCol size={6}>
                  <DeleteModal vacationId={id} />
                </MDBCol>
                <MDBCol size={6}>
                  <EditModal vacationId={id} />
                </MDBCol>
              </MDBRow>
            )}
            {!loading && !user.isAdmin && (
              <MDBBtn
                className={isFollowed ? 'btn btn-light-blue' : 'btn btn-cyan'}
                onClick={e => {
                  isFollowed ? removeFollow(id) : addFollow(id);
                }}
              >
                <i
                  className={
                    isFollowed ? 'fas fa-star fa-2x' : 'far fa-star fa-2x'
                  }
                />
                {isFollowed ? '  Unfollow' : '  Follow'}
              </MDBBtn>
            )}
          </div>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  );
};

VacationItem.propTypes = {
  vacation: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addFollow: PropTypes.func.isRequired,
  removeFollow: PropTypes.func.isRequired,
  vacationsFollowedByUser: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  vacationsFollowedByUser: state.vacation.vacationsFollowedByUser
});

export default connect(
  mapStateToProps,
  { addFollow, removeFollow }
)(VacationItem);
