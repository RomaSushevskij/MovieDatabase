import style from './HomePage.module.css'
import React, {memo} from "react";

export const HomePage = memo(() => {
    return (
        <div className={style.homePageWrapper}>
            <div className={style.container}>
                <div className={style.homePageLogo}>
                </div>
                <div className={style.description}>
                    Simple web app <br/> to obtain movie <br/> information
                </div>
            </div>
        </div>
    )
})