import React, {useEffect, useState} from 'react'
import styleContainer from '../../commonStyles/Container.module.css'
import style from './SearchPage.module.css'
import {FilmPreview} from "../FilmPreview/FilmPreview";
import {FilmType} from "../../App";

export type SearchPageType = {
    searchResult: FilmType[]
    searchError: string
}
export const SearchPage = ({searchResult, searchError}: SearchPageType) => {
    debugger
    const films = searchResult.length && searchResult.map(film => <FilmPreview {...film}/>)
    return (
        <div className={style.wrapper}>
            <div className={styleContainer.container}>
                {films ? films : searchError}
            </div>
        </div>
    )
}