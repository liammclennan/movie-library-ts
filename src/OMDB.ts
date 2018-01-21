export interface MovieSummary {
    Title: string;
    Poster: string;
    imdbID: string;
}

export function searchByTitle(title: string): Promise<MovieSummary> {
    return fetch(`http://www.omdbapi.com/?apikey=8e4dcdac&s=${encodeURIComponent(title)}`)
        .then((response) => response.json());
}

export function getById(imdbID: string): Promise<MovieSummary> {
    return fetch(`http://www.omdbapi.com/?apikey=8e4dcdac&i=${encodeURIComponent(imdbID)}`)
        .then((response) => response.json());
}