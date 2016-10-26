import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { registerUser } from '../actions/login'

@connect (
	null,
	dispatch => ({
		registerUser: bindActionCreators(registerUser, dispatch)
	}),
)
class SignupPage extends React.Component {
	static propTypes = {
		registerUser: React.PropTypes.func.isRequired
	}
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			confirmPassword: '',
			email: ''
		}
		this.handleInput = this.handleInput.bind(this);
		this.submitUser = this.submitUser.bind(this);
	}
	submitUser() {

		let { username, password, confirmPassword, email } = this.state;

		if (password === confirmPassword && email !== '' && username !== '') {

			let newUser = {
				username: username,
				password: password
			}
			
			this.props.registerUser(newUser);

		}

	}
	handleInput(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}
	render() {
		return (
			<div className = 'signupForm'>
				<h1>Sign Up Here</h1>

				<input
					type = "text" 
					name = "username"
					placeholder = "Username"
					value = {this.state.username}
					onChange = {this.handleInput} />

				<input
					type = "password" 
					name = "password"
					placeholder = "Password"
					value = {this.state.password}
					onChange = {this.handleInput} />

				<input
					type = "password" 
					name = "confirmPassword"
					placeholder = "Password Confirmation"
					value = {this.state.confirmPassword}
					onChange = {this.handleInput} />

				<input
					type = "email" 
					name = "email"
					placeholder = "Email Address"
					value = {this.state.email}
					onChange = {this.handleInput} /><br />

				<button onClick = {this.submitUser}>Sign Up</button>
				<Link to = '/'>
					<h5>Return Home</h5>
				</Link>
			</div>
		);
	}
};

export default SignupPage;