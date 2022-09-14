import { ProductType } from "../../interfaces/interfaces"

const SET_SEARCH_PRODUCTS = 'SET_SEARCH_PRODUCTS'
const SET_RESPONSE_STATUS = 'SET_RESPONSE_STATUS'

let initialState = {
  searchProducts: [] as Array<ProductType>,
  responseStatus: 0
}

export type SearcInitialState = typeof initialState
const searchReducer = (state = initialState, action: SearchActionTypes): SearcInitialState => {
  switch (action.type) {
    
    case SET_SEARCH_PRODUCTS:
      return {
        ...state,
        searchProducts: action.searchProducts
      }

    case SET_RESPONSE_STATUS: 
      return {
        ...state,
        responseStatus: action.responseStatus
      }

    default:
      return state
  }
}

export type SearchActionTypes = SetSearchProductsType | SetResponseStatusType
type SetSearchProductsType = {
  type: typeof SET_SEARCH_PRODUCTS
  searchProducts: Array<ProductType>
}
export const setSearchProducts = (searchProducts: Array<ProductType>): SetSearchProductsType => ({
  type: SET_SEARCH_PRODUCTS,
  searchProducts
})

type SetResponseStatusType = {
  type: typeof SET_RESPONSE_STATUS
  responseStatus: number
}
export const setResponseStatus = (responseStatus: number): SetResponseStatusType => ({
  type: SET_RESPONSE_STATUS,
  responseStatus
})

export default searchReducer