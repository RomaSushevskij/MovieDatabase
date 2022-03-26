import React, {memo} from 'react'
import style from './Preloader.module.css'

type PreloaderPropsType = {
    inLiveSearch?: boolean
}
export const Preloader = memo(({inLiveSearch}: PreloaderPropsType) => {
    const classNameWrapper = inLiveSearch ?
        `${style.preloaderWrapper} ${style.preloaderWrapperInLiveSearch}` :
        style.preloaderWrapper

    return (
        <div className={classNameWrapper}>
            <div className={style.preloaderBody}>

            </div>
        </div>
    )
})