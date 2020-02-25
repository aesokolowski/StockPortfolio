import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Portfolio = props => {
  const { username, funds } = props;
  const handleSubmit = null;
  //  helper function to display cents in dollar format:
  const centsToDollarString = cents => {
    let charArr = ('$' + cents.toString()).split('');

    charArr.splice(-2, 0, '.');
    return charArr.join('');
  };

  return (
    <div>
      <h3>{username}'s Portfolio</h3>
      <h4>Funds: {centsToDollarString(funds)}</h4>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <div>
            <label htmlFor="ticker">
              Ticker
            </label>
            <input name="ticker" type="text" />
          </div>
          <div>
            <label htmlFor="quantity" type="text">
              Quantity
            </label>
            <input name="quantity" type="text" />
          </div>
          <button type="submit">BUY</button>
        </div>
      </form>
    </div>
  );
};

//  map state to props
const mapState = state => {
  return {
    username: state.user.username,
    funds: state.user.funds
  };
};

export default connect(mapState)(Portfolio);

Portfolio.propTypes = {
  username: PropTypes.string,
  funds: PropTypes.number
};
