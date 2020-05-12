import axios from 'axios';
import history from '../history';
import { removePortfolio, removeTransactions } from '../store';

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';
const NEW_FUNDS = 'NEW_FUNDS';
const SET_UPDATE = 'SET_UPDATE';
const STOP_UPDATE = 'STOP_UPDATE';

/**
 * INITIAL STATE
 */
const defaultUser = {};

/**
 * ACTION CREATORS
 */
const getUser = user => ({ type: GET_USER, user });
const removeUser = () => ({ type: REMOVE_USER });
const newFunds = funds => ({ type: NEW_FUNDS, funds });
export const setUpdate = () => ({ type: SET_UPDATE });
export const stopUpdate = () => ({ type: STOP_UPDATE });

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me');
    dispatch(getUser(res.data || defaultUser));
  } catch (err) {
    console.error(err);
  }
};

//  Andrew: I split the boilerplate's auth dispatch function into two, since I
//  need a different set of parameters for each, so now we have signup and login
export const signup = (username, email, password, method) => async dispatch => {
  let res;

  try {
    //  Andrew: for the life of me I can't figure out how I'm getting every-
    //  thing from the backend user model EXCEPT the password and salt --
    //  which is desirable behavior, I just can't seem to trace it:
    //  maybe it has something to do with passport?
    res = await axios.post('/auth/signup', { username, email, password });
  } catch (authError) {
    return dispatch(getUser({ error: authError }));
  }

  try {
    dispatch(getUser(res.data));
    history.push('/portfolio');
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr);
  }
};

export const login = (email, password, method) => async dispatch => {
  let res;

  try {
    res = await axios.post('/auth/login', { email, password });
  }  catch (authError) {
    return dispatch(getUser({ error: authError }));
  }

  try {
    dispatch(getUser(res.data));
    history.push('/portfolio');
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr);
  }
};

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout');
    dispatch(removeUser());
    dispatch(removePortfolio());
    dispatch(removeTransactions());
    history.push('/login');
  } catch (err) {
    console.error(err);
  }
};

export const setFunds = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me/funds');

    dispatch(newFunds(res.data.funds));
  } catch (err) {
    console.log(err);
  }
};

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return { ...action.user, needsUpdate: true };
    case REMOVE_USER:
      return defaultUser;
    case NEW_FUNDS:
      return { ...state, funds: action.funds };
    case SET_UPDATE:
      return { ...state, needsUpdate: true };
    case STOP_UPDATE:
      return { ...state, needsUpdate: false };
    default:
      return state;
  }
}
