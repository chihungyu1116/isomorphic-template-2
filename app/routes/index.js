import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';
import configureStore from 'store/configureStore';

import App from 'containers/App';
import BigDataPortal from 'containers/BigDataPortal'

export default function(history) {
  return (
    <Router history={ history }>
      <Route path="/" component={ App }>
        <IndexRoute component={ BigDataPortal } />
      </Route>
    </Router>
  );
};