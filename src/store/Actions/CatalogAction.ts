import {ThunkAction} from "@reduxjs/toolkit";
import {DEFAULT_LIMIT} from "../../components/Catalog/Catalog";
import useApi from "../../hooks/useApi";
import {CatalogActionTypes, setCatalogProductList, setProductTotalCount} from "../Reducers/CatalogReducer";
import {RootState} from "../redux-store";

type AllActionsType = CatalogActionTypes
export type CatalogThunkActionType = ThunkAction<Promise<void>, RootState, unknown, AllActionsType>

export type CatalogProductListPropsType = {
    subcatId: number
    priceFrom: string | null
    priceTo: string | null
    page: string | null
    sort: string | null
}

export const getCatalogProductList = (searchParams: CatalogProductListPropsType): CatalogThunkActionType => {
    return async (dispatch, getState) => {

        const subcatId = searchParams.subcatId
        const priceFrom = getValueStringIfExist(searchParams.priceFrom)
        const priceTo = getValueStringIfExist(searchParams.priceTo)
        const limit = DEFAULT_LIMIT
        const page = getValueStringIfExist(searchParams.page)
        const sort = getValueStringIfExist(searchParams.sort)

        let response = await useApi('GET', `/products?subcatId=${subcatId}&price-from=${priceFrom}&price-to=${priceTo}&limit=${limit}&page=${page}&sort=${sort}`)

        if (response.status == 200) {
            dispatch(setCatalogProductList(response.data))
        }
    }
}

const getValueStringIfExist = (str: string | null): string => {
    return str == null ? '' : str
}

export const getProductTotalCount = (subcatId: number): CatalogThunkActionType => {
    return async (dispatch, getState) => {
        let response = await useApi('GET', `/products/subcat-id${subcatId}/count`)

        if (response.status == 200) {
            dispatch(setProductTotalCount(response.data))
        }
    }
}