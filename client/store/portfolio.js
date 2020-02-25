import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */

const BUY_STOCK = 'BUY_STOCK';

/**
 * INITIAL STATE
 */
const portfolio = [];

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
    buyError.response = 'Invalid ticker symbol.';
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
export default function(state = { portfolio }, action) {
  switch (action.type) {
    case BUY_STOCK:
      const e = action.payload.symbol.error.response;

      //  Andrew:
      //  I'm not sure if this is good Redux form, but I wanted the same action
      //  to be able to send two separate error messages: one if the ticker
      //  symbol is wrong, a different one if the user cannot afford the
      //  purchase (so far only one error implemented):
      if (e) {
        return { ...state, error: e };
      }

      return {
        ...state,
        portfolio: [
          ...state.portfolio,
          {
            symbol: action.ticker,
            qty: action.qty
          }
        ]
      };
    default:
      return state;
  }
}
