import axios from 'axios';
import history from '../history';

/**
  * ACTION TYPES
  */
const UPDATE_RECORD = 'UPDATE_RECORD';

/**
  * INITIAL STATE
  */
const defaultTransactions = [];

/**
  * ACTION CREATORS
  */
const updateRecord = record => ({ type: UPDATE_RECORD, payload: record });

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
    default:
      return state;
  }
}
