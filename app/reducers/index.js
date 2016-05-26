import { combineReducers } from 'redux';
import appReducer from 'reducers/appReducer';
import bigDataPortalReducer from 'reducers/bigDataPortalReducer';

const rootReducer = combineReducers({
  appReducer,
  bigDataPortalReducer
});

export default rootReducer;
