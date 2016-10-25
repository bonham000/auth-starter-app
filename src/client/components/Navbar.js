import React, { Component, PropTypes } from 'react'
import Login from './Login'
import Logout from './Logout'

import { loginUser } from '../actions/login'
import { logoutUser } from '../actions/logout'


class Navbar extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string
  }
  render() {
    const { dispatch, isAuthenticated, errorMessage } = this.props
    return (
        <div className = "navigationWrapper">
          <div className = "linksWrapper">
            { !isAuthenticated &&
              <Login
                errorMessage={errorMessage}
                onLoginClick={ creds => dispatch(loginUser(creds)) }
              /> }      

            { isAuthenticated &&
              <Logout onLogoutClick={() => dispatch(logoutUser())} /> }
          </div>
        </div>
    )
  }
}

export default Navbar;