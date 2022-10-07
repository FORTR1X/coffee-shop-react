import React from "react"

import s from './AdminHeader.module.css'

const AdminHeader = () => {
  return (
    <div className={s.header__container}>
      
      <div>
        <span className={s.header__marvels_shop}>MARVELS SHOP |</span>
        <span className={s.header__admin_panel}>ADMIN PANEL</span>
      </div>

      <div className={s.header__underline}/>
    </div>
  )
}

export default AdminHeader