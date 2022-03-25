import style from './FilmPreview.module.css'
import {faCalendar} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";
import {NavLink} from "react-router-dom";
import {DefaultPoster} from "../../generic/DefaultPoster/DefaultPoster";
import {FilmType} from "../../../store/reducers/searchFilmsReducer/searchFilmsReducer";

type FilmPreviewType = FilmType
export const FilmPreview = ({
                                Title,
                                Poster,
                                Year,
                                Type,
                                imdbID,
                            }: FilmPreviewType) => {
    return (
        <div className={style.previewWrapper}>
            <h4>Title: {Title}</h4>
            <div className={style.posterAndDescription}>
                <div className={style.poster}>
                    <NavLink to={`/filmPage/${imdbID}`}>
                        {Poster === "N/A" ? DefaultPoster : <img src={Poster} alt={'Poster'}/>}

                    </NavLink>
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