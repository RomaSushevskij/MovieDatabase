import style from './LiveSearchFilmItem.module.css'
import {faFilm} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {MouseEventHandler} from "react";
import {NavLink} from "react-router-dom";
import {FilmType} from "../../../../store/reducers/searchFilmsReducer/searchFilmsReducer";

type FilmPreviewType =
    FilmType &
    {onClickItem:(e:React.MouseEvent<HTMLDivElement>) => void}
export const LiveSearchFilmItem = ({
                                       Title,
                                       Poster,
                                       imdbID,
                                       onClickItem,
                                   }: FilmPreviewType) => {
    const defaultPoster = <FontAwesomeIcon icon={faFilm} className={style.posterLogo}/>
    return (
        <NavLink to={`/filmPage/${imdbID}`}>
            <div onClick={onClickItem} className={style.liveSearchFilmWrapper}>
                <div className={style.poster}>

                    {Poster === "N/A" ? defaultPoster :
                        <img src={Poster} alt={'Poster'}/>}

                </div>
                <h5>Title: {Title}</h5>
            </div>
        </NavLink>
    )
}

