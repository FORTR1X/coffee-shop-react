import React from "react"

import s from './Radio.module.css'

type RadioProps = {
  id: string
  name: string
  title: string
  checked?: boolean | undefined
  onClick: (value: string) => void
}

const Radio: React.FC<RadioProps> = (props: RadioProps) => {
  return (
    <div className={s.input__wrapper}>

      <input
        className={s.input__radio}
        type="radio"
        id={props.id}
        value={props.id}
        name={props.name}
        checked={props.checked}
        onClick={(event) => {props.onClick(event.currentTarget.value)}}
      />

      <label
        className={s.input__label}
        htmlFor={props.id}
      >
        <div className={s.custom_radio}/>
        <span>{props.title}</span>
      </label>

    </div>
  )
}

export default Radio