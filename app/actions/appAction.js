import { CALL_API, CHAIN_CALLS } from 'middleware/api'

export const SHOW_NOTIFICATION_ACT = 'SHOW_NOTIFICATION_ACT';
export function showNotificationAct(alertType, alertMessage) {
  console.log('called')
  return {
    type: SHOW_NOTIFICATION_ACT,
    alertType,
    alertMessage
  }
}