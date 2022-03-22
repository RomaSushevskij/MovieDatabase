import {
    changeOptionTypeValue,
    FilmItemType,
    FilmsOptionsType,
    FilmType,
    initialStateType,
    searchFilmsReducer
} from "./searchFilmsReducer";

let startState: initialStateType
beforeEach(()=>{
    startState = {
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
})

test('option type should change', () => {
    const endState = searchFilmsReducer(startState, changeOptionTypeValue("Movie"))

    expect(startState.optionTypeValue).toBe("All")
    expect(endState.optionTypeValue).toBe("Movie")
})