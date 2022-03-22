enum ACTIONS_TYPES {
    CHANGE_OPTION_TYPE_VALUE = 'SearchFilms/CHANGE_OPTION_TYPE_VALUE'
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
        "imdbID":"imdbID",
    } as FilmItemType
}
export type initialStateType = typeof initialState

export const searchFilmsReducer = (state: initialStateType, action: ActionType): initialStateType => {
    switch (action.type) {
        case ACTIONS_TYPES.CHANGE_OPTION_TYPE_VALUE:
            return {
                ...state, ...action.payload
            }
        default:
            return state
    }
}
type ActionType = ReturnType<typeof changeOptionTypeValue>

export const changeOptionTypeValue = (optionTypeValue: FilmsOptionsType) => ({
    type: ACTIONS_TYPES.CHANGE_OPTION_TYPE_VALUE, payload: {optionTypeValue}
} as const)