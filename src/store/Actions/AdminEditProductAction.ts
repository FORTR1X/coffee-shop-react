import { ThunkAction } from "@reduxjs/toolkit"
import useApi from "../../hooks/useApi"
import { AdminEditProductActionTypes, setProduct } from "../Reducers/AdminEditProductReducer"
import { RootState } from "../redux-store"

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