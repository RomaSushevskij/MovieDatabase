import React from 'react'
import {FilmsOptionsType} from "../../App";
import {AppActionsType, AppStateType, AppThunk} from "../../store/store";
import {Header} from "./Header";
import {useDispatch, useSelector} from "react-redux";
import {
    changeOptionTypeValue,
    setIsFetchingValue, setSearchError,
    setSearchResult
} from "../../store/reducers/searchFilmsReducer";
import {Dispatch} from "redux";
import API from "../../api/API";


export const HeaderContainer = () => {
    const {
        filmsTypes,
        optionTypeValue,
    } = useSelector((state: AppStateType) => {
        return state.filmsSearch
    })
    const dispatch = useDispatch<Dispatch<AppActionsType>>()
    // T H U N K S
    const getFilmsList = (title: string, typeValue: FilmsOptionsType) => {
        dispatch(setIsFetchingValue(true))
        API.searchFilmsByTitle(title, typeValue)
            .then(data => {
                debugger
                dispatch(setIsFetchingValue(false))
                if (data.Response === 'True') {
                    dispatch(setSearchResult(data.Search))
                } else {
                    dispatch(setSearchResult([]))
                    dispatch(setSearchError(data.Error))
                }


            })
    }

    const changeOptionValue = (optionTypeValue: FilmsOptionsType) => {
        dispatch(changeOptionTypeValue(optionTypeValue))
    }
    return <Header filmsTypes={filmsTypes}
                   optionTypeValue={optionTypeValue}
                   getFilmsList={getFilmsList}
                   changeOptionValue={changeOptionValue}/>
}