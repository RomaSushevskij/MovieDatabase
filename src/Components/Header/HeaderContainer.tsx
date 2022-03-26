import React, {useEffect, useState} from 'react'
import {PATH} from "../../App";
import {AppActionsType, AppStateType} from "../../store/store";
import {Header} from "./Header";
import {useDispatch, useSelector} from "react-redux";
import {
    changeOptionTypeValue,
    FilmsOptionsType,
    setIsFetchingValue,
    setSearchedMovieTitle,
    setSearchError,
    setSearchResult,
    setTotalFilmsCount
} from "../../store/reducers/searchFilmsReducer/searchFilmsReducer";
import {Dispatch} from "redux";
import API from "../../api/API";
import {useLocation, useNavigate} from "react-router-dom";


export const HeaderContainer = () => {

    const [onSearchPage, setOnSearchPage] = useState(false)
    const {
        filmsTypes,
        optionTypeValue,
        searchError,
        searchResult,
        searchedMovieTitle,
    } = useSelector((state: AppStateType) => {
        return state.filmsSearch
    })
    const dispatch = useDispatch<Dispatch<AppActionsType>>()
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        if (location.pathname === "/searchPage/*") {
            setOnSearchPage(true)
        } else {
            setOnSearchPage(false)
        }
    }, [location.pathname])

    // T H U N K S
    const innerGetFilmsList = (title: string, typeValue: FilmsOptionsType) => {
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


    const getFilmsList = (title: string, typeValue: FilmsOptionsType) => {
        innerGetFilmsList(title, typeValue)
        !onSearchPage && navigate((PATH.SEARCH_PAGE))
    }

    const changeOptionValue = (optionTypeValue: FilmsOptionsType) => {
        dispatch(changeOptionTypeValue(optionTypeValue))
        onSearchPage && innerGetFilmsList(searchedMovieTitle, optionTypeValue)
    }
    return <Header filmsTypes={filmsTypes}
                   optionTypeValue={optionTypeValue}
                   getFilmsList={getFilmsList}
                   changeOptionValue={changeOptionValue}/>
}