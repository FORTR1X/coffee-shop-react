import React from "react"

import s from './Checkbox.module.css'

type CheckboxProps = {
    id: string
    title: string
    link?: string
    href?: string
    onChange: () => void
}

const Checkbox: React.FC<CheckboxProps> = (props: CheckboxProps) => {
    return (
        <div className={s.input__wrapper}>

            <input
                className={s.input__checkbox}
                type="checkbox"
                id={props.id}
                onChange={props.onChange}
            />

            <label
                className={s.input__label}
                htmlFor={props.id}
            >
                <div className={s.custom_checkbox}/>
                <div className={s.label__text}>
                    <span>{props.title}</span>
                    <a href={props.href}>{props.link}</a>
                </div>
            </label>
        </div>
    )
}

export default Checkbox