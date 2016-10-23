import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as authActions from '../actions/authActions'

@connect (
	state => ({
		
	}),
	dispatch => ({
		registerActions: bindActionCreators(authActions, dispatch)
	}),
)
class SignupPage extends React.Component {
	static propTypes = {
		registerActions: React.PropTypes.object.isRequired
	}
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			confirmPassword: ''
		}
		this.handleInput = this.handleInput.bind(this);
		this.submitUser = this.submitUser.bind(this);
	}
	submitUser() {
		let newUser = {
			username: this.state.username,
			password: this.state.password
		}
		this.props.registerActions.registerUser(newUser);
	}
	handleInput(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}
	render() {
		return (
			<div>
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

				<button onClick = {this.submitUser}>Sign Up</button>
				<Link to = '/'>
					<h5>Return Home</h5>
				</Link>
			</div>
		);
	}
};

export default SignupPage;