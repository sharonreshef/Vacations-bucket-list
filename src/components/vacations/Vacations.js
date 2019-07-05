import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import differenceBy from 'lodash.differenceby';
import VacationItem from './VacationItem';
import {
  getVacations,
  getVacationsfollowedByUser
} from '../../actions/vacation';

import { MDBRow } from 'mdbreact';

const Vacations = ({
  isAuthenticated,
  getVacations,
  getVacationsfollowedByUser,
  vacation: { vacations, vacationsFollowedByUser, loading }
}) => {
  useEffect(() => {
    getVacations();
    getVacationsfollowedByUser();
  }, [getVacations, getVacationsfollowedByUser]);

  const vacationsNotFollowed = differenceBy(
    vacations,
    vacationsFollowedByUser,
    'id'
  );

  return !isAuthenticated ? (
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
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { getVacations, getVacationsfollowedByUser }
)(Vacations);
