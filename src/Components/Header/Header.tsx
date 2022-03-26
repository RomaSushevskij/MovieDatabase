import React, {memo} from 'react'
import style from './Header.module.css'
import styleContainer from '../../commonStyles/Container.module.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFilm} from '@fortawesome/free-solid-svg-icons'
import RadioButton from "./RadioButton/RadioButton";
import {InputContainer} from "./Input/InputContainer";
import {FilmsOptionsType} from "../../store/reducers/searchFilmsReducer/searchFilmsReducer";

type HeaderPropsType = {
    filmsTypes: string[]
    optionTypeValue: FilmsOptionsType
    getFilmsList: (searchName: string, typeValue: FilmsOptionsType) => void
    changeOptionValue: (optionTypeValue: FilmsOptionsType) => void
}

export const Header = memo(({
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