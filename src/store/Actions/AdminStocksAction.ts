import {ThunkAction} from "@reduxjs/toolkit"
import useApi from "../../hooks/useApi"
import {AdminStocksActionType, setDefaultTitleImages, setTitleImages} from "../Reducers/AdminStocksReducer"
import {RootState} from "../redux-store"

type AllActionsType = AdminStocksActionType
type ThunkActionType = ThunkAction<Promise<void>, RootState, unknown, AllActionsType>

export const getStocks = (): ThunkActionType => {
    return async (dispatch, getState) => {
        const token = localStorage.getItem('token')

        let response = await useApi("GET", "/stocks", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if (response.status == 200) {
            let titleImageIds: Array<string> = []
            response.data.map((title: string) => {
                const productId: string = parseInt(title).toString()
                titleImageIds.push(productId == "NaN" ? "" : productId)
            })

            dispatch(setTitleImages(titleImageIds))
            dispatch(setDefaultTitleImages(titleImageIds))
        }
    }
}

export const addPhotoStock = (id: number, imagesData: FormData): ThunkActionType => {
    return async (dispatch, getState) => {
        const token = localStorage.getItem('token')

        let response = await useApi("POST", `/stock/id${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }, imagesData)

        if (response.status == 200) {
            dispatch(setTitleImages(response.data))
        }
    }
}

export const deletePhotoStock = (id: number): ThunkActionType => {
    return async (dispatch, getState) => {
        const token = localStorage.getItem('token')

        let response = await useApi("DELETE", `/stock/id${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if (response.status == 200) {
            dispatch(setTitleImages(response.data))
        }
    }
}

export const editIdStock = (prevId: string, newId: string): ThunkActionType => {
    return async (dispatch, getState) => {
        const token = localStorage.getItem('token')

        let response = await useApi("PUT", `/stock/prev-id${prevId}/new-id${newId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if (response.status == 200) console.log("успешно")
    }
}

export const editPhotoStock = (id: number, imagesData: FormData): ThunkActionType => {
    return async (dispatch, getState) => {
        const token = localStorage.getItem('token')

        let response = await useApi("PUT", `/stock/id${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }, imagesData)

        if (response.status == 200) {
            dispatch(setTitleImages(response.data))
        }
    }
}