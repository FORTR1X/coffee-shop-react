import {ThunkAction} from "@reduxjs/toolkit";
import axios from "axios";
import useApi from "../../hooks/useApi";
import {OrderType} from "../../interfaces/interfaces";
import {CheckoutActionTypes, setSuccessOrder, setSuccessValidationToken} from "../Reducers/CheckoutReducer";
import {RootState} from "../redux-store";

type AllActionsType = CheckoutActionTypes
type ThunkActionType = ThunkAction<Promise<void>, RootState, unknown, AllActionsType>

export const confirmCheckoutOrder = (order: OrderType): ThunkActionType => {
    return async (dispatch, getState) => {
        let response = await useApi('POST', `/order-confirm`, {}, order)

        if (response.status == 204) {
            dispatch(setSuccessOrder(true))
        }
    }
}

export const validateReCAPTCHAToken = (token: string): ThunkActionType => {
    return async (dispatch, getState) => {
        let response = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=6Lfu-QciAAAAAC_MzPqs2m8H9b-aEaJ5Aw3ZjxwE&response=${token}`)

        if (response.status == 200) {
            dispatch(setSuccessValidationToken(response.data.success))
        }
    }
}