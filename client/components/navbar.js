import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../store';

const Navbar = ({ handleClick, isLoggedIn }) => {

  return (
    <div className="navbar">
      <h1 className="titletext">ANDY'S EZ STOCKS</h1>
      <nav>
        {isLoggedIn ? (
          <div className="menubuttons">
            {/* The navbar will show these links after you log in */}
            <NavLink
              className="button"
              activeClassName="active"
              to="/portfolio"
            >
              Portfolio
            </NavLink>
            <NavLink className="button" to="/transactions">Transactions</NavLink>
            <a className="button" href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        ) : (
          <div className="menubuttons">
            {/* The navbar will show these links before you log in */}
            <NavLink
              className="button"
              activeClassName="active"
              to="/login"
            >
              Login
            </NavLink>
            <NavLink
              className="button"
              to="/register"
            >
              Register
            </NavLink>
          </div>
        )}
      </nav>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  };
};

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout());
    }
  };
};

export default connect(mapState, mapDispatch)(Navbar);

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
