import { CALL_API, CHAIN_CALLS } from 'middleware/api'
import { showNotificationAct } from './appAction';

export const CHECK_ENV_ACT = 'CHECK_ENV_ACT';
export function checkEnvAct(envName) {
  return {
    type: CHECK_ENV_ACT,
    envName: envName
  }
}

export const TOGGLE_TAB_ACT = 'TOGGLE_TAB_ACT';
export function toggleTabAct(tabName) {
  return {
    type: TOGGLE_TAB_ACT,
    tabName
  }
}

export const CONNECT_TO_ENV_ACT = 'CONNECT_TO_ENV_ACT';
export function connectToEnvAct(selectedEnv) {
  return {
    [CALL_API]: {
      method: 'get',
      path: `/api/connect_to_env?env=${selectedEnv}`,
      afterSuccessFunc: (res)=> {
        res.dispatch(toggleTabAct('sql'));
        res.dispatch(showNotificationAct('success', 'yes'));
      }
    }
  }
}