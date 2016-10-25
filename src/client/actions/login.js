import axios from 'axios'
import { browserHistory } from 'react-router'

// There are three possible states for our login process and we need actions for each of them
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

function requestLogin(creds) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  }
}

function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: user.id_token
  }
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

// Calls the API to get a token and dispatches actions along the way
export function loginUser(creds) {

  let config = {
    method: 'POST',
    headers: { 'Content-Type':'application/x-www-form-urlencoded' },
    body: `username=${creds.username}&password=${creds.password}`
  }

  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds))

    return fetch('http://localhost:3000/sessions/create', config)
      .then(response =>
        response.json().then(user => ({ user, response }))
            ).then(({ user, response }) =>  {
        if (!response.ok) {

          // If there was a problem, we want to dispatch the error condition
          dispatch(loginError(user.message))
          return Promise.reject(user)

        } else {

          // If login was successful, set the token in local storage
          localStorage.setItem('user', user)
          localStorage.setItem('id_token', user.id_token)

          // Dispatch the success action
          dispatch(receiveLogin(user))
        }
      }).catch(err => console.log("Error: ", err));

  }
}



export const NEW_SIGNUP = 'NEW_SIGNUP'

export function newSignUp(user) {
  return {
    type: NEW_SIGNUP,
    isFetching: true,
    isAuthenticated: false
  }
}

export function registerUser(user) {

  let config = {
    method: 'POST',
    headers: { 'Content-Type':'application/x-www-form-urlencoded' },
    body: `username=${user.username}&password=${user.password}`
  }

  return dispatch => {

    // New signup action is dispatched
    dispatch(newSignUp(user))

    // Request is made to the server with the registration data
    return axios.post('http://localhost:3000/register', user).then( (res) => {

      let user = {
        user: res.data.username,
        id_token: res.data.id_token
      }

      // Successful server response data is saved to local storage      
      localStorage.setItem('user', user.user);
      localStorage.setItem('id_token', user.id_token);

      // Login success action is dispatched
      dispatch(receiveLogin(user));

    }).then( () => {
      // User is redirected to the home page
      browserHistory.push('/');
    }).catch( (err) => { console.log('Error:', err) });

  }
}