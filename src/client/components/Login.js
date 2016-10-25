import React, { PropTypes } from 'react'
import { Link } from 'react-router'

export default class Login extends React.Component {
  static propTypes = {
    onLoginClick: PropTypes.func.isRequired,
    errorMessage: PropTypes.string
  }
  handleClick(event) {
    const username = this.refs.username
    const password = this.refs.password
    const creds = { username: username.value.trim(), password: password.value.trim() }
    this.props.onLoginClick(creds)
  }
  render() {
    const { errorMessage } = this.props
    return (
      <div>

        <input
          type = 'text'
          name = 'username'
          className = "loginInput"
          placeholder = 'Username'/>

        <input
          type = 'password'
          name = 'password'
          className = "loginInput"
          placeholder = 'Password'/>

        <button onClick={(event) => this.handleClick(event)}>
          Login
        </button>

        <Link to = 'signup'>
          <button>Sign Up</button>
        </Link>

        { errorMessage && <p>{errorMessage}</p> }

      </div>
    );
  }
};