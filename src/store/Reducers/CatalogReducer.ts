import { ProductType } from "../../interfaces/interfaces"

const SET_CATALOG_PRODUCT_LIST = 'SET_CATALOG_PRODUCT_LIST'
const SET_PRODUCT_TOTAL_COUNT = 'SET_PRODUCT_TOTAL_COUNT'

let initialState = {
  productList: null as Array<ProductType> | null,

  productTotalCount: 0,
}

export type CatalogInitialStateType = typeof initialState

const catalogReducer = (state = initialState, action: CatalogActionTypes): CatalogInitialStateType => {
  switch (action.type) {
    
    case SET_CATALOG_PRODUCT_LIST:
      return {
        ...state,
        productList: action.productList 
      }

    case SET_PRODUCT_TOTAL_COUNT:
      return {
        ...state,
        productTotalCount: action.productTotalCount
      }

    default: 
      return state
  }
}

export type CatalogActionTypes = SetCatalogProductList | SetProductTotalCount

type SetCatalogProductList = {
  type: typeof SET_CATALOG_PRODUCT_LIST
  productList: Array<ProductType> | null
}
export const setCatalogProductList = (productList: Array<ProductType> | null): SetCatalogProductList => ({
  type: SET_CATALOG_PRODUCT_LIST,
  productList
})

type SetProductTotalCount = {
  type: typeof SET_PRODUCT_TOTAL_COUNT
  productTotalCount: number
}
export const setProductTotalCount = (productTotalCount: number): SetProductTotalCount => ({
  type: SET_PRODUCT_TOTAL_COUNT,
  productTotalCount
})

export default catalogReducer