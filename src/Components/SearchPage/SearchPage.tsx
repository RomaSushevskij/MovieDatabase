import React, {useState} from 'react'
import style from './Content.module.css'
import {FilmPreview} from "../FilmPreview/FilmPreview";

export const Content = (props: any) => {
    const one = {
        "Title": "The Matrix",
        "Year": "1999",
        "imdbID": "tt0133093",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg"
    }
    const two = {
        "Title": "The Matrix Reloaded",
        "Year": "2003",
        "imdbID": "tt0234215",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BODE0MzZhZTgtYzkwYi00YmI5LThlZWYtOWRmNWE5ODk0NzMxXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg"
    }
    const three = {
        "Title": "The Matrix Revolutions",
        "Year": "2003",
        "imdbID": "tt0242653",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BNzNlZTZjMDctZjYwNi00NzljLWIwN2QtZWZmYmJiYzQ0MTk2XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg"
    }


    return (
        <div className={style.wrapper}>
            <div className={style.container}>
                <FilmPreview {...one}/>
                <FilmPreview {...two}/>
                <FilmPreview {...three}/>
            </div>
        </div>
    )
}