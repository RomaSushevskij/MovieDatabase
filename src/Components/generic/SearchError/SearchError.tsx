import React from 'react'
import style from './SearchError.module.css'
import {faTriangleExclamation} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export type MovieNotFoundType = {
    searchError: string
    inLiveSearch?:boolean

}
export const SearchError = ({searchError,
                                inLiveSearch}: MovieNotFoundType) => {
    const classNameWrapper = inLiveSearch ?
        `${style.errorWrapper} ${style.errorWrapperInLiveSearch}` :
        style.errorWrapper
    return (
        <div className={classNameWrapper}>
            <FontAwesomeIcon icon={faTriangleExclamation}
                             className={style.errorLogo}/>
            {searchError}
        </div>
    )
}