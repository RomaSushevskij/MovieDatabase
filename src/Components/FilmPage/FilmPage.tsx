import style from './FilmPage.module.css'
import {
    faArrowLeft,
    faBookOpen,
    faCalendar,
    faEarthAmericas,
    faFilm,
    faHourglass,
    faLanguage,
    faReply,
    faStar
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {useEffect} from "react";
import {PATH} from "../../App";
import {useNavigate, useParams} from 'react-router-dom'
import {DefaultPoster} from "../DefaultPoster/DefaultPoster";


export type FilmItemType = {
    Title: string
    Year: string
    "Runtime": string
    "Genre": string
    "Director": string
    "Actors": string
    "Plot": string
    "Language": string
    "Country": string
    "Poster": string
    "Metascore": string
    "imdbRating": string
    "Response": string
    "imdbID": string
}
type FilmPageType = {
    getFilmsData: (imdbID: string) => void
    filmsData: FilmItemType
}


export const FilmPage = ({
                             filmsData,
                             getFilmsData,
                         }: FilmPageType) => {
    debugger

    let {
        Title,
        Year,
        Runtime,
        Genre,
        Director,
        Actors,
        Plot,
        Language,
        Country,
        Poster,
        Metascore,
        imdbRating,
    } = filmsData
    const params = useParams<'*'>()
    useEffect(() => {
        params["*"] && getFilmsData(params['*'])
    }, [params["*"]])
    const navigate = useNavigate()
    return (
        <div className={style.filmPageWrapper}>
            <div style={{backgroundImage: `url(${Poster})`}} className={style.previewLogo}>
            </div>
            <div className={style.container}>
                <div className={style.posterAndBack}>
                    <div className={style.poster}>
                        {Poster === "Poster" || Poster === "N/A" ? <DefaultPoster/> : <img src={Poster} alt="Poster"/>}

                    </div>
                    <div className={style.toMAinPageButton}>
                        <FontAwesomeIcon icon={faArrowLeft}
                                         className={style.toMAinPageButtonLogo}
                                         onClick={() => navigate(PATH.SEARCH_PAGE)}/>
                    </div>
                </div>
                <div className={style.filmDescription}>
                    <div className={style.title}>
                        <h1>{Title}</h1>
                    </div>
                    {Year !== "N/A" && <div className={style.year}>
                        <FontAwesomeIcon icon={faCalendar}
                                         className={style.descriptionLogo}/>
                        {Year}
                    </div>}
                    {Runtime !== "N/A" && <div className={style.runTime}>
                        <FontAwesomeIcon icon={faHourglass}
                                         className={style.descriptionLogo}/>
                        {Runtime}
                    </div>}
                    {Genre !== "N/A" && <div className={style.genre}>
                        <span className={style.descriptionLogo}>Genre:</span>
                        {Genre}
                    </div>}
                    {Language !== "N/A" && <div className={style.language}>
                        <FontAwesomeIcon icon={faLanguage}
                                         className={style.descriptionLogo}/>
                        {Language}
                    </div>}
                    {Country !== "N/A" && <div className={style.country}>
                        <FontAwesomeIcon icon={faEarthAmericas}
                                         className={style.descriptionLogo}/>
                        {Country}
                    </div>}
                    {Director !== "N/A" && <div className={style.director}>
                        <span className={style.descriptionLogo}>Director:</span>
                        {Director}
                    </div>}
                    {Actors !== "N/A" && <div className={style.actors}>
                        <span className={style.descriptionLogo}>Actors:</span>
                        {Actors}
                    </div>}
                    {Plot !== "N/A" && <div className={style.plot}>
                        <FontAwesomeIcon icon={faBookOpen}
                                         className={style.descriptionLogo}/>
                        {Plot}
                    </div>}
                    {Metascore !== "N/A" && <div className={style.metascore}>
                        <span className={style.descriptionLogo}>Metacritic:</span>
                        <FontAwesomeIcon icon={faStar}
                                         className={style.descriptionLogo}/>
                        {Metascore}
                    </div>}
                    {imdbRating !== "N/A" && <div className={style.imdbRating}>
                        <span className={style.descriptionLogo}>Imdb Rating:</span>
                        <FontAwesomeIcon icon={faStar}
                                         className={style.descriptionLogo}/>
                        {imdbRating}
                    </div>}
                </div>
            </div>
        </div>
    )
}