import React, {ChangeEvent, KeyboardEvent, memo} from 'react'
import style from './Input.module.css'
import {LiveSearchFilmItem} from "./LiveSearchFilmItem/LiveSearchFilmItem";
import {FilmType} from "../../../store/reducers/searchFilmsReducer/searchFilmsReducer";
import {Preloader} from "../../generic/Preloader/Preloader";
import {SearchError} from "../../generic/SearchError/SearchError";
import {CSSTransition} from "react-transition-group";


type InputPropsType = {
    value?: string
    onChange?: (value: ChangeEvent<HTMLInputElement>) => void
    onEnter?: (e: KeyboardEvent<HTMLInputElement>) => void
    placeHolder?: string
    onKeyPress?: (e: KeyboardEvent<HTMLInputElement>) => void
    liveSearchResult?: FilmType[]
    liveIsFetchingValue?: boolean
    liveSearchError?: string
    editMode?: boolean
    onClickItem?: (e: React.MouseEvent<HTMLDivElement>) => void
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void


}

export const Input = memo(({
                               value,
                               placeHolder,
                               onChange,
                               onKeyPress,
                               liveSearchResult,
                               liveIsFetchingValue,
                               liveSearchError,
                               editMode,
                               onClickItem,
                               onBlur,
                               onFocus,
                           }: InputPropsType) => {
    const liveSearchedFilms = liveSearchResult?.map((film, i) => <LiveSearchFilmItem onClickItem={onClickItem}
                                                                                     key={film.imdbID + i} {...film}/>)
    const liveSearchContent = liveSearchedFilms && liveSearchedFilms.length > 0 ?
        liveSearchedFilms : liveSearchError && value ?
            <SearchError searchError={liveSearchError} inLiveSearch={true}/> : null
    return (
        <>
            <div className={style.search}>
                <input type="text"
                       placeholder={placeHolder}
                       value={value}
                       onChange={onChange}
                       onKeyPress={onKeyPress}
                       onBlur={onBlur}
                       onFocus={onFocus}
                />
                <span></span>
                <CSSTransition in={editMode}
                               classNames={style}
                               timeout={600}
                               unmountOnExit
                               mountOnEnter>
                    <div className={style.searchingList}>
                        {liveIsFetchingValue ? <Preloader inLiveSearch={true}/> : liveSearchContent}
                    </div>
                </CSSTransition>

            </div>
        </>
    )
})