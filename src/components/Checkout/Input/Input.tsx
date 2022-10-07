import { spawn } from "child_process"
import React, { useEffect, useState } from "react"

import s from './Input.module.css'

type InputPropsType = {
  type: string
  placeholder: string
  title: string
  required: boolean
  value: string
  fullWidth?: boolean | undefined
  multiple: boolean
  onChangeHandle: (value: string) => void
}

const Input: React.FC<InputPropsType> = (props: InputPropsType) => {

  const TITLE = props.title
  const INPUT_TYPE = props.type
  const PLACEHOLDER = props.placeholder
  const VALUE = props.value
  const IS_REQUIRED_FIELD = props.required

  const [isPrimaryState, setIsPrimaryState] = useState(true)
  useEffect(() => {
    if (isPrimaryState && VALUE.length > 0)
      setIsPrimaryState(false)

  }, [VALUE])

  const IS_MISSING_REQUIRED_FIELD = VALUE.length == 0 && IS_REQUIRED_FIELD && isPrimaryState == false
  const FIELD_STYLE = IS_MISSING_REQUIRED_FIELD ? `${s.input__wrapper} ${s.error}` : s.input__wrapper

  return (
    <div
      style={props.fullWidth ? {'width': '100%'} : {}}
      className={FIELD_STYLE}
    >
      
      <span className={s.input__title}>
        {TITLE}
        {IS_REQUIRED_FIELD ? <span className={s.required_field}>*</span> : <></>}
      </span>

      {!props.multiple && INPUT_TYPE == "text" &&
        <input
          className={s.input__input}
          type={INPUT_TYPE}
          placeholder={PLACEHOLDER}
          value={VALUE}
          onChange={(event) => {props.onChangeHandle(event.currentTarget.value)}}
        />
      }

      {props.multiple &&
        <textarea
          className={s.input__area}
          placeholder={PLACEHOLDER}
          value={VALUE}
          onChange={(event) => {props.onChangeHandle(event.currentTarget.value)}}
        />
      }
    </div>  
  )
}

export default Input