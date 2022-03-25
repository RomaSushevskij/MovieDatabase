import React, {ChangeEvent, KeyboardEvent, MouseEventHandler} from 'react'
import style from './Input.module.css'
import {LiveSearchFilmItem} from "./LiveSearchFilmItem/LiveSearchFilmItem";
import {FilmType} from "../../../store/reducers/searchFilmsReducer/searchFilmsReducer";
import {Preloader} from "../../generic/Preloader/Preloader";
import {SearchError} from "../../generic/SearchError/SearchError";


type InputPropsType = {
    value?: string
    onChange?: (value: ChangeEvent<HTMLInputElement>) => void
    onEnter?: (value: string) => void
    placeHolder?: string
    onKeyPress?: (e: KeyboardEvent<HTMLInputElement>) => void
    liveSearchResult?: FilmType[]
    liveIsFetchingValue?: boolean
    liveSearchError?: string
    editMode?: boolean
    onClickItem: (e: React.MouseEvent<HTMLDivElement>) => void
}

export const Input = ({
                          value,
                          placeHolder,
                          onChange,
                          onKeyPress,
                          liveSearchResult,
                          liveIsFetchingValue,
                          liveSearchError,
                          editMode,
                          onClickItem,
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
                />
                <span></span>
                {editMode && <div className={style.searchingList}>
                    {liveIsFetchingValue ? <Preloader inLiveSearch={true}/> : liveSearchContent}
                </div>}

            </div>
        </>
    )
}