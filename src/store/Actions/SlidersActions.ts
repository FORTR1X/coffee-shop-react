import {ThunkAction} from "@reduxjs/toolkit"
import useApi from "../../hooks/useApi"
import {setBackgroundsList, SlidersActionTypes} from "../Reducers/SlidersReducer"
import {RootState} from "../redux-store"

type AllActionsType = SlidersActionTypes
type ThunkActionType = ThunkAction<Promise<void>, RootState, unknown, AllActionsType>

export const getBackgroundsList = (): ThunkActionType => {
    return async (dispatch, getState) => {
        const response = await useApi("GET", "/stocks")

        if (response.status == 200) {
            dispatch(setBackgroundsList(response.data))
        }
    }
}