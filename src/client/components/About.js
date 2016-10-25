import React from 'react'
import { connect } from 'react-redux'
import { browserHistory, Link } from 'react-router'

@connect(
	state => ({
		isAuthenticated: state.auth.isAuthenticated
	})
)
class About extends React.Component {
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
 		return (
		  <div>
		    <h3>This is a React/Redux Single Page Application with User Authentication</h3>

				{ this.props.isAuthenticated && <div>
					<p>Welcome {localStorage.getItem('user')}</p>
					</div> }


		    { this.props.isAuthenticated &&
        <div onClick = {this.navigateCounter}>
          <h4>Link to the Counter Page</h4>
        </div> }

		  </div>
	  );
 	}
}
export default About;
