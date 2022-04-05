import React, {ChangeEvent, KeyboardEvent, memo, useEffect, useState} from 'react'
import style from './Header.module.css'
import styleContainer from '../../commonStyles/Container.module.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFilm} from '@fortawesome/free-solid-svg-icons'
import RadioButton from "./RadioButton/RadioButton";
import {
    changeOptionTypeValue,
    FilmsOptionsType,
    getFilms
} from "../../store/reducers/searchFilmsReducer/searchFilmsReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../store/store";
import {useLocation, useNavigate} from "react-router-dom";
import {PATH} from "../../App";
import {getFilmsInLiveSearch, setEditMode} from "../../store/reducers/liveSearchReducer/liveSearchReducer";
import {Input} from "./Input/Input";

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

    //Getting of films when optionTypeValue changes (by optionTypeValue)
    const changeOptionValue = (optionTypeValue: FilmsOptionsType) => {
        dispatch(changeOptionTypeValue(optionTypeValue))
        onSearchPage && dispatch(getFilms(searchedMovieTitle, optionTypeValue))
    }

    //FUNCTIONALITY FOR INPUT
    const {liveSearchError, liveSearchResult, liveIsFetchingValue, editMode} = useSelector((state: AppStateType) => state.liveSearch)
    const [inputValue, setInputValue] = useState('');
    useEffect(() => {
        if (!inputValue) {
            dispatch(setEditMode(false))
        }
    }, [inputValue])

    //Getting of films by enter click in searchInput and redirect to SearchPage
    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            dispatch(getFilms(inputValue, optionTypeValue))
            !onSearchPage && navigate((PATH.SEARCH_PAGE))
            setInputValue('')
            dispatch(setEditMode(false))
        }
    };
    //Getting of films by every key press
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        const title = e.currentTarget.value
        setInputValue(title)
        dispatch(getFilmsInLiveSearch(title))
    }
    //Action on clicking on a item film in the list on live search films
    const onFilmItemLiveSearchClick = (e: React.MouseEvent<HTMLDivElement>) => {
        dispatch(setEditMode(false))
        setInputValue('')
    }
    const onBlurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
        dispatch(setEditMode(false))
    }
    const onFocusHandler = (e: React.FocusEvent<HTMLInputElement>) => {
        if (inputValue) {
            dispatch(setEditMode(true))
        }
    }
    return (
        <>
            <div className={styleContainer.container}>
                <div className={style.search_bar}>
                    <FontAwesomeIcon icon={faFilm} className={style.logo}/>
                    <Input placeHolder={"Movie search"}
                           value={inputValue}
                           onChange={onChangeCallback}
                           onKeyPress={onKeyPressCallback}
                           onEnter={onKeyPressCallback}
                           liveSearchResult={liveSearchResult}
                           liveIsFetchingValue={liveIsFetchingValue}
                           liveSearchError={liveSearchError}
                           editMode={editMode}
                           onBlur={onBlurHandler}
                           onFocus={onFocusHandler}
                           onClickItem={onFilmItemLiveSearchClick}/>
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