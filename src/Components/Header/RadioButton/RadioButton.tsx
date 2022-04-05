import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, memo} from 'react'
import style from './RadioButton.module.css'

type DefaultRadioPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type RadioButtonPropsType = DefaultRadioPropsType & {
    options?: any[]
    onChangeOption?: (option: any) => void
}

const RadioButton: React.FC<RadioButtonPropsType> = memo((
    {
        type, name,
        options, value,
        onChange, onChangeOption,
        ...restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e)
        onChangeOption && onChangeOption(e.currentTarget.value)
    }
    const mappedOptions: any[] = options ? options.map((o, i) => (
        <label className={style.lRadio} key={name + '-' + i}>
            <input type="radio"
                   name={name}
                   checked={o === value}
                   value={o}
                   onChange={onChangeCallback}/>
            <span style={{color: `${o === value ? '#fc2f70' : '#9F9F9F'}`}}>{o}</span>
        </label>
    )) : []

    return (
        <>
            {mappedOptions}
        </>
    )
})

export default RadioButton
