import React, { Component, PropTypes } from 'react';

class Checkbox extends Component {
  render() {
    const { name, isChecked, handleCheck } = this.props;
    const className = isChecked ? 'fa fa-check-square-o' : 'fa fa-square-o';
    return (
      <div className='com-checkbox'>
        <i className={ className } aria-hidden="true" onClick={ () => handleCheck(name) }></i>
        <label>{ name }</label>
      </div>
    )

  }
}

Checkbox.propTypes = {
  isChecked: PropTypes.bool,
  handleCheck: PropTypes.func.isRequired
}

export default Checkbox
