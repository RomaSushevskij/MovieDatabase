import {AppThunk} from "../store";
import API from "../../api/API";

enum ACTIONS_TYPES {
    CHANGE_OPTION_TYPE_VALUE = 'SearchFilms/CHANGE_OPTION_TYPE_VALUE',
    SET_SEARCH_RESULT = 'SearchFilms/SET_SEARCH_RESULT',
    SET_FILMS_DATA = 'SearchFilms/SET_FILMS_DATA',
    SET_SEARCH_ERROR = 'SearchFilms/SET_SEARCH_ERROR',
    SET_IS_FETCHING_VALUE = 'SearchFilms/SET_IS_FETCHING_VALUE',
}


export type FilmType = {
    Title: string
    Poster: string
    Year: string
    Type: string
    imdbID: string
}
export type FilmsOptionsType = 'All' | 'Movie' | 'Series' | 'Episode'
export type FilmItemType = {
    Title: string
    Year: string
    "Runtime": string
    "Genre": string
    "Director": string
    "Actors": string
    "Plot": string
    "Language": string
    "Country": string
    "Poster": string
    "Metascore": string
    "imdbRating": string
    "Response": string
    "imdbID": string
}

export const initialState = {
    searchResult: [] as FilmType[],
    searchError: '',
    filmsTypes: ['All', 'Movie', 'Series', 'Episode'] as FilmsOptionsType[],
    optionTypeValue: 'All' as FilmsOptionsType,
    filmsData: {
        "Title": "Title",
        "Year": "Year",
        "Runtime": "Runtime",
        "Genre": "Genre",
        "Director": "Director",
        "Actors": "Actors",
        "Plot": "Plot",
        "Language": "Language",
        "Country": "Country",
        "Poster": "Poster",
        "Metascore": "Metascore",
        "imdbRating": "imdbRating",
        "Response": "Response",
        "imdbID": "imdbID",
    } as FilmItemType,
    isFetching: false,
}
export type initialStateType = typeof initialState

export const searchFilmsReducer = (state = initialState, action: ActionTypeSearchFilms): initialStateType => {
    switch (action.type) {
        case ACTIONS_TYPES.CHANGE_OPTION_TYPE_VALUE:
        case ACTIONS_TYPES.SET_FILMS_DATA:
        case ACTIONS_TYPES.SET_SEARCH_ERROR:
        case ACTIONS_TYPES.SET_IS_FETCHING_VALUE:
            return {
                ...state, ...action.payload
            }
        case ACTIONS_TYPES.SET_SEARCH_RESULT:
            return {
                ...state, searchResult: action.payload.searchResult
            }
        default:
            return state
    }
}
export type ActionTypeSearchFilms =
    ReturnType<typeof changeOptionTypeValue> |
    ReturnType<typeof setSearchResult> |
    ReturnType<typeof setFilmsData> |
    ReturnType<typeof setSearchError> |
    ReturnType<typeof setIsFetchingValue>

// A C T I O N  C R E A T O R S
export const changeOptionTypeValue = (optionTypeValue: FilmsOptionsType) => ({
    type: ACTIONS_TYPES.CHANGE_OPTION_TYPE_VALUE, payload: {optionTypeValue}
} as const)
export const setSearchResult = (searchResult: FilmType[]) => ({
    type: ACTIONS_TYPES.SET_SEARCH_RESULT, payload: {searchResult}
} as const)
export const setFilmsData = (filmsData: FilmItemType) => ({
    type: ACTIONS_TYPES.SET_FILMS_DATA, payload: {filmsData}
} as const)
export const setSearchError = (searchError: string) => ({
    type: ACTIONS_TYPES.SET_SEARCH_ERROR, payload: {searchError}
} as const)
export const setIsFetchingValue = (isFetching: boolean) => ({
    type: ACTIONS_TYPES.SET_IS_FETCHING_VALUE, payload: {isFetching}
} as const)

