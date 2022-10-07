import { ProductType } from "../../interfaces/interfaces"

const SET_EDITABLE_PRODUCT = 'SET_EDITABLE_PRODUCT'

let initialState = {
  product: {} as ProductType
}

export type AdminEditProductInitialStateType = typeof initialState

const adminEditProductReducer = (state = initialState, action: AdminEditProductActionTypes): AdminEditProductInitialStateType => {
  switch (action.type) {
    
    case SET_EDITABLE_PRODUCT:
      return {
        ...state,
        product: action.product
      }

    default:
      return state
  }
}

export type AdminEditProductActionTypes = SetProductType

type SetProductType = {
  type: typeof SET_EDITABLE_PRODUCT
  product: ProductType
}
export const setProduct = (product: ProductType): SetProductType => ({
  type: SET_EDITABLE_PRODUCT,
  product
})

export default adminEditProductReducer