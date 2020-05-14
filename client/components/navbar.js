import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div className="navbar">
    <h1 className="titletext">ANDY'S EZ STOCKS</h1>
    <nav>
      {isLoggedIn ? (
        <div className="menubuttons">
          {/* The navbar will show these links after you log in */}
          <Link className="button" to="/portfolio">Portfolio</Link>
          <Link className="button" to="/transactions">Transactions</Link>
          <a className="button" href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div className="menubuttons">
          {/* The navbar will show these links before you log in */}
          <Link className="button" to="/login">Login</Link>
          <Link className="button" to="/register">Register</Link>
        </div>
      )}
    </nav>
  </div>
);

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
