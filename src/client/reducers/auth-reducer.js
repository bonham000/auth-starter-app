import { combineReducers } from 'redux'

import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, NEW_SIGNUP } from '../actions/login'
import { LOGOUT_SUCCESS } from '../actions/logout'

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.

const defaultState = {
  isFetching: false,
  isAuthenticated: localStorage.getItem('id_token') ? true : false
}

const auth = (state = defaultState, action) => {

  switch (action.type) {
  
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        user: action.creds
      });
  
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        errorMessage: ''
      });
  
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message
      });
   
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false
      });
  
    case NEW_SIGNUP:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        user: action.user
      });
 
    default:
      return state;

  }
}

export default auth;