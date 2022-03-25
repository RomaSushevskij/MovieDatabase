import React, {ChangeEvent, KeyboardEvent, MouseEventHandler, useState} from 'react'
import style from './Input.module.css'
import {Input} from "./Input";
import API, {source} from "../../../api/API";
import {AppActionsType, AppStateType} from "../../../store/store";
import {useDispatch, useSelector} from "react-redux";
import {Dispatch} from "redux";
import {
    setEditMode,
    setLiveIsFetchingValue,
    setLiveSearchError,
    setLiveSearchResult
} from "../../../store/reducers/liveSearchReducer/liveSearchReducer";


type InputContainerPropsType = {
    value?: string
    onChange?: (value: string) => void
    onEnter?: (value: string) => void
    placeHolder?: string
}

export const InputContainer = ({
                                   onEnter,
                                   placeHolder,
                               }: InputContainerPropsType) => {
    const {optionTypeValue} = useSelector((state: AppStateType) => state.filmsSearch)
    const {liveSearchError, liveSearchResult, liveIsFetchingValue, editMode} = useSelector((state: AppStateType) => state.liveSearch)
    const dispatch = useDispatch<Dispatch<AppActionsType>>()
    const [inputValue, setInputValue] = useState('');


    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        if (onEnter && e.key === 'Enter') {
            onEnter(inputValue)
            setInputValue('')
            dispatch(setEditMode(false))
        }
    };
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        if (source) {
            source.cancel('Request was cancel')
        }
        dispatch(setEditMode(true))
        const title = e.currentTarget.value
        setInputValue(title)
        dispatch(setLiveIsFetchingValue(true));
        API.searchFilmsByTitle(title, optionTypeValue)
            .then(({data}) => {
                const {Response, Search, Error, totalResults} = data
                dispatch(setLiveIsFetchingValue(false))
                if (Response === 'True') {
                    dispatch(setLiveSearchResult(Search))
                    liveSearchError && dispatch(setLiveSearchError(''))
                } else {
                    dispatch(setLiveSearchError(Error))
                    liveSearchError.length > 0 && dispatch(setLiveSearchResult([]))
                }
            })
            .catch(error => {
                console.log(error)
                dispatch(setLiveIsFetchingValue(false))
                liveSearchError.length > 0 && dispatch(setLiveSearchResult([]))
                error.response && dispatch(setLiveSearchError(error.response.data.Error))

            })
    }
    const onFilmItemLiveSearchClick = (e:React.MouseEvent<HTMLDivElement>) => {
        dispatch(setEditMode(false))
        setInputValue('')
    }
    return (
        <>
            <div className={style.search}>
                <Input placeHolder={placeHolder}
                       value={inputValue}
                       onChange={onChangeCallback}
                       onKeyPress={onKeyPressCallback}
                       onEnter={onEnter}
                       liveSearchResult={liveSearchResult}
                       liveIsFetchingValue={liveIsFetchingValue}
                       liveSearchError={liveSearchError}
                       editMode={editMode}
                onClickItem={onFilmItemLiveSearchClick}/>
            </div>
        </>
    )
}