import {ThunkAction} from "@reduxjs/toolkit"
import useApi from "../../hooks/useApi"
import {ProductRequestBodyType} from "../../interfaces/interfaces"
import {AdminEditProductActionTypes, setProduct} from "../Reducers/AdminEditProductReducer"
import {RootState} from "../redux-store"

type AllActionsType = AdminEditProductActionTypes
type ThunkActionType = ThunkAction<Promise<void>, RootState, unknown, AllActionsType>

export const getEditableProduct = (id: number): ThunkActionType => {
    return async (dispatch, getState) => {
        let response = await useApi("GET", `/product/id${id}`)

        if (response.status == 200) {
            dispatch(setProduct(response.data))
        }
    }
}

export const updateProductById = (id: number, product: ProductRequestBodyType): ThunkActionType => {
    return async (dispatch, getState) => {

        const token = localStorage.getItem('token')

        let response = await useApi("PUT", `/product/id${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }, product)

    }
}

export const updateProductImageById = (id: number, imagesData: FormData): ThunkActionType => {
    return async (dispatch, getState) => {

        const token = localStorage.getItem('token')

        let response = await useApi("PUT", `/upload/images${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }, imagesData)
    }
}