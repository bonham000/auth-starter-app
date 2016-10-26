import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

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

            <Link to = '/'>
              <h2>React Redux App</h2>
            </Link>

            { !isAuthenticated &&
              <button>
                <Link to = 'login'>Login</Link>
              </button> }

            { !isAuthenticated &&
              <button>
                <Link to = 'signup'>Sign Up</Link>
              </button> }

            { isAuthenticated &&
              <button>
                <Link to = 'counter'>Counter</Link>
              </button> }

            { isAuthenticated &&
              <button onClick={ () => dispatch(logoutUser()) }>
                Logout
              </button> }

          </div>
        </div>
    )
  }
}

export default Navbar;