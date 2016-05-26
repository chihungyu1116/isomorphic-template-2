import Express from 'express';
import path from 'path';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { RoutingContext, match } from 'react-router';

import { createMemoryHistory, useQueries } from 'history';
import compression from 'compression';
import Promise from 'bluebird';

import configureStore from 'store/configureStore';
import createRoutes from 'routes/index';

import { Provider } from 'react-redux';

let server = new Express();
let port = process.env.PORT || 3000;
let scriptSrcs;

let styleSrcs;
if ( process.env.NODE_ENV === 'production' ) {
  let assets = require('../../dist/webpack-assets.json');
  let refManifest = require('../../dist/rev-manifest.json');
  scriptSrcs = [
    `/${assets.vendor.js}`,
    `/${assets.app.js}`
  ];
  styleSrcs = [
    `/${refManifest['bootstrap.css']}`,
    `/${refManifest['font-awesome.css']}`,
    `/${refManifest['main.css']}`,
  ];
} else {
  scriptSrcs = [
    'http://localhost:3001/static/vendor.js',
    'http://localhost:3001/static/dev.js',
    'http://localhost:3001/static/app.js'
  ];
  styleSrcs = [
    '/bootstrap.css',
    '/font-awesome.css',
    '/main.css'
  ];
}

server.use(compression());
server.use(Express.static(path.join(__dirname, '../..', 'dist')));
server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'ejs');

const mysql = require('../db/mysql');

// Can assume it connect to MySQL only for now
server.get('/api/connect_to_env', (req, res)=> {
  const env = req.query.env.toLowerCase();
  const pool = mysql.getOrCreatePool(env);

  pool.getConnection((err, con)=> {
    if(err) {
      con.release();
      res.json({"code" : 100, "status" : "Error in connection database"});
      return;
    }

    console.log('connected as id ' + con.threadId);

    con.query('show databases', (err, rows)=> {
      con.release();
      let data = [];

      if(!err) {  
        const excludedSqlType = ['information_schema'];

        rows.forEach((row) => {
          const sqlType = row.Database;
          if(excludedSqlType.indexOf(sqlType) === -1) {
            data.push({ checked: false, name: sqlType });  
          }
        });
      }

      res.json(data);
    });

    con.on('error', function(err) {      
      res.json({"code" : 100, "status" : "Error in connection database"});
      return;     
    });
  });
});

// mock apis
// server.get('/api/questions', (req, res)=> {
//   let { questions } = require('./mock_api');
//   res.send(questions);
// });

// server.get('/api/users/:id', (req, res)=> {
//   let { getUser } = require('./mock_api')
//   res.send(getUser(req.params.id))
// })
// server.get('/api/questions/:id', (req, res)=> {
//   let { getQuestion } = require('./mock_api')
//   res.send(getQuestion(req.params.id))
// })

server.get('*', (req, res, next)=> {
  let history = useQueries(createMemoryHistory)();
  let store = configureStore();
  let routes = createRoutes(history);
  let location = history.createLocation(req.url);

  match({ routes, location }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(301, redirectLocation.pathname + redirectLocation.search);
    } else if (error) {
      res.status(500).send(error.message);
    } else if (renderProps == null) {
      res.status(404).send('Not found')
    } else {
      let [ getCurrentUrl, unsubscribe ] = subscribeUrl();
      let reqUrl = location.pathname + location.search;

      getReduxPromise().then((data,aa)=> {
        let reduxState = escape(JSON.stringify(store.getState()));
        let html = ReactDOMServer.renderToString(
          <Provider store={store}>
            { <RoutingContext {...renderProps}/> }
          </Provider>
        );

        if ( getCurrentUrl() === reqUrl ) {
          res.render('index', { html, scriptSrcs, reduxState, styleSrcs });
        } else {
          res.redirect(302, getCurrentUrl());
        }
        unsubscribe();
      })
      .catch((err)=> {
        unsubscribe();
        next(err);
      });

      function getReduxPromise () {
        let { query, params } = renderProps;
        let comp = renderProps.components[renderProps.components.length - 1].WrappedComponent;
        let promise = comp.fetchData ?
          comp.fetchData({ query, params, store, history }) :
          Promise.resolve();

        return promise;
      }
    }
  });
  function subscribeUrl () {
    let currentUrl = location.pathname + location.search;
    let unsubscribe = history.listen((newLoc)=> {
      if (newLoc.action === 'PUSH') {
        currentUrl = newLoc.pathname + newLoc.search;
      }
    });
    return [
      ()=> currentUrl,
      unsubscribe
    ];
  }
});

server.use((err, req, res, next)=> {
  console.log(err.stack);
  // TODO report error here or do some further handlings
  res.status(500).send("something went wrong...")
})

console.log(`Server is listening to port: ${port}`);
server.listen(port);
