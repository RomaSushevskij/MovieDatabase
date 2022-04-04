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
import {useDispatch, useSelector} from "react-redux";
import {Dispatch} from "redux";
import {AppActionsType, AppStateType} from "../../store/store";

export type SearchPageType = {
    onChangePage: (pageNumber: number) => void
}
export const SearchPage = ({

                               onChangePage,

                           }: SearchPageType) => {

    const dispatch = useDispatch<Dispatch<AppActionsType>>()
    const {
        searchResult,
        searchError,
        isFetching,
        totalFilmsCount,
        searchedMovieTitle,
        currentPage,
        optionTypeValue,
    } = useSelector((state: AppStateType) => state.filmsSearch)

    const films = searchResult.length ? searchResult.map((film, i) => {
        return <FilmPreview key={film.imdbID + i} {...film}/>
    }) : null
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