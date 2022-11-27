import React, {useState} from "react"
import AdminInput from "../AdminCustomElements/AdminInput/AdminInput"

import s from './AdminOAuth.module.css'
import {PropsAdminOAuthContainer} from "./AdminOAuthContainer"

const AdminOAuth: React.FC<PropsAdminOAuthContainer> = (props: PropsAdminOAuthContainer) => {

    const [loginValue, setLoginValue] = useState('')
    const handleOnChangeLoginValue = (value: string) => {
        setLoginValue(value)
    }

    const [passwordValue, setPasswordValue] = useState('')
    const handleOnChangePasswordValue = (value: string) => {
        setPasswordValue(value)
    }

    const handleOnSumbit = () => {
        props.getAuthToken(loginValue, passwordValue)
    }

    return (
        <>
            <div className={s.header__container}>
                <div>
                    <span className={s.header__marvels_shop}>MARVELS SHOP |</span>
                    <span className={s.header__admin_panel}>ADMIN PANEL</span>
                </div>

                <div className={s.header__underline}/>
            </div>

            <div className={s.auth__container}>
                <h3 className={s.auth__header}>Авторизация</h3>
                <div>
                    <AdminInput
                        title="Логин"
                        type={"text"}
                        value={loginValue}
                        onChange={handleOnChangeLoginValue}
                    />

                    <AdminInput
                        title="Пароль"
                        type={"password"}
                        value={passwordValue}
                        onChange={handleOnChangePasswordValue}
                    />

                    <button
                        onClick={handleOnSumbit}
                        className={s.btn__submit}
                        type={"button"}
                    >
                        Войти
                    </button>
                </div>
            </div>
        </>
    )
}

export default AdminOAuth