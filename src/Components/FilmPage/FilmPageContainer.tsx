import React, {useEffect} from "react";
import {useParams} from 'react-router-dom'
import {FilmPage} from "./FilmPage";
import {useDispatch, useSelector} from "react-redux";
import {AppActionsType, AppStateType} from "../../store/store";
import {Dispatch} from "redux";
import API from "../../api/API";
import {
    defaultFilmsData, searchFilmsInitialState,
    setFilmsData,
    setIsFetchingValue,
    setSearchError
} from "../../store/reducers/searchFilmsReducer/searchFilmsReducer";
import {setEditMode} from "../../store/reducers/liveSearchReducer/liveSearchReducer";

export const FilmPageContainer = () => {
    const {
        filmsData,
        optionTypeValue,
        searchError,
        isFetching,
    } = useSelector((state: AppStateType) => state.filmsSearch)
    const dispatch = useDispatch<Dispatch<AppActionsType>>()
    const getFilmsData = (imdbID: string) => {
        dispatch(setIsFetchingValue(true))
        API.getFilmsData(imdbID, optionTypeValue)
            .then(({data}) => {
                const {
                    Response,
                    Error,
                } = data
                dispatch(setIsFetchingValue(false))
                if (Response === 'True') {
                    dispatch(setFilmsData(data))
                    searchError && dispatch(setSearchError(''))
                } else {
                    dispatch(setSearchError(Error))
                    filmsData.Year !== "Year" && dispatch(setFilmsData(defaultFilmsData))
                }
            })
            .catch(error => {
                console.log(error)
                dispatch(setIsFetchingValue(false))
                filmsData.Year !== "Year" && dispatch(setFilmsData(defaultFilmsData))
                error.response && dispatch(setSearchError(error.response.data.Error))
            })
    }
    const params = useParams<'*'>()
    useEffect(() => {
        params["*"] ?
            getFilmsData(params['*']) :
            dispatch(setSearchError('Incorrect IMDb ID.'))
        dispatch(setEditMode(false))
        return ()=>{
            dispatch(setFilmsData(searchFilmsInitialState.filmsData))
        }
    }, [params["*"]])
    return (
        <FilmPage filmsData={filmsData}
                  searchError={searchError}
                  isFetching={isFetching}/>
    )
}
