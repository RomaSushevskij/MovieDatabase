import React from 'react'
import {SearchPage} from "./SearchPage";
import {AppActionsType, AppStateType} from "../../store/store";
import {useDispatch, useSelector} from "react-redux";
import {Dispatch} from "redux";
import {
    setCurrentPage,
    setIsFetchingValue,
    setSearchedMovieTitle,
    setSearchError,
    setSearchResult
} from "../../store/reducers/searchFilmsReducer/searchFilmsReducer";
import API from "../../api/API";

export const SearchPageContainer = () => {
    const dispatch = useDispatch<Dispatch<AppActionsType>>()
    const {
        searchResult,
        searchError,
        searchedMovieTitle,
        optionTypeValue,
    } = useSelector((state: AppStateType) => state.filmsSearch)
    const onChangePage = (pageNumber: number) => {
        dispatch(setCurrentPage(pageNumber))
        dispatch(setIsFetchingValue(true))
        API.searchFilmsByTitle(searchedMovieTitle, optionTypeValue, pageNumber)
            .then(({data}) => {
                const {Response, Search, Error, totalResults} = data
                dispatch(setIsFetchingValue(false))
                if (Response === 'True') {
                    dispatch(setSearchResult(Search))
                    searchError && dispatch(setSearchError(''))
                } else {
                    dispatch(setSearchError(Error))
                    searchResult.length > 0 && dispatch(setSearchResult([]))
                }
            })
            .catch(error => {
                console.log(error)
                dispatch(setIsFetchingValue(false))
                searchedMovieTitle && dispatch(setSearchedMovieTitle(''))
                searchResult.length > 0 && dispatch(setSearchResult([]))
                dispatch(setSearchError(error.response.data.Error))
            })
    }
    return <SearchPage onChangePage={onChangePage}/>
}