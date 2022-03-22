import React from 'react'
import styleContainer from '../../commonStyles/Container.module.css'
import style from './SearchPage.module.css'
import {FilmPreview} from "./FilmPreview/FilmPreview";
import {FilmType} from "../../App";
import {SearchError} from "../generic/SearchError/SearchError";
import {Preloader} from "../generic/Preloader/Preloader";

export type SearchPageType = {
    searchResult: FilmType[]
    searchError: string
    isFetching: boolean
}
export const SearchPage = ({searchResult, searchError, isFetching}: SearchPageType) => {
    const films = searchResult.length ? searchResult.map((film, i) => <FilmPreview
        key={film.imdbID + i} {...film}/>) : null
    const contentPage = !films && searchError ? <SearchError searchError={searchError}/> : films
    return (
        <div className={style.wrapper}>
            <div className={styleContainer.container}>
                {isFetching ? <Preloader/> : contentPage}
            </div>
        </div>
    )
}