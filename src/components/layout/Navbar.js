import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading, user }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to='/vacations'>Vacations</Link>
      </li>
      <li>
        <a onClick={logout} href='#!'>
          <i className='fas fa-sign-out-alt' />
          {'  '}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </ul>
  );

  const adminLinks = (
    <ul>
      <li>
        <Link to='/admin'>Admin</Link>
      </li>
      <li>
        <Link to='/vacations'>Vacations</Link>
      </li>
      <li>
        <a onClick={logout} href='#!'>
          <i className='fas fa-sign-out-alt' />
          {'  '}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </ul>
  );

  return (
    <div>
      <nav className='navbar bg-dark'>
        <h1>
          <Link to='/'>
            <i className='fas fa-globe-americas' /> My Vacations Bucket List
          </Link>
        </h1>
        {!loading && (
          <Fragment>
            {isAuthenticated && user.isAdmin
              ? adminLinks
              : isAuthenticated
              ? authLinks
              : guestLinks}
          </Fragment>
        )}
      </nav>
    </div>
  );
};

Navbar.protoTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(Navbar);
