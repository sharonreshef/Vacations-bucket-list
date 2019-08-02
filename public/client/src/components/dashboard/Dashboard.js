import React from 'react';
import Chart from './Chart';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';

const Dashboard = ({ loading }) => {
  return loading ? <Spinner /> : <Chart />;
};

Dashboard.propTypes = {
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  loading: state.auth.loading
});

export default connect(mapStateToProps)(Dashboard);
