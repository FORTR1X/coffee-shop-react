import { ThunkAction } from "@reduxjs/toolkit"
import useApi from "../../hooks/useApi"
import { AdminPanelActionTypes, setProducts } from "../Reducers/AdminPanelReducer"
import { RootState } from "../redux-store"

type AllActionsType = AdminPanelActionTypes
type ThunkActionType = ThunkAction<Promise<void>, RootState, unknown, AllActionsType>

export const getAllProducts = (): ThunkActionType => {
  return async (dispatch, getState) => {
    const token = localStorage.getItem('token')
    
    let response = await useApi('GET', '/all-products', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (response.status == 200) {
      dispatch(setProducts(response.data))
    }
  }
}

export const deleteByIds = (ids: Array<number>): ThunkActionType => {
  return async (dispatch, getState) => {

    const token = localStorage.getItem('token')

    let idListToString = ''
    ids.map((id) => {
      idListToString += `id=${id}&`
    })

    let response = await useApi('DELETE', `/products?${idListToString}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }
}

export const deleteProductById = (id: number): ThunkActionType => {
  return async (dispatch, getState) => {

    const token = localStorage.getItem('token')

    await useApi("DELETE", `/product/id${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }
}