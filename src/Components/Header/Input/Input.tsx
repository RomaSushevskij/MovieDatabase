import React, {KeyboardEvent, useState} from 'react'
import style from './Input.module.css'


type InputPropsType = {
    value?: string
    onChange?: (value: string) => void
    onEnter?: (value: string) => void
    placeHolder?: string
}

export const Input = ({
                          onEnter,
                          placeHolder,
                      }: InputPropsType) => {
    const [inputValue, setInputValue] = useState('');
    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        onEnter && e.key === 'Enter' && onEnter(inputValue)
    };

    return (
        <>
            <div className={style.search}>
                <input type="text"
                       placeholder={placeHolder}
                       value={inputValue} onChange={(e) => setInputValue(e.currentTarget.value)}
                       onKeyPress={onKeyPressCallback}/>
                <span></span>
            </div>
        </>
    )
}