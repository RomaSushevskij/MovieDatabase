import React from 'react'
import styleContainer from '../../commonStyles/Container.module.css'
import style from './SearchPage.module.css'
import {FilmPreview} from "../FilmPreview/FilmPreview";
import {FilmType} from "../../App";
import {SearchError} from "../SearchError/SearchError";

export type SearchPageType = {
    searchResult: FilmType[]
    searchError: string
}
export const SearchPage = ({searchResult, searchError}: SearchPageType) => {
    debugger
    const films = searchResult.length ? searchResult.map(film => <FilmPreview key={film.imdbID} {...film}/>):null
    return (
        <div className={style.wrapper}>
            <div className={styleContainer.container}>

                {!films && searchError ? <SearchError searchError={searchError}/> : films}
            </div>
        </div>
    )
}