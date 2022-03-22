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
    getFilmsList: (searchName: string, typeValue: FilmsOptionsType) => void
    changeOptionValue: (optionTypeValue: FilmsOptionsType) => void
}

export const Header = ({
                           filmsTypes,
                           optionTypeValue,
                           getFilmsList,
                           changeOptionValue,

                       }: HeaderPropsType) => {
    const onEnterKeyPressHandler = (inputValue: string) => {
        getFilmsList(inputValue, optionTypeValue)
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
                                 onChangeOption={changeOptionValue}/>
                </div>
            </div>
            <div className={style.border}></div>
        </>
    )
}