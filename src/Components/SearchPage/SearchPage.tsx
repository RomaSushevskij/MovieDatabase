import React from 'react'
import styleContainer from '../../commonStyles/Container.module.css'
import style from './SearchPage.module.css'
import {FilmPreview} from "./FilmPreview/FilmPreview";
import {SearchError} from "../generic/SearchError/SearchError";
import {Preloader} from "../generic/Preloader/Preloader";
import {AboutSearchResult} from "../generic/AboutSearchResult/AboutSearchResult";
import {Paginator} from "../generic/Paginator/Paginator";
import {FilmType} from "../../store/reducers/searchFilmsReducer/searchFilmsReducer";
import {HomePage} from "../HomePage/HomePage";

export type SearchPageType = {
    searchResult: FilmType[]
    searchError: string
    isFetching: boolean
    totalFilmsCount: number
    currentPage: number
    searchedMovieTitle: string
    onChangePage: (pageNumber: number) => void
}
export const SearchPage = ({
                               searchResult,
                               searchError,
                               isFetching,
                               totalFilmsCount,
                               searchedMovieTitle,
                               currentPage,
                               onChangePage,

                           }: SearchPageType) => {
    const films = searchResult.length ? searchResult.map((film, i) => <FilmPreview
        key={film.imdbID + i} {...film}/>) : null
    let contentPage = !films && searchError ? <SearchError searchError={searchError}/> : films ? films : <HomePage/>
    return (
        <div className={style.wrapper}>
            {films && <AboutSearchResult totalFilmsCount={totalFilmsCount}
                                         searchedMovieTitle={searchedMovieTitle}/>}
            <div className={styleContainer.container}>
                {isFetching ? <Preloader/> : contentPage}
            </div>
            {films && <Paginator onChangePage={onChangePage}
                                 totalItemsCount={totalFilmsCount}
                                 pageSize={10}
                                 currentPage={currentPage}
                                 portionSize={10}/>}
        </div>
    )
}