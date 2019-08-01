import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

// style
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink
} from 'mdbreact';

const Navbar = ({ auth: { isAuthenticated, loading, user }, logout }) => {
  const authLinks = (
    <MDBNavbarNav right>
      <MDBNavItem>
        <MDBNavLink to='/vacations'>Vacations</MDBNavLink>
      </MDBNavItem>
      <MDBNavItem>
        <MDBNavLink onClick={logout} to='/' href='#!'>
          <i className='fas fa-sign-out-alt' />
          {'  '}
          <span className='hide-sm'>Logout</span>
        </MDBNavLink>
      </MDBNavItem>
    </MDBNavbarNav>
  );

  const adminLinks = (
    <MDBNavbarNav right>
      <MDBNavItem>
        <MDBNavLink to='/admin'>Admin</MDBNavLink>
      </MDBNavItem>
      <MDBNavItem>
        <MDBNavLink to='/vacations'>Vacations</MDBNavLink>
      </MDBNavItem>
      <MDBNavItem>
        <MDBNavLink onClick={logout} to='/' href='#!'>
          <i className='fas fa-sign-out-alt' />
          {'  '}
          <span className='hide-sm'>Logout</span>
        </MDBNavLink>
      </MDBNavItem>
    </MDBNavbarNav>
  );

  const guestLinks = (
    <MDBNavbarNav right>
      <MDBNavItem>
        <MDBNavLink to='/register'>Register</MDBNavLink>
      </MDBNavItem>
      <MDBNavItem>
        <MDBNavLink to='/login'>Login</MDBNavLink>
      </MDBNavItem>
    </MDBNavbarNav>
  );

  return (
    <MDBNavbar color='info-color' expand='md' className='navbar'>
      <MDBNavbarBrand>
        <MDBNavLink to='/'>
          {' '}
          <i className='fas fa-globe-americas' />
          {'  '}
          <strong className='white-text h3'>My vacations bucket list</strong>
        </MDBNavLink>
      </MDBNavbarBrand>
      {!loading && isAuthenticated && (
        <MDBNavbarNav right>
          <MDBNavItem className='user-name'>
            Welcome {user.firstName}
          </MDBNavItem>
        </MDBNavbarNav>
      )}
      {!loading && (
        <Fragment>
          {isAuthenticated && user.isAdmin
            ? adminLinks
            : isAuthenticated
            ? authLinks
            : guestLinks}
        </Fragment>
      )}
    </MDBNavbar>
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
