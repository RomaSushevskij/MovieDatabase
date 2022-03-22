import style from './DefaultPoster.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFilm} from "@fortawesome/free-solid-svg-icons";

export const DefaultPoster = () => {
    return (
        <div className={style.defaultPosterWrapper}>
            <FontAwesomeIcon icon={faFilm}
                             className={style.posterLogo}/>
        </div>
    )
}