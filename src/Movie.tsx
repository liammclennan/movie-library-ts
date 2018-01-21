import * as React from 'react';
import { connect } from 'react-redux';
import { MovieSummary, getById } from './OMDB';

interface MovieData {
    movie?: MovieSummary;
}

function Movie(props: MovieData) {
    return (
        <div>
        { props.movie 
            ? <p>
                    <h1>{props.movie.Title}</h1>
                    <img src={props.movie.Poster} alt={`${props.movie.Title} poster`} />
                </p>
            : <p>Loading...</p>
        }
        </div>
    );
}

const ConnectedMovie = connect(
    function mapStateToProps(state: { movie: MovieData }) {
        return state.movie;
    }, 
    function mapDispatchToProps(dispatch: (action: any) => void) {
        return {};
    }
)(Movie);

export const routeComponentMap = {
    MOVIE: ConnectedMovie
};

const defaultState: MovieData = {movie: undefined};

export const movieReducer = {
    movie: function (state: MovieData = defaultState, action: any) {
        switch (action.type) {
            case 'MOVIE_CLEAR': 
                return Object.assign({}, state, defaultState);
            case 'MOVIE_FETCHED':
                return Object.assign({}, state, {movie: action.movie});
            default: return state;
        }
    }
};

export const movieRouteConfig = { 
    path: '/movie/:imdbID',
    thunk: async (dispatch: (action: any) => void, getState: () => any) => {
        dispatch({ type: 'MOVIE_CLEAR'});
        const imdbID = getState().location.payload.imdbID;
        const movie = await getById(imdbID);
        dispatch({ type: 'MOVIE_FETCHED', movie });
    }
};