import superAgent from 'superagent';
import Promise, { using } from 'bluebird';
import _ from 'lodash';
import config from 'config';

export const CALL_API = Symbol('CALL_API');
export const CHAIN_CALLS = Symbol('CHAIN_CALLS');

export default ({ dispatch, getState }) => next => action => {
  if (action[CALL_API]) {
    return dispatch({
      [CHAIN_CALLS]: [
        ()=> action
      ]
    });
  }

  let deferred = Promise.defer();

  if (! action[CHAIN_CALLS]) {
    return next(action);
  }

  let promiseCreators = action[CHAIN_CALLS].map((apiActionCreator, index)=> {
    return createRequestPromise(apiActionCreator, next, getState, dispatch);
  });

  let overall = promiseCreators.reduce((promise, creator)=> {
    return promise.then((body)=> {
      return creator(body);
    });
  }, Promise.resolve());

  overall.finally(()=> {
    deferred.resolve();
  }).catch(()=> {});

  return deferred.promise;
}

function createRequestPromise (apiActionCreator, next, getState, dispatch) {
  return (prevBody)=> {
    let apiAction = apiActionCreator(prevBody);
    let deferred = Promise.defer();
    let action = apiAction[CALL_API] || apiAction;

    if(apiAction[CALL_API]) {
      superAgent[action.method](`${config.API_BASE_URL}${action.path}`)
        .end((err, res)=> {
          if (err) {
            if(action.errorType) {
              dispatch({ type: action.errorType, error: err });
            }
            if(typeof action.afterErrorFunc === 'function') {
              action.afterErrorFunc({ dispatch, err , res });
            }
            deferred.reject();
          } else {
            if(action.successType) {
              dispatch({ type: action.successType, response: res.body });
            }
            if(typeof action.afterSuccessFunc === 'function') {
              action.afterSuccessFunc({dispatch, err, res });
            }
          }

          deferred.resolve({ err: err, res: res.body });
        });
    } else {
      setTimeout(()=> {
        dispatch(action);
        deferred.resolve();
      }, action.delayFor || 0);
    }

    return deferred.promise;
  }

}