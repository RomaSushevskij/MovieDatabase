import style from './FilmPreview.module.css'
import {faCalendar, faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";

type FilmPreview = {
    Title: string
    Poster: string
    Year: string
    Type: string
    imdbID: string
}
export const FilmPreview = ({
                                Title,
                                Poster,
                                Year,
                                Type,
                                imdbID,
                            }: FilmPreview) => {
    return (
        <div className={style.previewWrapper}>
            <h4>Title: {Title}</h4>
            <div className={style.posterAndDescription}>
                <div className={style.poster}>
                    <img src={Poster}/>
                </div>
                <div>
                    <div className={style.description}>
                        <div className={style.year}>
                            <FontAwesomeIcon icon={faCalendar}
                                             className={style.yearLogo}/>
                            {Year}
                        </div>
                        <div className={style.type}>Type: {Type}</div>
                        <div className={style.imdbID}>IMDB ID: {imdbID}</div>
                    </div>

                </div>
            </div>

        </div>
    )
}