import React from 'react'
import style from './SearchError.module.css'
import {faTriangleExclamation} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export type MovieNotFoundType = {
    searchError: string
}
export const SearchError = ({searchError}: MovieNotFoundType) => {
    return (
        <div className={style.errorWrapper}>
            <FontAwesomeIcon icon={faTriangleExclamation}
                             className={style.errorLogo}/>
            {searchError}
        </div>
    )
}