import {
    changeOptionTypeValue,
    FilmItemType,
    FilmType,
    searchFilmsInitialState,
    SearchFilmsInitialStateType,
    searchFilmsReducer,
    setCurrentPage,
    setFilmsData,
    setIsFetchingValue,
    setSearchedMovieTitle,
    setSearchError,
    setSearchResult,
    setTotalFilmsCount
} from "./searchFilmsReducer";

let startState: SearchFilmsInitialStateType
beforeEach(() => {
    startState = searchFilmsInitialState
})
test('correct title of searched film should be add to state', () => {
    const filmTitle = 'Lord of the rings'
    const endState = searchFilmsReducer(startState, setSearchedMovieTitle(filmTitle))

    expect(startState.searchedMovieTitle).toBe("")
    expect(endState.searchedMovieTitle).toBe(filmTitle)
})

test('option type should change', () => {
    const endState = searchFilmsReducer(startState, changeOptionTypeValue("Movie"))

    expect(startState.optionTypeValue).toBe("All")
    expect(endState.optionTypeValue).toBe("Movie")
})

test('correct totalResults of searched films should be add to state', () => {
    const totalResults = '725'
    const endState = searchFilmsReducer(startState, setTotalFilmsCount(Number(totalResults)))

    expect(startState.totalFilmsCount).toBe(0)
    expect(endState.totalFilmsCount).toBe(725)
})

test('currentPage should be correct', () => {
    const pageNumber = 3
    const endState = searchFilmsReducer(startState, setCurrentPage(pageNumber))

    expect(startState.currentPage).toBe(1)
    expect(endState.currentPage).toBe(3)
})


test(' data about found movies should be added to the state', () => {
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
    const endState = searchFilmsReducer(startState, setSearchResult(films))

    expect(startState.searchResult).toStrictEqual([])
    expect(endState.searchResult).toStrictEqual(films)

})
test(' data about found film should be added to the state', () => {
    const film: FilmItemType = {
        Actors: "Emilia Clarke, Peter Dinklage, Kit Harington",
        Country: "United States, United Kingdom",
        Director: "N/A",
        Genre: "Action, Adventure, Drama",
        Language: "English",
        Metascore: "N/A",
        Plot: "Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.",
        Poster: "https://m.media-amazon,.com/images/M/MV5BYTRiNDQwYzAtMzVlZS00NTI5LWJjYjUtMzkwNTUzMWMxZTllXkEyXkFqcGdeQXVyNDIzMzcwNjc@._V1_SX300.jpg",
        Response: "True",
        Runtime: "57 min",
        Title: "Game of Thrones",
        Year: "2011–2019",
        imdbID: "tt0944947",
        imdbRating: "9.3",
    }

    const endState = searchFilmsReducer(startState, setFilmsData(film))

    expect(startState.filmsData).toEqual({
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
    })
    expect(endState.filmsData).toEqual(film)
})

test('correct search error should be add to state', () => {
    const error = 'Movie not found'
    const endState = searchFilmsReducer(startState, setSearchError(error))

    expect(startState.searchError).toBe("")
    expect(endState.searchError).toBe(error)
})
test('value of isFetching should be correct', () => {

    const endState1 = searchFilmsReducer(startState, setIsFetchingValue(true))
    const endState2 = searchFilmsReducer(endState1, setIsFetchingValue(false))

    expect(startState.isFetching).toBeFalsy()
    expect(endState1.isFetching).toBeTruthy()
    expect(endState1.optionTypeValue).toBe('All')
    expect(endState1.searchResult).toStrictEqual([])

    expect(endState2.isFetching).toBeFalsy()
    expect(endState1.isFetching).toBeTruthy()
    expect(endState1.optionTypeValue).toBe('All')
    expect(endState1.searchResult).toStrictEqual([])
})

