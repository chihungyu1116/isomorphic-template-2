import * as ActionType from 'actions/appAction';
import _ from 'lodash'

let defaultState = {
  user: {},
  token: {},
  alertType: null,
  alertMessage: null
};

export default function(state = defaultState, action) {
  let cloned;

  console.log('oh reducer', action)
  switch(action.type) {
    case ActionType.SHOW_NOTIFICATION_ACT:
      cloned = _.cloneDeep(state)
      cloned.alertType = action.alertType,
      cloned.alertMessage = action.alertMessage
      return cloned;
    default:
      return state
  }
}
