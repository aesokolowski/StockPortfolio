import axios from 'axios';
import history from '../history';

// CONSTANTS:
const INV_SYM = 'Invalid ticker symbol';

/**
 * ACTION TYPES
 */

const BUY_STOCK = 'BUY_STOCK';

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

/**
 * THUNK CREATORS
 */
export const buy = (ticker, quantity) => async dispatch => {
  let res;

  try {
    res = await axios.get('https://sandbox.iexapis.com/stable/stock/' + ticker +
      '/quote?token=Tpk_05317838f1c446edb9717bb2d14ad2d9');
    console.log('stock bought');
    dispatch(buyStock(ticker, quantity));
  } catch (buyError) {
    buyError.response = INV_SYM;
    return dispatch(buyStock( { error: buyError }));
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
      //console.log(e);

      //  Andrew:
      //  I'm not sure if this is good Redux form, but I wanted the same action
      //  to be able to send two separate error messages: one if the ticker
      //  symbol is wrong, a different one if the user cannot afford the
      //  purchase (so far only one error implemented):
      if (e) {
        return { ...state, error: INV_SYM };
      }

      return {
        ...state,
        stocks: [
          ...state.stocks,
          {
            symbol: action.payload.symbol,
            qty: action.payload.qty
          }
        ],
        error: undefined
      };
    default:
      return state;
  }
}
