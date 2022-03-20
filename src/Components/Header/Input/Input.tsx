import React, {useState} from 'react'
import style from './Input.module.css'

type InputPropsType = {
    value: string
    onChange: (value: string) => void
}

export const Input = ({
                          value,
                          onChange
                      }: InputPropsType) => {

    return (
        <>
            <div className={style.search}>
                <input type="text"
                       placeholder="Movie search"
                       value={value} onChange={(e) => onChange(e.currentTarget.value)}/>
                <span></span>
            </div>
        </>
    )
}