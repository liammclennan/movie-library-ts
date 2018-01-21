import React from 'react';
import ReactDOM from 'react-dom';
import promiseMiddleware from 'redux-promise-middleware';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { connectRoutes } from 'redux-first-router';
import createHistory from 'history/createBrowserHistory';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const routesMap = { 
    HOME: '/',
    MOVIE: movieRouteConfig,
    SEARCH: searchRouteConfig
};

const { reducer, middleware, enhancer } = connectRoutes(createHistory(), routesMap)

fdsafsadf
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
