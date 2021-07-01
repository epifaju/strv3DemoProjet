import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import Content from './components/Content.jsx';
import { compose, createStore, applyMiddleware } from 'redux';
import getRootReducer from './reducers';
import { init as initService } from './service.js';
import {connectRouter, routerMiddleware, ConnectedRouter} from 'connected-react-router';
import {createBrowserHistory} from 'history';
import {combineReducers} from 'redux';

import './index.css';

const preloadedState = {};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const history = createBrowserHistory();

const store = createStore(
  //combineReducers({router:connectRouter(history)},getRootReducer()),
  getRootReducer(history),
  preloadedState,
  composeEnhancers(applyMiddleware(thunk, routerMiddleware(history))),
);

initService(store);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Content />
    </ConnectedRouter>
  </Provider>, document.getElementById('root'));