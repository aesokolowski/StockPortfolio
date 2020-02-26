import axios from 'axios';
import history from '../history';

// CONSTANTS:
const INV_SYM = 'Invalid ticker symbol';
const INV_QTY = 'Invalid quantity. Must be a postive integer.';
const GET_FUNDS_ERR = 'Internal error. Try again.';
const DEL_ERR = 'Cannot afford that much stock of that company.';

/**
 * ACTION TYPES
 */

const BUY_STOCK = 'BUY_STOCK';
const CLEAR_SUCCESS_MSG = 'CLEAR_SUCCESS_MSG';

/**
 * INITIAL STATE
 */
const stocks = [];

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

export const clearSuccessMsg = () =>
  ({ type: CLEAR_SUCCESS_MSG, payload: false });

/**
 * THUNK CREATORS
 */
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

    newFunds = Math.floor(res2.data.funds - res.data.latestPrice * 100 * qty);
    res3 = axios.put('/auth/me/funds/' + newFunds);
    dispatch(buyStock(ticker, quantity));
  } catch (buyError) {
    buyError.response = INV_SYM;
    return dispatch(buyStock({ error: buyError }));
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
      const e = action.payload.symbol.error;

      //  Andrew:
      //  I'm not sure if this is good Redux form, but I wanted the same action
      //  to be able to send two separate error messages: one if the ticker
      //  symbol is wrong, a different one if the user cannot afford the
      //  purchase (so far only one error implemented):
      if (e) {
        return { ...state, error: e.response };
      }

      const symbol = action.payload.symbol;
      const newQty = Number(action.payload.qty);
      const stocks = state.stocks;
      let oldQty = 0;
      //  this conditonal is so the following for loop is skipped if the
      //  user owns no stocks:
      let hiInd = stocks === [] ? -1 : stocks.length - 1;

      //  search to see if already own stock of this company -- if we do,
      //  break and save the index location
      for (let i = 0; i <= hiInd; i++) {
        console.log('hit for loop');
        if (stocks[i].symbol === symbol) {
          //  store old quantity
          oldQty = stocks[i].qty;
          //  swap if necessary
          if (i !== hiInd) {
            [stocks[i], stocks[hiInd]] = [stocks[hiInd], stocks[i]];
          }
          // pop
          stocks.pop();
        }
      }

      return {
        ...state,
        stocks: [
          ...state.stocks,
          {
            symbol,
            qty: oldQty + newQty
          }
        ],
        error: undefined,
        success: true
      };
    case CLEAR_SUCCESS_MSG:
      return { ...state, success: action.payload };
    default:
      return state;
  }
}
