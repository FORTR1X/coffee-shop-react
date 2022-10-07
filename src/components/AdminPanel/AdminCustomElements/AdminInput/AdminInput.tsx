import React from "react"

import s from './AdminInput.module.css'

type InputTypes = "text" | "password" | "multiple"
type AdminInputProps = {
  title: string
  value: string
  type: InputTypes
  onChange: (value: string) => void
}

const AdminInput: React.FC<AdminInputProps> = (props: AdminInputProps) => {
  return (
    <div className={s.form__container}>
      {(props.type == "text" || props.type == "password") &&
        <>
          <span className={s.form__title}>{props.title}</span>
          <input
            className={s.form__input}
            type={props.type}
            value={props.value}
            onChange={(event) => {props.onChange(event.currentTarget.value)}} 
          />
        </>
      }

      {props.type == "multiple" &&
        <>
          <span className={s.form__title}>{props.title}</span>
          <input
            multiple
            className={s.form__input}
            type={props.type}
            value={props.value}
            onChange={(event) => {props.onChange(event.currentTarget.value)}} 
          />
        </>
      }
    </div>
  )
}

export default AdminInput