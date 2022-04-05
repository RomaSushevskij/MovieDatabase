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

    return <SearchPage/>
}