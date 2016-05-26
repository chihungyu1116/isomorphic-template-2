import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import MainHeader from './MainHeader';
import Alert from '../components/Alert';

class App extends Component {
  render() {
    const { alertType, alertMessage } = this.props;

    return (
      <div className='app'>
        <MainHeader />
        { this.props.children }
        <div className='app-alert'>
          {
            alertType && alertMessage ? (
              <Alert
                type={ alertType }
                message={ alertMessage }
              />
            ) : null
          }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { alertType, alertMessage } = state.appReducer;

  return {
    alertType,
    alertMessage
  };
}

export default connect(mapStateToProps)(App);
