import React, {useState} from 'react';
import './App.css';
import {Header} from "./Components/Header/Header";
import {SearchPage} from "./Components/SearchPage/SearchPage";
import {Navigate, Route, Routes} from "react-router-dom";
import {FilmItemType, FilmPage} from "./Components/FilmPage/FilmPage";
import API from "./api/API";

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
    const initState = {
        "Title": "Title",
        "Year": "Year",
        "Runtime": "Runtime",
        "Genre": "Genre",
        "Director": "Director",
        "Actors": "Actors",
        "Plot": "Plot",
        "Language": "Language",
        "Country": "Country",
        "Poster": "Poster",
        "Metascore": "Metascore",
        "imdbRating": "imdbRating",
        "Response": "Response",
        "imdbID": "imdbID",
    }
    const [searchName, setSearchName] = useState('');
    const [searchResult, setSearchResult] = useState<FilmType[]>([]);
    const [searchError, setSearchError] = useState('');
    const [filmsData, setFilmsData] = useState<FilmItemType>(initState);

    const filmsTypes = ['All', 'Movie', 'Series', 'Episode']
    const [optionTypeValue, onChangeTypeValue] = useState<FilmsOptionsType>('All')

    const searchFilm = (inputValue: string) => {
        return API.searchFilmsByTitle(inputValue, optionTypeValue)
            .then(data => {
                if (data.Response === 'True') {
                    setSearchResult(data.Search)
                } else {
                    setSearchResult([])
                    setSearchError(data.Error)
                }
            })
    };
    const getFilmsData = (imdbID: string) => {
        debugger
        return API.getFilmsData(imdbID, optionTypeValue)
            .then(data => {
                debugger
                setFilmsData(data)
            })


    }

    return (
        <div className="app_wrapper">
            <Header filmsTypes={filmsTypes}
                    optionTypeValue={optionTypeValue}
                    searchFilm={searchFilm}
                    onChangeTypeValue={onChangeTypeValue}/>
            <div className="app_wrapper_content">
                <Routes>
                    <Route path='/' element={<Navigate to={PATH.SEARCH_PAGE}/>}/>
                    <Route path={PATH.SEARCH_PAGE}
                           element={<SearchPage
                               searchResult={searchResult}
                               searchError={searchError}/>}/>
                    <Route path={PATH.FILM_PAGE} element={<FilmPage
                        getFilmsData={getFilmsData}
                        filmsData={filmsData}/>}/>
                </Routes>
            </div>

        </div>
    )


    /*const [searchName, setSearchName] = useState('');
    const [searchResult, setSearchResult] = useState('');
    const [searchNameByType, setSearchNameByType] = useState('');
    const [searchResultByType, setSearchResultByType] = useState('');


    const searchFilm = () => {
      return API.searchFilmsByTitle(searchName)
          .then(data => {
            if (data.Response === 'True') {
              setSearchResult(data)
            } else {
              setSearchResult(data.Error)
            }

          })
    };



    const searchByType = (e: React.MouseEvent<HTMLButtonElement>) => {
      const type: string = e.currentTarget.dataset.t ? e.currentTarget.dataset.t : '';
      API.searchFilmsByType(searchNameByType, type)
    }
    console.log(searchResult)
    return (
        <div>
          <h1>Promises</h1>
          <div>
            <h3><p>Search by name:</p></h3>
            <input type="text" value={searchName} onChange={(e) => setSearchName(e.currentTarget.value)}/>
            <button onClick={searchFilm}>Search</button>

          </div>

          <div>
            <h3><p>Search by type:</p></h3>
            <input type="text" value={searchNameByType}
                   onChange={(e) => setSearchNameByType(e.currentTarget.value)}/>
            <button onClick={searchByType} data-t='movie'>Movie</button>
            <button onClick={searchByType} data-t='series'>Series</button>
            <div>
              {searchResultByType}
            </div>
          </div>
        </div>
    );*/
}

export default App;



