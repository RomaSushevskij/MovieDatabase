import React from 'react';
import './App.css';
import {Navigate, Route, Routes} from "react-router-dom";
import {SearchPageContainer} from "./Components/SearchPage/SearchPageContainer";
import {FilmPageContainer} from "./Components/FilmPage/FilmPageContainer";
import {Header} from "./Components/Header/Header";

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
                           element={<SearchPageContainer/>}/>
                    <Route path={PATH.FILM_PAGE} element={<FilmPageContainer/>}/>
                </Routes>
            </div>
        </div>
    )
}

export default App;



