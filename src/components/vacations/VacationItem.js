import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { stat } from 'fs';

const VacationItem = ({
  auth,
  vacation: {
    id,
    vacationDescription,
    image,
    startingDate,
    endingDate,
    price,
    followers
  }
}) => {
  return (
    <Fragment>
      <div className='vacation-card'>
        <h3>{vacationDescription}</h3>
        <img src={image} />
        <p>Starts on: {startingDate}</p>
        <p>Ends on: {endingDate}</p>
        <p>Price: {price}</p>
      </div>
    </Fragment>
  );
};

VacationItem.propTypes = {
  vacation: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(VacationItem);
