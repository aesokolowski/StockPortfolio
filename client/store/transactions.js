import axios from 'axios';
import history from '../history';

/**
  * ACTION TYPES
  */
const UPDATE_RECORD = 'UPDATE_RECORD';
const REMOVE_RECORD = 'REMOVE_RECORD';

/**
  * INITIAL STATE
  */
const defaultTransactions = [];

/**
  * ACTION CREATORS
  */
const updateRecord = record => ({ type: UPDATE_RECORD, payload: record });
export const removeTransactions = () => ({ type: REMOVE_RECORD });

/**
  * THUNK CREATORS
  */
export const updateTransactions = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me/transactions');

    dispatch(updateRecord(res.data.transactions));
  } catch (utError) {
    console.log(utError);
  }
};

/**
  * REDUCER
  */
export default function(state = defaultTransactions, action) {

  switch (action.type) {
    case UPDATE_RECORD:
      return action.payload;
    case REMOVE_RECORD:
      return defaultTransactions;
    default:
      return state;
  }
}
