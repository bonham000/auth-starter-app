import React from 'react';
import { Link } from 'react-router'

class SignUp extends React.Component {
	render() {
		return (
			<div>
				<button>
					<Link to = 'signup'>Sign Up</Link>
				</button>
			</div>
		);
	}
}

export default SignUp;