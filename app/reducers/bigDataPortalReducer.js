import * as ActionType from 'actions/bigDataPortalAction';
import _ from 'lodash'

let defaultState = {
  envs: [
    { checked: false, name: 'Dev' },
    { checked: false, name: 'Prod' },
    { checked: false, name: 'Stage'},
    { checked: false, name: 'Test' },
  ],
  tabs: { env: false, sql: false, info: false, query: false },
  sqls: []
};

function toggleTab(tabs, tabName, forceOpen = false) {
  _.forEach(tabs, (value, key) => {
    if(key === tabName) {
      if(forceOpen) {
        tabs[key] = true;  
      } else {
        tabs[key] = !tabs[key];  
      }
    } else {
      tabs[key] = false;
    }
  });

  return tabs
}

export default function(state = defaultState, action) {
  let cloned;

  switch(action.type) {
    case ActionType.CHECK_ENV_ACT:
      cloned = _.cloneDeep(state);
      cloned.envs.forEach((env)=> {
        if(env.name === action.envName) {
          env.checked = !env.checked;
        } else {
          env.checked = false;
        }
      });
      return cloned;
    case ActionType.TOGGLE_TAB_ACT:
      cloned = _.cloneDeep(state);
      cloned.tabs = toggleTab(cloned.tabs, action.tabName);
      return cloned;
    case ActionType.CONNECT_TO_ENV_ACT:
      cloned = _.cloneDeep(state);
      cloned.sqls = action.response
      return cloned;
    default:
      return state
  }
}
