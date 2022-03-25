import {
    LiveSearchInitialStateType,
    liveSearchReducer,
    liveSearchInitialState, setLiveIsFetchingValue, setLiveSearchError,
    setLiveSearchResult
} from "./liveSearchReducer";
import {
    FilmType,
    searchFilmsReducer,
    setIsFetchingValue, setSearchError,
    setSearchResult
} from "../searchFilmsReducer/searchFilmsReducer";

let startState: LiveSearchInitialStateType =
    beforeEach(() => {
        startState = liveSearchInitialState
    })
test(' data about found movies in live search should be added to the state', () => {
    const films: FilmType[] =
        [
            {
                "Title": "The Matrix",
                "Year": "1999",
                "imdbID": "tt0133093",
                "Type": "movie",
                "Poster": "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg"
            },
            {
                "Title": "The Matrix Reloaded",
                "Year": "2003",
                "imdbID": "tt0234215",
                "Type": "movie",
                "Poster": "https://m.media-amazon.com/images/M/MV5BODE0MzZhZTgtYzkwYi00YmI5LThlZWYtOWRmNWE5ODk0NzMxXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg"
            },
            {
                "Title": "The Matrix Revolutions",
                "Year": "2003",
                "imdbID": "tt0242653",
                "Type": "movie",
                "Poster": "https://m.media-amazon.com/images/M/MV5BNzNlZTZjMDctZjYwNi00NzljLWIwN2QtZWZmYmJiYzQ0MTk2XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg"
            },
        ]
    const endState = liveSearchReducer(startState, setLiveSearchResult(films))

    expect(startState.liveSearchResult).toStrictEqual([])
    expect(endState.liveSearchResult).toStrictEqual(films)

})

test('value of liveIsFetching should be correct', () => {

    const endState1 = liveSearchReducer(startState, setLiveIsFetchingValue(true))
    const endState2 = liveSearchReducer(endState1, setLiveIsFetchingValue(false))

    expect(startState.liveIsFetchingValue).toBeFalsy()
    expect(endState1.liveIsFetchingValue).toBeTruthy()

    expect(endState2.liveIsFetchingValue).toBeFalsy()
    expect(endState1.liveIsFetchingValue).toBeTruthy()
})
test('correct liveSearchError should be add to state', () => {
    const error = 'Movie not found'
    const endState = liveSearchReducer(startState, setLiveSearchError(error))

    expect(startState.liveSearchError).toBe("")
    expect(endState.liveSearchError).toBe(error)
})

