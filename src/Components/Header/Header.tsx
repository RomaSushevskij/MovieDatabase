import React, {memo, useEffect, useState} from 'react'
import style from './Header.module.css'
import styleContainer from '../../commonStyles/Container.module.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFilm} from '@fortawesome/free-solid-svg-icons'
import RadioButton from "./RadioButton/RadioButton";
import {InputContainer} from "./Input/InputContainer";
import {
    changeOptionTypeValue,
    FilmsOptionsType,
    getFilms
} from "../../store/reducers/searchFilmsReducer/searchFilmsReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../store/store";
import {useLocation, useNavigate} from "react-router-dom";
import {PATH} from "../../App";

export const Header = memo(() => {
    //Are we on a search page?
    const [onSearchPage, setOnSearchPage] = useState(false)
    const {
        filmsTypes,
        optionTypeValue,
        searchedMovieTitle,
    } = useSelector((state: AppStateType) => {
        return state.filmsSearch
    })
    const dispatch = useDispatch()
    const location = useLocation();
    const navigate = useNavigate();
    //Determination of being on searchPage
    useEffect(() => {
        if (location.pathname === "/searchPage/*") {
            setOnSearchPage(true)
        } else {
            setOnSearchPage(false)
        }
    }, [location.pathname])
    //Getting of films by enter click in searchInput and redirect to SearchPage
    const onEnterKeyPressHandler = (inputValue: string) => {
        dispatch(getFilms(inputValue, optionTypeValue))
        !onSearchPage && navigate((PATH.SEARCH_PAGE))
    }
    //Getting of films when optionTypeValue changes (by optionTypeValue)
    const changeOptionValue = (optionTypeValue: FilmsOptionsType) => {
        dispatch(changeOptionTypeValue(optionTypeValue))
        onSearchPage && dispatch(getFilms(searchedMovieTitle, optionTypeValue))
    }

    return (
        <>
            <div className={styleContainer.container}>
                <div className={style.search_bar}>
                    <FontAwesomeIcon icon={faFilm} className={style.logo}/>
                    <InputContainer
                        placeHolder={"Movie search"}
                        onEnter={onEnterKeyPressHandler}/>
                    <RadioButton name={'radio'}
                                 options={filmsTypes}
                                 value={optionTypeValue}
                                 onChangeOption={changeOptionValue}/>
                </div>
            </div>
            <div className={style.border}></div>
        </>
    )
})