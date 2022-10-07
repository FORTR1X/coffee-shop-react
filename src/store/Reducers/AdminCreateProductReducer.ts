import { CategoryType, ProductType, SubcategoryType } from "../../interfaces/interfaces"

const SET_CATEGORIES = 'SET_CATEGORIES'
const SET_SUBCATEGORIES = 'SET_SUBCATEGORIES'
const SET_RESPONSE_NEW_PRODUCT = 'SET_RESPONSE_NEW_PRODUCT'

let initialState = {
  categories: [] as Array<CategoryType>,
  subcategories: [] as Array<SubcategoryType>,
  responseProduct: {} as ProductType
}

export type AdminCreateProductInitialStateType = typeof initialState

const adminCreateProductReducer = (state = initialState, action: AdminCreateProductActionTypes): AdminCreateProductInitialStateType => {
  switch (action.type) {

    case SET_CATEGORIES:
      return {
        ...state,
        categories: action.categories
      }

    case SET_SUBCATEGORIES:
      return {
        ...state,
        subcategories: action.subcategories
      }

    case SET_RESPONSE_NEW_PRODUCT:
      return {
        ...state,
        responseProduct: action.responseProduct
      } 

    default:
      return state
  }
}

export type AdminCreateProductActionTypes = SetCategoriesType | SetSubcategoriesType | SetResponseNewProductType

type SetCategoriesType = {
  type: typeof SET_CATEGORIES
  categories: Array<CategoryType>
}
export const setCategories = (categories: Array<CategoryType>): SetCategoriesType => ({
  type: SET_CATEGORIES,
  categories
})

type SetSubcategoriesType = {
  type: typeof SET_SUBCATEGORIES
  subcategories: Array<SubcategoryType>
}
export const setSubcategories = (subcategories: Array<SubcategoryType>): SetSubcategoriesType => ({
  type: SET_SUBCATEGORIES,
  subcategories
})

type SetResponseNewProductType = {
  type: typeof SET_RESPONSE_NEW_PRODUCT
  responseProduct: ProductType
}
export const setResponseProduct = (responseProduct: ProductType): SetResponseNewProductType => ({
  type: SET_RESPONSE_NEW_PRODUCT,
  responseProduct
})

export default adminCreateProductReducer