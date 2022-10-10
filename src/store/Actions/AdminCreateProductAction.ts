import { ThunkAction } from "@reduxjs/toolkit"
import useApi from "../../hooks/useApi"
import { ProductRequestBodyType } from "../../interfaces/interfaces"
import { AdminCreateProductActionTypes, setCategories, setResponseProduct, setSubcategories } from "../Reducers/AdminCreateProductReducer"
import { RootState } from "../redux-store"

type AllActionsType = AdminCreateProductActionTypes
type ThunkActionType = ThunkAction<Promise<void>, RootState, unknown, AllActionsType>

export const getCategories = (): ThunkActionType => {
  return async (dispatch, getState) => {
    let response = await useApi("GET", "/categories")

    if (response.status == 200) {
      dispatch(setCategories(response.data))
    }
  }
}

export const getSubcategories = (): ThunkActionType => {
  return async (dispatch, getState) => {
    let response = await useApi("GET", "/subcategories")

    if (response.status == 200) {
      dispatch(setSubcategories(response.data))
    }
  }
}

export const createProduct = (requestBody: ProductRequestBodyType): ThunkActionType => {
  return async (dispatch, getState) => {

    const token = localStorage.getItem('token')

    let response = await useApi("POST", "/product", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }, requestBody)

    if (response.status == 201) {
      dispatch(setResponseProduct(response.data))
    }
  }
}

export const createImagesProduct = (id: string, imagesData: FormData): ThunkActionType => {
  return async (dispatch, getState) => {
    
    const token = localStorage.getItem('token')

    await useApi("POST", `/upload/images${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }, imagesData)

  }
}