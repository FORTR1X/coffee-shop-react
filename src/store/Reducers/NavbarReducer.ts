import { CategoryType, ProductType, SubcategoryType, UserType } from "../../interfaces/interfaces"

const SET_COMPANY_CATEGORIES = 'SET_COMPANY_CATEGORIES'
const SET_PRODUCT_CATEGORIES = 'SET_PRODUCT_CATEGORIES' 
const SET_PRODUCT_SUBCATEGORIES = 'SET_PRODUCT_SUBCATEGORIES'
const SET_SUBCATEGORIES_BY_CATEGORY = 'SET_SUBCATEGORIES_BY_CATEGORY'
const SET_CART_PRODUCT_LIST = 'SET_CART_PRODUCT_LIST'
const SET_USER = 'SET_USER'
const SET_COUNTS_GOODS_IN_CART = 'SET_COUNTS_GOODS_IN_CART'
const SET_IS_SEARCH_OPEN = 'SET_IS_SEARCH_OPEN'
const SET_HAMBURGER_OPEN = 'SET_HAMBURGER_OPEN'
const SET_IS_CATEGORY_HOVERED = 'SET_IS_CATEGORY_HOVERED'
const SET_IS_CART_OPEN = 'SET_IS_CART_OPEN' 

export type NavbarInitialStateType = {
  companyCategories: Array<string> | null
  productCategories: Array<CategoryType> | null
  productSubcategories: Array<SubcategoryType> | null
  productSubcategoriesByCategory: SubcategoryType[][] | null
  cartProductList: Array<ProductType> | null
  user: UserType | null
  countGoodsInCart: number
  isSearchOpen: boolean | undefined
  isHamburgerOpen: boolean | undefined
  isCategoryHovered: boolean | undefined
  isCartOpen: boolean | undefined
}

let initalState: NavbarInitialStateType = {
  companyCategories: null,
  productCategories: null,
  productSubcategories: null,
  productSubcategoriesByCategory: null,
  cartProductList: null,
  user: null,
  countGoodsInCart: 0,
  isSearchOpen: false,
  isHamburgerOpen: false,
  isCategoryHovered: false,
  isCartOpen: false
}

const navbarReducer = (state = initalState, action: any): NavbarInitialStateType => {
  switch (action.type) {

    case SET_COMPANY_CATEGORIES:
    case SET_PRODUCT_CATEGORIES:  
    case SET_PRODUCT_SUBCATEGORIES:
    case SET_SUBCATEGORIES_BY_CATEGORY:
    case SET_CART_PRODUCT_LIST:
    case SET_USER:  
    case SET_COUNTS_GOODS_IN_CART:
    case SET_IS_SEARCH_OPEN:
    case SET_HAMBURGER_OPEN:
    case SET_IS_CATEGORY_HOVERED:
    case SET_IS_CART_OPEN:       
      return {
        ...state,
        ...action.payload
      }

    default:
      return state

  }
}

type SetCompanyCategoriesActionType = {
  type: typeof SET_COMPANY_CATEGORIES
  payload: Array<string>
}
export const setCompanyCategories = (companyCategories: Array<string>): SetCompanyCategoriesActionType => ({
  type: SET_COMPANY_CATEGORIES,
  payload: companyCategories
})

type SetProductCategoriesActionType = {
  type: typeof SET_PRODUCT_CATEGORIES
  payload: Array<CategoryType> | null
}
export const setProductCategories = (productCategories: Array<CategoryType> | null): SetProductCategoriesActionType => ({
  type: SET_PRODUCT_CATEGORIES,
  payload: productCategories
})

type SetProductSubcategoriesActionType = {
  type: typeof SET_PRODUCT_SUBCATEGORIES
  payload: Array<SubcategoryType> | null
}
export const setProductSubcategories = (productSubcategories: Array<SubcategoryType> | null): SetProductSubcategoriesActionType => ({
  type: SET_PRODUCT_SUBCATEGORIES,
  payload: productSubcategories
})

type SetSubcategoriesByCategoryActionType = {
  type: typeof SET_SUBCATEGORIES_BY_CATEGORY
  payload: SubcategoryType[][] | null
}
export const setSubcategoriesByCategory = (subcategoriesByCategory: SubcategoryType[][] | null): SetSubcategoriesByCategoryActionType => ({
  type: SET_SUBCATEGORIES_BY_CATEGORY,
  payload: subcategoriesByCategory
})

type SetCartProductListActionType = {
  type: typeof SET_CART_PRODUCT_LIST
  payload: Array<ProductType> | null
}
export const setCartProductList = (cartProductList: Array<ProductType> | null): SetCartProductListActionType => ({
  type: SET_CART_PRODUCT_LIST,
  payload: cartProductList
})

type SetUserActionType = {
  type: typeof SET_USER
  payload: UserType | null
}
export const setUser = (user: UserType | null): SetUserActionType => ({
  type: SET_USER,
  payload: user
})

type SetCountGoodsInCartActionType = {
  type: typeof SET_COUNTS_GOODS_IN_CART
  payload: number
}
export const seCountsGoodsInCart = (countsGoodsInCart: number): SetCountGoodsInCartActionType => ({
  type: SET_COUNTS_GOODS_IN_CART,
  payload: countsGoodsInCart
})

type SetIsSearchOpenActionType = {
  type: typeof SET_IS_SEARCH_OPEN
  payload: boolean | undefined
}
export const setIsSearchOpen = (isSearchOpen: boolean | undefined): SetIsSearchOpenActionType => ({
  type: SET_IS_SEARCH_OPEN,
  payload: isSearchOpen
})

type SetHamburgerOpenActionType = {
  type: typeof SET_HAMBURGER_OPEN
  payload: boolean | undefined
}
export const setHamburgerOpen = (isHamburgerOpen: boolean | undefined): SetHamburgerOpenActionType => ({
  type: SET_HAMBURGER_OPEN,
  payload: isHamburgerOpen
})

type SetIsCategoryHoveredActionType = {
  type: typeof SET_IS_CATEGORY_HOVERED
  payload: boolean | undefined
}
export const setIsCategoryHovered = (isCategoryHovered: boolean | undefined): SetIsCategoryHoveredActionType => ({
  type: SET_IS_CATEGORY_HOVERED,
  payload: isCategoryHovered
})

type SetIsCartOpenActionType = {
  type: typeof SET_IS_CART_OPEN
  payload: boolean | undefined
}
export const setIsCartOpen = (isCartOpen: boolean | undefined): SetIsCartOpenActionType => ({
  type: SET_IS_CART_OPEN,
  payload: isCartOpen
})

export default navbarReducer