import React, { useEffect, useRef, useState } from "react"

type AdminCheckboxType = {
  onClickAdd: (id: number) => void
  onClickDelete: (id: number) => void
  value: number
}

const AdminCheckbox: React.FC<AdminCheckboxType> = (props: AdminCheckboxType) => {

  const inputRef = useRef<HTMLInputElement>(null)

  const handleAddOrDeleteFromSelected = () => {
    if (inputRef.current !== null) {
      if (inputRef.current.checked) {
        props.onClickAdd(props.value)
      } else {
        props.onClickDelete(props.value)
      }
    }
  }

  return (
    <input
      ref={inputRef}
      type="checkbox"
      onClick={handleAddOrDeleteFromSelected}
      // onClick={() => {props.onChangeChecked()}}
    />
  )
}

export default AdminCheckbox