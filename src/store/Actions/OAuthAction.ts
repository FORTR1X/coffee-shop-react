import { ThunkAction } from "@reduxjs/toolkit"
import axios from "axios"
import { OAuthActionTypes, setFailedRequest, setIsAuth, setTokenAndRefreshToken } from "../Reducers/OAuthReducer"
import { RootState } from "../redux-store"

type AllActionsType = OAuthActionTypes
type ThunkActionType = ThunkAction<Promise<void>, RootState, unknown, AllActionsType>

export const getAuthToken = (login: string, password: string): ThunkActionType => {
  return async (dispatch, getState) => {
    let response = await axios.post('http://localhost:8080/oauth/token', `grant_type=password&scope=admin&username=${login}&password=${password}&client_id=coffee-client&client_secret=zxc`, {
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:3000'
      }
    })

    if (response.status == 200) {
      localStorage.setItem('token', response.data.access_token)
      localStorage.setItem('refresh-token', response.data.refresh_token)
      dispatch(setTokenAndRefreshToken(response.data.refresh_token, response.data.access_token))
    } else {
      dispatch(setFailedRequest(true))
    }
  }
}

export const checkIsAuthToken = (token: string): ThunkActionType => {
  return async (dispatch, getState) => {
    axios.post(`http://localhost:8080/oauth/check_token?token=${token}`).then(
      (response) => {
        if (response.status == 200) {
          dispatch(setFailedRequest(false))
          dispatch(setIsAuth(true))
        }
      }
    ).catch((reason) => {
      dispatch(setFailedRequest(true))
      dispatch(setIsAuth(false))
    })
  }
}