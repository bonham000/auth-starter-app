import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as countingActions from '../../actions/counting';

@connect(
  state => ({
    counting: state.counting,
  }),
  dispatch => ({
    actions: bindActionCreators(countingActions, dispatch),
  }),
)
class Counter extends React.Component {
  static propTypes = {
    counting: PropTypes.number.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    const { countInc, countDec } = this.props.actions;

    return (
      <div>
        <h1>Main app</h1>
        <h3>{this.props.counting}</h3>
        <button onClick={countInc}>+</button>
        <button onClick={countDec}>-</button>
      </div>
    );
  }
}

export default Counter;
