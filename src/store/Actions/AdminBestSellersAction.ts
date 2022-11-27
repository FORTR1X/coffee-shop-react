import {ThunkAction} from "@reduxjs/toolkit"
import useApi from "../../hooks/useApi"
import {AdminBestSellersActionTypes, setBestSellers} from "../Reducers/AdminBestSellersReducer"
import {RootState} from "../redux-store"

type AllActionsType = AdminBestSellersActionTypes
type ThunkActionType = ThunkAction<Promise<void>, RootState, unknown, AllActionsType>

export const getBestSellers = (): ThunkActionType => {
    return async (dispatch, getState) => {
        let response = await useApi("GET", "/best-sellers")

        if (response.status == 200) {
            dispatch(setBestSellers(response.data))
        }
    }
}

export const addProductToBestSellers = (id: number): ThunkActionType => {
    return async (dispatch, getState) => {

        const token = localStorage.getItem('token')

        let response = await useApi("POST", `/best-sellers/id${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if (response.status == 200) {
            dispatch(setBestSellers(response.data))
        } else {

        }
    }
}

export const deleteProductFromBestSellers = (id: number): ThunkActionType => {
    return async (dispatch, getState) => {

        const token = localStorage.getItem('token')

        let response = await useApi("DELETE", `/best-sellers/id${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if (response.status == 200) {
            dispatch(setBestSellers(response.data))
        }
    }
}