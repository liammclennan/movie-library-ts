import * as React from 'react';
import { connect } from 'react-redux';
import Link from 'redux-first-router-link';
import { searchByTitle, MovieSummary } from './OMDB';

interface SearchFormProps {
    onSearch: (title: string) => void;
}

interface SearchResults {
    results: MovieSummary[];
}

class SearchForm extends React.Component<SearchFormProps, {title: string}> {
    constructor(props: SearchFormProps) {
        super(props);
        this.state = {title: ''};
        this.titleChange = this.titleChange.bind(this);
        this.search = this.search.bind(this);
    }

    titleChange(event: any) {
        this.setState({title: event.target.value});
    }

    search(event: any) {
        event.preventDefault();
        this.props.onSearch(this.state.title);
    }

    render() {
        return (
        <div><form onSubmit={this.search}>
            <label htmlFor="title">Title: </label>
            <input type="text" name="title" value={this.state.title} onChange={this.titleChange}/>
            <input type="submit" value="Search"/>
        </form>
        </div>
        );
    }
}

function Search({ onSearch, results = [] }: SearchFormProps & SearchResults) {
    return (
    <div>
        <h1>Search</h1>
        <SearchForm onSearch={onSearch} />
        <div>
            {results.map(({Title, Poster, imdbID}) =>
            <Link to={{type: 'MOVIE', payload: {imdbID}}} key={imdbID}>
                <img src={Poster} alt={Title} />
            </Link>)}
        </div>
    </div>
    );
}

const ConnectedSearch = connect(
    function mapStateToProps(state: { search: SearchResults }) {
        return state.search;
    }, 
    function mapDispatchToProps(dispatch: (action: any) => void) {
        return {
            onSearch: (title: string) => {
                dispatch({
                    type: 'SEARCH',
                    payload: {title}
                  });
            }
        };
    }
)(Search);

export const routeComponentMap = {
    HOME: ConnectedSearch,
    SEARCH: ConnectedSearch
};

export const searchReducer = { 
    search: function (state: SearchResults = {results: []}, action: any) {
        switch (action.type) {
            case 'SEARCH_FULFILLED':
                return Object.assign(
                    {}, 
                    { results: action.payload.Response 
                            ? action.payload.Search.filter(({Poster}: MovieSummary) => Poster !== 'N/A')
                            : []});
            default: return state;
        }
    }
};

export const searchRouteConfig = {
    path: '/search/:title',
    thunk: async (dispatch: (action: any) => void, getState: () => any) => {
        const title = getState().location.payload.title;
        const results = await searchByTitle(title);
        dispatch({ type: 'SEARCH_FULFILLED', payload: results });
    }
};