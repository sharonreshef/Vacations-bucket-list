import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import VacationItem from './VacationItem';
import { getVacations } from '../../actions/vacation';

const Vacations = ({ getVacations, vacation: { vacations, loading } }) => {
  useEffect(() => {
    getVacations();
  }, [getVacations]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Vacations</h1>
      <p className='lead'>View all vacations</p>
      <div className='vacations'>
        {vacations.map(vacation => (
          <VacationItem key={vacation.id} vacation={vacation} />
        ))}
      </div>
    </Fragment>
  );
};

Vacations.propTypes = {
  getVacations: PropTypes.func.isRequired,
  vacation: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  vacation: state.vacation
});

export default connect(
  mapStateToProps,
  { getVacations }
)(Vacations);
