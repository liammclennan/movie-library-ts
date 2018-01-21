import * as React from 'react';
import { connect } from 'react-redux';
import './App.css';
import { routeComponentMap as searchRouteMap } from './Search';
import { routeComponentMap as movieRouteMap } from './Movie';
import Link from 'redux-first-router-link';

interface AppProps {
  type: string;
}

function App(location: AppProps) {
    const componentMap = Object.assign({}, movieRouteMap, searchRouteMap);
    const View = componentMap[location.type];

    return (
      <div className="App">
        <header className="App-header">
          <Link to="/"><h1 className="App-title">Movie Library</h1></Link>
        </header>
        <View location={location}/>
      </div>
    );
}

export default connect(
  function mapStateToProps(state: {location: AppProps}) {
    return state.location;
  }, 
  (dispatch) => ({}))(App);
