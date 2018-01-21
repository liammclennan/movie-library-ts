import * as React from 'react';
import * as ReactDOM from 'react-dom';
import promiseMiddleware from 'redux-promise-middleware';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { connectRoutes } from 'redux-first-router';
import createHistory from 'history/createBrowserHistory';
import App from './App';
import { searchReducer, searchRouteConfig } from './Search';
import { movieReducer, movieRouteConfig } from './Movie';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const routesMap = {
  HOME: '/',
  MOVIE: movieRouteConfig,
  SEARCH: searchRouteConfig
};

const { reducer, middleware, enhancer } = connectRoutes(createHistory(), routesMap);
const combinedReducers = combineReducers(Object.assign(
  { location: reducer },
  searchReducer, 
  movieReducer
));

/* tslint:disable:no-string-literal */
const store = createStore(
  combinedReducers,
  compose(
    enhancer,
    applyMiddleware(middleware, promiseMiddleware()),
    window['__REDUX_DEVTOOLS_EXTENSION__'] && window['__REDUX_DEVTOOLS_EXTENSION__']()));
/* tslint:enable:no-string-literal */

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);

store.dispatch({ type: 'START' });
registerServiceWorker();
