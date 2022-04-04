import {AppStateType, AppThunk} from "../../store";
import API from "../../../api/API";

enum ACTIONS_TYPES {
    CHANGE_OPTION_TYPE_VALUE = 'SearchFilms/CHANGE_OPTION_TYPE_VALUE',
    SET_SEARCH_RESULT = 'SearchFilms/SET_SEARCH_RESULT',
    SET_FILMS_DATA = 'SearchFilms/SET_FILMS_DATA',
    SET_SEARCH_ERROR = 'SearchFilms/SET_SEARCH_ERROR',
    SET_IS_FETCHING_VALUE = 'SearchFilms/SET_IS_FETCHING_VALUE',
    SET_SEARCHED_MOVIE_TITLE = 'SearchFilms/SET_SEARCHED_MOVIE_TITLE',
    SET_TOTAL_FILMS_COUNT = 'SearchFilms/SET_TOTAL_FILMS_COUNT',
    SET_CURRENT_PAGE = 'SearchFilms/SET_CURRENT_PAGE',
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
export const defaultFilmsData = {
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
    "imdbID": "imdbID",
} as FilmItemType
export const searchFilmsInitialState = {
    searchedMovieTitle: '',
    searchResult: [] as FilmType[],
    searchError: '',
    filmsTypes: ['All', 'Movie', 'Series', 'Episode'] as FilmsOptionsType[],
    optionTypeValue: 'All' as FilmsOptionsType,
    filmsData: defaultFilmsData,
    isFetching: false,
    totalFilmsCount: 0,
    currentPage: 1,
}
export type SearchFilmsInitialStateType = typeof searchFilmsInitialState

export const searchFilmsReducer = (state = searchFilmsInitialState, action: ActionTypeSearchFilms): SearchFilmsInitialStateType => {
    switch (action.type) {
        case ACTIONS_TYPES.CHANGE_OPTION_TYPE_VALUE:
        case ACTIONS_TYPES.SET_FILMS_DATA:
        case ACTIONS_TYPES.SET_SEARCH_ERROR:
        case ACTIONS_TYPES.SET_IS_FETCHING_VALUE:
        case ACTIONS_TYPES.SET_SEARCH_RESULT:
        case ACTIONS_TYPES.SET_SEARCHED_MOVIE_TITLE:
        case ACTIONS_TYPES.SET_TOTAL_FILMS_COUNT:
        case ACTIONS_TYPES.SET_CURRENT_PAGE:
            return {
                ...state, ...action.payload
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
    ReturnType<typeof setIsFetchingValue> |
    ReturnType<typeof setSearchedMovieTitle> |
    ReturnType<typeof setTotalFilmsCount> |
    ReturnType<typeof setCurrentPage>

// A C T I O N  C R E A T O R S
export const setSearchedMovieTitle = (searchedMovieTitle: string) => ({
    type: ACTIONS_TYPES.SET_SEARCHED_MOVIE_TITLE, payload: {searchedMovieTitle}
} as const)
export const setTotalFilmsCount = (totalFilmsCount: number) => ({
    type: ACTIONS_TYPES.SET_TOTAL_FILMS_COUNT, payload: {totalFilmsCount}
} as const)
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
export const setCurrentPage = (currentPage: number) => ({
    type: ACTIONS_TYPES.SET_CURRENT_PAGE, payload: {currentPage}
} as const)

// T H U N K S
export const getFilms = (title: string, typeValue: FilmsOptionsType): AppThunk => (dispatch,  getState) => {
    const {searchError, searchResult} = getState().filmsSearch
    if (title) {
        dispatch(setIsFetchingValue(true))
        API.searchFilmsByTitle(title, typeValue)
            .then(({data}) => {
                const {Response, Search, Error, totalResults} = data
                dispatch(setIsFetchingValue(false))
                if (Response === 'True') {
                    dispatch(setSearchedMovieTitle(title))
                    dispatch(setTotalFilmsCount(Number(totalResults)))
                    dispatch(setSearchResult(Search))
                    searchError && dispatch(setSearchError(''))
                } else {
                    dispatch(setSearchError(Error))
                    dispatch(setSearchedMovieTitle(title))
                    searchResult.length > 0 && dispatch(setSearchResult([]))
                }
            })
            .catch(error => {
                console.log(error)
                dispatch(setIsFetchingValue(false))
                dispatch(setSearchedMovieTitle(title))
                searchResult.length > 0 && dispatch(setSearchResult([]))
            })
    }
}


