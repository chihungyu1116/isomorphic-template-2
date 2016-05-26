import React, { Component, PropTypes } from 'react';

const ALERT_TYPE_TO_CLASSNAME = {
  'success': 'alert alert-success',
  'info': 'alert alert-info',
  'warning': 'alert alert-warning',
  'danger': 'alert alert-danger'
}

class Alert extends Component {
  render() {
    const { type, message, action } = this.props;
    const className = ALERT_TYPE_TO_CLASSNAME[type];

    if(className === undefined) {
      throw 'invalid alert type';
    }

    typeof action === 'function' && action();

    return (
      <div className={ className } role="alert">
        { message }
      </div>
    )
  }
}

Alert.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  action: PropTypes.func
}

export default Alert
