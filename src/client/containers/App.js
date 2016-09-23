import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as countingActions from '../actions/counting';
import Nav from '../components/Nav/Nav';
import './App.scss';

class App extends React.Component {
  render() {
    return (
      <div className='content'>
        <Nav />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
};

export default connect(
  state => ({
    counting: state.counting,
  }),
  dispatch => ({
    actions: bindActionCreators(countingActions, dispatch),
  }),
)(App);
