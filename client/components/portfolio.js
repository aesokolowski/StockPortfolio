import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { centsToDollarString } from '../code';
import {
  buy,
  clearSuccessFlag,
  clearSuccessMsg,
  setFunds,
  setUpdate,
  stopUpdate,
  updateTransactions,
  updatePortfolio
} from '../store';

const SUC_MSG = 'Purchase successful.';

const Portfolio = props => {
  const {
    username, funds, portfolio, needsUpdate, //  state
    handleSubmit, handleChange,              //  events dispatch
    updateFunds, updateTransactions,         //  conditional reload dispatch
    updateStocks, updateStart, updateStop,
    clearSuccess
  } = props;

  useEffect(() => {
    let success = portfolio.success || null;

    if (success) {
      updateStart();
    }
    if (needsUpdate) {
      if (!success) {
        updateStocks();  // leave out updateStocks() if you just bought a stock
                         // since it should already be proper in the store
      }

      updateFunds();
      updateTransactions();
      clearSuccess();
      updateStop();
    }
  });

  return (
    <div>
      <h3 className="user-indicator">{username}'s Portfolio</h3>
      <h4 className="funds-indicator">Funds: {centsToDollarString(funds)}</h4>
      <form onSubmit={handleSubmit} name={name}>
        <div id="portfolio-form">
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
          <button id="buy-button" type="submit">Buy</button>
        </div>
      </form>
      <div>
        {portfolio.error ? <div>{portfolio.error}</div> : null}
        {portfolio.successMsg ? <div>{SUC_MSG}</div> : null}
      </div>
      <br />
      <br />
      <div>
        {
          portfolio.stocks.map((stock, idx) => (
            <div key={idx}>
              Symbol: {stock.symbol}
              <br />
              Quantity: {stock.quantity}
              <br />
              <br />
            </div>
          ))
        }
      </div>
    </div>
  );
};

//  map state to props
const mapState = state => {
  console.log(state);

  return {
    username: state.user.username,
    funds: state.user.funds,
    portfolio: state.portfolio,
    needsUpdate: state.user.needsUpdate
  };
};

//  map dispatch to props
const mapDispatch = dispatch => {
  return {
    clearSuccess: function() {
      dispatch(clearSuccessFlag());
    },
    handleChange: function(e) {
      e.preventDefault();
      dispatch(clearSuccessMsg());
    },                             // future: controlled component
    handleSubmit: function(e) {
      e.preventDefault();
      const t = e.target;
      const ticker = t.ticker.value;
      const quantity = t.quantity.value;

      dispatch(buy(ticker, quantity));
    },
    updateFunds: function() {
      dispatch(setFunds());
    },
    updateTransactions: function() {
      dispatch(updateTransactions());
    },
    updateStocks: function() {
      dispatch(updatePortfolio());
    },
    updateStart: function() {
      dispatch(setUpdate());
    },
    updateStop: function() {
      dispatch(stopUpdate());
    }
  };
};

export default connect(mapState, mapDispatch)(Portfolio);

Portfolio.propTypes = {
  username: PropTypes.string.isRequired,
  funds: PropTypes.number.isRequired,
  error: PropTypes.string,
  needsUpdate: PropTypes.bool,
  portfolio: PropTypes.object.isRequired,
  clearSuccess: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  updateFunds: PropTypes.func.isRequired,
  updateTransactions: PropTypes.func.isRequired,
  updateStocks: PropTypes.func.isRequired,
  updateStart: PropTypes.func.isRequired,
  updateStop: PropTypes.func.isRequired
};
