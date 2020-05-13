import axios from 'axios';
import history from '../history';

// CONSTANTS:
const I_T = process.env.IEX_TOK;

const INV_SYM = 'Invalid ticker symbol';
const INV_QTY = 'Invalid quantity. Must be a postive integer.';
const GET_FUNDS_ERR = 'Internal error. Try again.';
const DEL_ERR = 'Cannot afford that much stock of that company.';
const UPDATE_TRANS_ERR = 'Unable to load transaction record to database.';

/**
 * ACTION TYPES
 */

const BUY_STOCK = 'BUY_STOCK';
const CLEAR_SUCCESS_MSG = 'CLEAR_SUCCESS_MSG';
const REMOVE_PORTFOLIO = 'REMOVE_PORTFOLIO';
const LOAD_PORTFOLIO = 'LOAD_PORTFOLIO';

/**
 * INITIAL STATE
 */
const stocks = [];
const reset = [];

/**
 * ACTION CREATORS
 */
const buyStock = (symbol, qty) =>
  ({
    type: BUY_STOCK,
    payload: {
      symbol,
      qty
    }
  });

const loadPortfolio = data => ({ type: LOAD_PORTFOLIO, payload: data });

export const removePortfolio = () => ({ type: REMOVE_PORTFOLIO });

export const clearSuccessMsg = () =>
  ({ type: CLEAR_SUCCESS_MSG, payload: false });

/**
 * THUNK CREATORS
 */
export const updatePortfolio = () => async dispatch => {
  try {
    const res = await axios.get('auth/me/portfolio');

    console.log('updatePortfolio::res.data:', res.data);

    //  reduce portfolio to remove duplicates:
    const dupsRem = res.data.portfolios.reduce((acc, portfolio) => {
      let symbol = portfolio.symbol;
      let found = false;

      for (let prev of acc) {
        if (prev.symbol === symbol) {
          prev.quantity += portfolio.quantity;
          found = true;
          break;
        }
      }

      if (!found) {
        acc.push({ symbol: portfolio.symbol, quantity: portfolio.quantity });
      }

      return acc;
    }, []);

    console.log(dupsRem);
    dispatch(loadPortfolio(dupsRem));
  } catch (err) {
    console.log(err);
  }
};

export const buy = (ticker, quantity) => async dispatch => {
  let res;   // response from IEX API get request
  let res2;  // response from own API get request
  let res3;  // response from own API post request
  let qty = Number(quantity);
  let newFunds;

  //  get funds directly from the backend... does this cause an infinite loop
  //  if it errors? Should the dispatch be removed? Hasn't errored yet...
  try {
    res2 = await axios.get('/auth/me/funds');
  } catch (getFundsError) {
    getFundsError.response = GET_FUNDS_ERR;
    console.log('Error: get funds error.');
    return dispatch(buyStock({ error: getFundsError }));
  }

  //  dispatch an error with appropriate message if quantity box input is
  //  invalid i.e. has non-numeric characters or has a decimal point
  if (!qty || qty !== Math.floor(qty)) {
    const qtyError = new Error();

    qtyError.response = INV_QTY;
    return dispatch(buyStock({ error: qtyError }));
  }

  try {
    //  data request from the IEX API:
    res = await axios.get('https://sandbox.iexapis.com/stable/stock/' + ticker +
      '/quote?token=Tpk_05317838f1c446edb9717bb2d14ad2d9');

    console.log('res:', res);
    console.log('res2.data', res2.data);
    //  if user cannot afford that quantity of particular stock, dispatch
    //  an error message to the screen
    if (res2.data.funds < res.data.latestPrice * 100 * qty) {
      const deltaError = new Error();

      deltaError.response = DEL_ERR;
      return dispatch(buyStock({ error: deltaError }));
    }

    //  update funds on the database: updating funds on the front-end should
    //  be triggered when the portfolio component reloads
    newFunds = Math.floor(res2.data.funds - res.data.latestPrice * 100 * qty);
    try {
      res3 = axios.put('/auth/me/funds/', { newFunds });
    } catch (updateError) {
      updateError.response = GET_FUNDS_ERR;
      return dispatch(buyStock({ error: updateError }));
    }


    //  this dispatch either creates a new entry or updates an existing one
    dispatch(buyStock(ticker, quantity));
  } catch (buyError) {
    buyError.response = INV_SYM;
    return dispatch(buyStock({ error: buyError }));
  }

  //  record this transaction in the database: for the store, I'm going to have
  //  to follow the lead of the GET_FUNDS dispatch, I believe
  try {
    let companyName = res.data.companyName;
    let boughtAt = Math.floor(res.data.latestPrice * 100);
    let userId;
    //  get userId:
    try {
      userId = await axios.get('/auth/me/uid');
    } catch (userIdError) {
      userIdError.response = GET_FUNDS_ERR; // generic response
      return dispatch(buyStock({ error: buyError }));
    }

    const res4 = await axios.post('/api/transactions/' + userId.data, {
      symbol: ticker,
      companyName,
      quantity,
      boughtAt
    });

    console.log('res4:', res4);

    const res5 = await axios.post('/api/portfolio/' + userId.data, {
      symbol: ticker,
      quantity
    });

    console.log('res5:', res5);
  } catch (updateError) {
    updateError.response = UPDATE_TRANS_ERR;
    return dispatch(buyStock({ error: updateError }));
  }

  try {
    history.push('/portfolio');
  } catch (dispatchOrHistoryErr) {
    console.log(error.dispatchOrHistoryErr);
  }
};

/**
 * REDUCER
 */
export default function(state = { stocks }, action) {
  switch (action.type) {
    case BUY_STOCK:
      console.log('In BUY_STOCK');
      console.log('state:', state);
      console.log('state.stocks:', state.stocks);
      console.log('actions:', action);

      const e = action.payload.symbol.error;

      //  Andrew:
      //  I'm not sure if this is good Redux form, but I wanted the same action
      //  to be able to send two separate error messages: one if the ticker
      //  symbol is wrong, a different one if the user cannot afford the
      //  purchase (this has gotten expanded since):
      if (e) {
        return { ...state, error: e.response };
      }

      return {
        ...state,
        error: undefined,
        success: true
      };
    case CLEAR_SUCCESS_MSG:
      return { ...state, success: action.payload };
    case REMOVE_PORTFOLIO:
      return { stocks: reset };
    case LOAD_PORTFOLIO:
      return { stocks: action.payload };
    default:
      return state;
  }
}
