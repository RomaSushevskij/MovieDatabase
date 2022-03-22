import React, {useState} from 'react';
import './App.css';
import {Header} from "./Components/Header/Header";
import {SearchPage} from "./Components/SearchPage/SearchPage";
import {Navigate, Route, Routes} from "react-router-dom";
import {FilmItemType, FilmPage} from "./Components/FilmPage/FilmPage";
import API from "./api/API";
import {HeaderContainer} from "./Components/Header/HeaderContainer";
import {SearchPageContainer} from "./Components/SearchPage/SearchPageContainer";

export type PATHType = {
    SEARCH_PAGE: string
    FILM_PAGE: string

}
export const PATH: PATHType = {
    SEARCH_PAGE: '/searchPage/*',
    FILM_PAGE: '/filmPage/*',

};


export type FilmType = {
    Title: string
    Poster: string
    Year: string
    Type: string
    imdbID: string
}
export type FilmsOptionsType = 'All' | 'Movie' | 'Series' | 'Episode'

function App() {

    //     const searchFilm = (inputValue: string) => {
    //     return API.searchFilmsByTitle(inputValue, optionTypeValue)
    //         .then(data => {
    //             if (data.Response === 'True') {
    //                 setSearchResult(data.Search)
    //             } else {
    //                 setSearchResult([])
    //                 setSearchError(data.Error)
    //             }
    //         })
    // };
    // const getFilmsData = (imdbID: string) => {
    //     debugger
    //     return API.getFilmsData(imdbID, optionTypeValue)
    //         .then(data => {
    //             debugger
    //             setFilmsData(data)
    //         })

    return (
        <div className="app_wrapper">
            <HeaderContainer/>
            <div className="app_wrapper_content">
                <Routes>
                    <Route path='/' element={<Navigate to={PATH.SEARCH_PAGE}/>}/>
                    <Route path={PATH.SEARCH_PAGE}
                           element={<SearchPageContainer/>}/>
                    {/*<Route path={PATH.FILM_PAGE} element={<FilmPage*/}
                    {/*    getFilmsData={getFilmsData}*/}
                    {/*    filmsData={filmsData}/>}/>*/}
                </Routes>
            </div>

        </div>
    )


}

export default App;



