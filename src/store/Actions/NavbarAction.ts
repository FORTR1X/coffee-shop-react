import { ThunkAction } from "@reduxjs/toolkit"
import useApi from "../../hooks/useApi"
import { NavbarActionTypes, setCompanyCategories, setProductCategories, setProductSubcategories, setSubcategoriesByCategory, setUser } from "../Reducers/NavbarReducer"
import { RootState } from "../redux-store"

type ThunkActionType = ThunkAction<Promise<void>, RootState, unknown, NavbarActionTypes>

export const getCompanyCategories = (): ThunkActionType => {
  return async (dispatch, getState) => {
    let response = await useApi('GET', '/company-category')

    dispatch(setCompanyCategories(response.data))
  }
}

export const getProductCategories = (): ThunkActionType => {
  return async (dispatch, getState) => {
    let response = await useApi('GET', '/categories')

    dispatch(setProductCategories(response.data))
  }
}

export const getProductSubcategories = (categoryId: number): ThunkAction<Promise<any>, RootState, unknown, NavbarActionTypes> => {
  return async (dispatch, getState) => {
    let response = useApi('GET', `/category/id${categoryId}/subcategories`)
    
    dispatch(setProductSubcategories((await response).data))
    return (await response).data
  }
}

export const getUser = (userId?: number): ThunkActionType => {
  return async (dispatch, getState) => {
    let response = await useApi('GET', userId == undefined ? '/admin' : `/user/id${userId}`)
  
    dispatch(setUser(response.data))
  }
}