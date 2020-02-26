import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { buy, clearSuccessMsg, setFunds } from '../store';

const SUC_MSG = 'Purchase successful.';

const Portfolio = props => {
  const {
    username, funds, portfolio,             //  state
    handleSubmit, handleChange, updateFunds //  dispatch
  } = props;
  //  helper function to display cents in dollar format:
  const centsToDollarString = cents => {
    let charArr = ('$' + cents.toString()).split('');

    charArr.splice(-2, 0, '.');
    return charArr.join('');
  };

  if (portfolio.success) {
    updateFunds();
  }

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
            <input name="ticker" type="text" onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="quantity" type="text">
              Quantity
            </label>
            <input name="quantity" type="text" onChange={handleChange} />
          </div>
          <button type="submit">BUY</button>
        </div>
        <div>
          {portfolio.error ? <div>{portfolio.error}</div> : null}
          {portfolio.success ? <div>{SUC_MSG}</div> : null}
        </div>
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
    },
    handleChange: function(e) {
      e.preventDefault();

      dispatch(clearSuccessMsg());
    },
    updateFunds: function() {
      dispatch(setFunds());
    }
  };
};

export default connect(mapState, mapDispatch)(Portfolio);

Portfolio.propTypes = {
  username: PropTypes.string,
  funds: PropTypes.number,
  error: PropTypes.string,
  portfolio: PropTypes.object,
};
