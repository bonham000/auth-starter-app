import React, { PropTypes } from 'react'
import { Link } from 'react-router'

export default class Login extends React.Component {
  static propTypes = {
    onLoginClick: PropTypes.func.isRequired,
    errorMessage: PropTypes.string
  }
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
    this.handleInput = this.handleInput.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
  }
  handleInput(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  submitLogin() {

    const username = this.state.username;
    const password = this.state.password;

    if (username !== '' && password !== '') {
      const creds = { username: username.trim(), password: password.trim() }
      // dispatch login action 
      this.props.onLoginClick(creds);
    }

  }
  render() {
    const { errorMessage } = this.props
    return (
      <div>

        <input
          type = 'text'
          name = 'username'
          className = "loginInput"
          placeholder = 'Username'
          value = {this.state.username}
          onChange = {this.handleInput} />

        <input
          type = 'password'
          name = 'password'
          className = "loginInput"
          placeholder = 'Password'
          value = {this.state.password}
          onChange = {this.handleInput} />

        <button onClick={this.submitLogin}>
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