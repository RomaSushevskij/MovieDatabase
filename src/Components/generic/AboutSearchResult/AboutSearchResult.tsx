import React from 'react'
import style from './AboutSearchResult.module.css'

type AboutSearchResultPropsType = {
    totalFilmsCount: number
    searchedMovieTitle: string
}

export const AboutSearchResult = ({
                                      totalFilmsCount,
                                      searchedMovieTitle
                                  }: AboutSearchResultPropsType) => {
    const resultTitle = <i style={{textTransform: "uppercase"}}>"{searchedMovieTitle}"</i>
    return (
        <div className={style.aboutResultWrapper}>
            <div className={style.container}>
               {totalFilmsCount} answers were found for your request {resultTitle} (Request results 1 - 10) :
            </div>
        </div>
    )
}