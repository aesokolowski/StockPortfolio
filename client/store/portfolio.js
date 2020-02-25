import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */

const BUY_STOCK = 'BUY_STOCK';

/**
 * INITIAL STATE
 */
const defaultPortfolio = [];

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

/**
 * THUNK CREATORS
 */
export const buy = (ticker, quantity) => async dispatch => {
  let res;

  try {
    res = await axios.get('https://sandbox.iexapis.com/stable/stock/' + ticker +
      '/quote?token=Tpk_05317838f1c446edb9717bb2d14ad2d9');
    // test:
    console.log(res.data.companyName);
  } catch (buyError) {
    console.log(buyError);
  }
};

/**
 * REDUCER
 */
export default function(state = defaultPortfolio, action) {
  switch (action.type) {
    case BUY_STOCK:
      return [...state, {symbol: action.ticker, qty: action.qty}];
    default:
      return state;
  }
}
