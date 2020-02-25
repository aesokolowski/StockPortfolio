import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { buy } from '../store';

const Portfolio = props => {
  const { username, funds, handleSubmit, portfolio } = props;
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
        {portfolio.error ? <div>{portfolio.error}</div> : null}
      </form>
    </div>
  );
};

//  map state to props
const mapState = state => {
  console.log(state);

  return {
    username: state.user.username,
    funds: state.user.funds,
    portfolio: state.portfolio
  };
};

//  map dispatch to props
const mapDispatch = dispatch => {
  return {
    handleSubmit: function(e) {
      e.preventDefault();
      const t = e.target;
      const ticker = t.ticker.value;
      const quantity = t.quantity.value;

      dispatch(buy(ticker, quantity));
    }
  };
};

export default connect(mapState, mapDispatch)(Portfolio);

Portfolio.propTypes = {
  username: PropTypes.string,
  funds: PropTypes.number,
  error: PropTypes.string
};
