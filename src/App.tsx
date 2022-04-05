import React from 'react';
import './App.css';
import {Navigate, Route, Routes} from "react-router-dom";
import {Header} from "./Components/Header/Header";
import {FilmPage} from "./Components/FilmPage/FilmPage";
import {SearchPage} from "./Components/SearchPage/SearchPage";

export type PATHType = {
    SEARCH_PAGE: string
    FILM_PAGE: string

}
export const PATH: PATHType = {
    SEARCH_PAGE: '/searchPage/*',
    FILM_PAGE: '/filmPage/*',

};

function App() {
    return (
        <div className="app_wrapper">
            <Header/>
            <div className="app_wrapper_content">
                <Routes>
                    <Route path='/' element={<Navigate to={PATH.SEARCH_PAGE}/>}/>
                    <Route path={PATH.SEARCH_PAGE}
                           element={<SearchPage/>}/>
                    <Route path={PATH.FILM_PAGE} element={<FilmPage/>}/>
                </Routes>
            </div>
        </div>
    )
}

export default App;



