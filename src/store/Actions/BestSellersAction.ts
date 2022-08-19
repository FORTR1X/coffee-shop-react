import { ThunkAction } from "@reduxjs/toolkit";
import useApi from "../../hooks/useApi";
import { BestSellersActionTypes, setBestSellersList } from "../Reducers/BestSellersReducer";
import { RootState } from "../redux-store";

type AllActionsType = BestSellersActionTypes
type ThunkActionType = ThunkAction<Promise<void>, RootState, unknown, AllActionsType>

export const getBestSellersList = (): ThunkActionType => {
  return async (dispatch, getState) => {
    let response = await useApi('GET', '/best-sellers')

    if (response.status == 200) {
      dispatch(setBestSellersList(response.data))
    }
  }
}