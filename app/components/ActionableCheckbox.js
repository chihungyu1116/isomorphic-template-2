import React, { Component, PropTypes } from 'react';
import Checkbox from './Checkbox';

const LAYOUT_TO_CLASSNAME = {
  xs: 'col-xs-2',
  sm: 'col-xs-3',
  md: 'col-xs-4',
  lg: 'col-xs-6',
  xl: 'col-xs-12'
};

class ActionableCheckbox extends Component {
  render() {
    const { list, actionName, handleSubmit, handleCheck, layout } = this.props;
    let className = LAYOUT_TO_CLASSNAME[layout];

    if(className === undefined) {
      throw 'invalid layout value'
    }

    return (
      <div className='com-actionable_select'>
        <div className='row'>
          {
            list.map((item, index) => {
              return (
                <div className={ className } key={ index }>
                  <Checkbox
                    name={ item.name }
                    isChecked={ item.checked }
                    handleCheck={ (name) => handleCheck(name) }
                  />
                </div>
              )
            })
          }
        </div>
        <div>
          <button
            type='button'
            className='btn btn-sm btn-primary'
            onClick={ handleSubmit }
          >{ actionName }</button>
        </div>
      </div>
    )
  }
}

ActionableCheckbox.propTypes = {
  actionName: PropTypes.string.isRequired,
  layout: PropTypes.string.isRequired,
  list: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired
  })).isRequired,
  handleCheck: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,

}

export default ActionableCheckbox
