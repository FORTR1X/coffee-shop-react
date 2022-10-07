import React from "react"

import s from './AdminTableInput.module.css'

type AdminTableInputProps = {
  title: string
  value: string
  onChange: (value: string) => void
}

const AdminTableInput: React.FC<AdminTableInputProps> = (props: AdminTableInputProps) => {
  return (
    <div className={s.form}>
      <div className={s.form__title_container}>
        <span className={s.form__title}>{props.title}</span>
      </div>

      <input
        onChange={(event) => {props.onChange(event.currentTarget.value)}}
        className={s.form__input}
        type="text"
        value={props.value}
      />
    </div>
  )
}

export default AdminTableInput