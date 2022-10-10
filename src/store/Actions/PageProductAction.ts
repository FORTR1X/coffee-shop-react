import { ThunkAction } from "@reduxjs/toolkit";
import useApi from "../../hooks/useApi";
import { PageProductActionTypes, setPageProduct, setProductImages } from "../Reducers/PageProductReducer";
import { RootState } from "../redux-store";

type AllActionsType = PageProductActionTypes
type ThunkActionType = ThunkAction<Promise<void>, RootState, unknown, AllActionsType>

export const getPageProducts = (productId: number): ThunkActionType => {
  return async (dispatch, getState) => {
    let response = await useApi('GET', `/product/id${productId}`)
  
    if (response.status == 200) {
      dispatch(setPageProduct(response.data))
    }
  }
}

export const getUrlProductImages = (id: number): ThunkActionType => {
  return async (dispatch, getState) => {
    let response = await useApi('GET', `/upload/product/images-title${id}`)

    if (response.status == 200) {
      dispatch(setProductImages(response.data))
    }
  }
}