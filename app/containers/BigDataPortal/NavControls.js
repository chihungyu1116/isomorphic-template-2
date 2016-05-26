import React, { Component } from 'react';
import { connect } from 'react-redux';
import ActionableCheckbox from '../../components/ActionableCheckbox';
import { checkEnvAct, toggleTabAct, connectToEnvAct } from '../../actions/bigDataPortalAction';

class NavControls extends Component {
  connectToEnv() {
    const { envs, dispatch } = this.props;
    let selectedEnv;

    envs.forEach((env)=> {
      if(env.checked) {
        selectedEnv = env.name;
      }
    });

    if(selectedEnv) {
      dispatch(connectToEnvAct(selectedEnv));
    }
  }

  render() {
    const { envs, dispatch, tabs, sqls } = this.props;

    return (
      <div className="big-data-portal_nav-controls">
        <ul className="clearfix">
          <li>
            <a href="#" onClick={ ()=> dispatch(toggleTabAct('sql')) }>
              <i className="fa fa-database" aria-hidden="true"></i>
              Select SQL Type
            </a>
            {
              tabs['sql'] ? (
                <div className='dropdown'>
                  OMG
                </div>
              ) : null
            }
          </li>
          <li>
            <a href="#" onClick={ ()=> dispatch(toggleTabAct('env')) }>
              <i className="fa fa-server" aria-hidden="true"></i>
              Select Environment
            </a>
            {
              tabs['env'] ? (
                <div className='dropdown'>
                  <ActionableCheckbox 
                    handleSubmit={ () => this.connectToEnv() }
                    handleCheck={ (envName) => dispatch(checkEnvAct(envName)) }
                    list={ envs }
                    layout="lg"
                    actionName='Connect To Environment'
                  />
                </div>
              ) : null
            }
          </li>
          <li>
            <a href="#" onClick={ ()=> dispatch(toggleTabAct('info')) }>
              <i className="fa fa-info" aria-hidden="true"></i>
              Info
            </a>
            {
              tabs['info'] ? (
                <div className='dropdown'>
                  some info
                </div>
              ) : null
            }
          </li>
          <li>
            <a href="#" onClick={ ()=> dispatch(toggleTabAct('query')) }>
              <i className="fa fa-keyboard-o" aria-hidden="true"></i>
              Query
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { envs, tabs, sqls } = state.bigDataPortalReducer;
  return {
    envs,
    tabs,
    sqls
  };
}

export default connect(mapStateToProps)(NavControls);
