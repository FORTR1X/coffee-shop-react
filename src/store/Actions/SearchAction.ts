import {ThunkAction} from "@reduxjs/toolkit"
import useApi from "../../hooks/useApi"
import {SearchActionTypes, setResponseStatus, setSearchProducts} from "../Reducers/SearchReducer"
import {RootState} from "../redux-store"

type AllActionsType = SearchActionTypes
type ThunkActionType = ThunkAction<Promise<void>, RootState, unknown, AllActionsType>

export const getSearchProducts = (headerOrDescriptionSearch: string): ThunkActionType => {
    return async (dispatch, getState) => {
        let response = await useApi('GET', `/search?q=${headerOrDescriptionSearch}`)

        dispatch(setResponseStatus(response.status))

        if (response.status == 200) {
            dispatch(setSearchProducts(response.data))
        }
    }
}