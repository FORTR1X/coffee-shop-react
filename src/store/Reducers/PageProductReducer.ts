import { ProductType } from "../../interfaces/interfaces"

const SET_PRODUCT = 'SET_PRODUCT'

let initialState = {
  product: null as ProductType | null
}

export type PageProductType = typeof initialState

const pageProductReducer = (state = initialState, action: PageProductActionTypes) => {
  switch (action.type) {

    case SET_PRODUCT:
      return {
        ...state,
        product: action.product
      }

    default:
      return state
  }
}

export type PageProductActionTypes = SetProductActionType;

type SetProductActionType = {
  type: typeof SET_PRODUCT
  product: ProductType | null
}
export const setPageProduct = (product: ProductType | null): SetProductActionType => ({
  type: SET_PRODUCT,
  product
})

export default pageProductReducer