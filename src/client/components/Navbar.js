import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'
import Authenticate from './Authenticate'
import Logout from './Logout'
import { loginUser, logoutUser } from '../actions/authActions'

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.navigateCounter = this.navigateCounter.bind(this);
  }
  navigateCounter() {

    if (this.props.isAuthenticated) {
      browserHistory.push('/counter');
    }
  }

  render() {
    const { dispatch, isAuthenticated, errorMessage } = this.props

    return (
        <div className = "navigationWrapper">
          <div className = "linksWrapper">

            { !isAuthenticated &&
              <Authenticate
                errorMessage={errorMessage}
                onLoginClick={ creds => dispatch(loginUser(creds)) }
              /> }      

            { isAuthenticated &&
              <Logout onLogoutClick={() => dispatch(logoutUser())} /> }

            { isAuthenticated &&
              <div onClick = {this.navigateCounter}>
                <h4>Link to the Counter Page</h4>
              </div> }

          </div>
        </div>
    )
  }

}

Navbar.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string
}

export default Navbar;