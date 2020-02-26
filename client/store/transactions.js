import axios from 'axios';
import history from '../history';

/**
  * ACTION TYPES
  */
const ADD_RECORD = 'ADD_RECORD';

/**
  * INITIAL STATE
  */
const defaultTransactions = [];

/**
  * ACTION CREATORS
  */
export const addRecord = (symbol, companyName, quantity, boughtAt, userId) =>
  ({
    type: ADD_RECORD,
    payload: {
      symbol,
      companyName,
      quantity,
      boughtAt,
      userId
    }
  });

/**
  * REDUCER
  */
export default function(state = defaultTransactions, action) {
  const p = action.payload;

  switch (action.type) {
    case ADD_RECORD:
      return [...state, {
        symbol: p.symbol,
        companyName: p.companyName,
        quantity: p.quantity,
        boughtAt: p.boughtAt,
        userId: p.userId
      }];
    default:
      return state;
  }
}
