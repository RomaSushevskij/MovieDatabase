import React from 'react'
import style from './Header.module.css'
import styleContainer from '../../commonStyles/Container.module.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFilm} from '@fortawesome/free-solid-svg-icons'
import {Input} from "./Input/Input";
import RadioButton from "./RadioButton/RadioButton";
import {FilmsOptionsType} from "../../App";

type HeaderPropsType = {
        filmsTypes: string[]
    optionTypeValue: FilmsOptionsType
    searchFilm: (searchName: string, typeValue: FilmsOptionsType) => void
    onChangeTypeValue: (optionTypeValue: FilmsOptionsType) => void
}

export const Header = ({
                           filmsTypes,
                           optionTypeValue,
                           searchFilm,
                           onChangeTypeValue,
                       }: HeaderPropsType) => {
    const onEnterKeyPressHandler = (inputValue: string) => {
        searchFilm(inputValue, optionTypeValue)
    }

    return (
        <>
            <div className={styleContainer.container}>
                <div className={style.search_bar}>
                    <FontAwesomeIcon icon={faFilm} className={style.logo}/>
                    <Input
                           placeHolder={"Movie search"}
                           onEnter={onEnterKeyPressHandler}/>
                    <RadioButton name={'radio'}
                                 options={filmsTypes}
                                 value={optionTypeValue}
                                 onChangeOption={onChangeTypeValue}/>
                </div>
            </div>
            <div className={style.border}></div>
        </>
    )
}