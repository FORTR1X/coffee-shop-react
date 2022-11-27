import React, {useEffect, useState} from "react"
import {useLocalStorage} from "usehooks-ts"
import {PropsOAuth} from "./OAuthContainer"

const OAuth: React.FC<PropsOAuth> = (props: PropsOAuth) => {

    const token = localStorage.getItem('token')
    const refreshToken = localStorage.getItem('refresh-token')

    useEffect(() => {

        if (token !== null && token.length > 0 && !props.failedRequest && !props.isAuth) {
            props.checkIsAuthToken(token)
        }

        if (props.failedRequest && !props.isAuth) {
            props.setTokenAndRefreshToken('', '')
            localStorage.setItem('token', '')
            localStorage.setItem('refresh-token', '')
        }
    }, [token, props.token, props.isAuth, props.failedRequest])

    return (
        <>
        </>
    )
}

export default OAuth