import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import differenceBy from 'lodash/differenceBy';
import VacationItem from './VacationItem';
import {
  getVacations,
  getVacationsfollowedByUser
} from '../../actions/vacation';
import NewVacation from './NewVacation';

import { MDBRow } from 'mdbreact';

const Vacations = ({
  auth: { isAuthenticated, user },

  getVacations,
  getVacationsfollowedByUser,
  vacation: { vacations, vacationsFollowedByUser, loading }
}) => {
  useEffect(() => {
    getVacations();
    getVacationsfollowedByUser();
    const interval = setInterval(() => {
      getVacations();
      getVacationsfollowedByUser();
    }, 3000);
    return () => clearInterval(interval);
  }, [getVacations, getVacationsfollowedByUser]);

  const vacationsNotFollowed = differenceBy(
    vacations,
    vacationsFollowedByUser,
    'id'
  );

  return !isAuthenticated && loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className='text-center my-5'>
        <p className='h1-responsive text-center font-weight-bold  my-5'>
          Your Bucket List Vacations
        </p>
      </div>
      <MDBRow className='text-center my-5'>
        <p className='grey-text text-center w-responsive mx-auto mb-5'>
          Follow your desierd bucketlist vacations and stay up to date for price
          and dates changes.
        </p>
      </MDBRow>
      {isAuthenticated && user.isAdmin && (
        <MDBRow>
          <NewVacation />
        </MDBRow>
      )}

      <MDBRow>
        {vacationsFollowedByUser.map(vacation => (
          <VacationItem key={vacation.id} vacation={vacation} />
        ))}
        {vacationsNotFollowed.map(vacation => (
          <VacationItem key={vacation.id} vacation={vacation} />
        ))}
      </MDBRow>
    </Fragment>
  );
};

Vacations.propTypes = {
  getVacations: PropTypes.func.isRequired,
  vacation: PropTypes.object.isRequired,
  getVacationsfollowedByUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  vacation: state.vacation,
  auth: state.auth
  // isAuthenticated: state.auth.isAuthenticated,
  // user: state.auth.user
});

export default connect(
  mapStateToProps,
  { getVacations, getVacationsfollowedByUser }
)(Vacations);
