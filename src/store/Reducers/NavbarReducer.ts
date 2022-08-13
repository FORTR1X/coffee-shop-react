import { CategoryType, CompanyCategoryType, ProductType, SubcategoryType, UserType } from "../../interfaces/interfaces"

const SET_COMPANY_CATEGORIES = 'SET_COMPANY_CATEGORIES'
const SET_PRODUCT_CATEGORIES = 'SET_PRODUCT_CATEGORIES' 
const SET_PRODUCT_SUBCATEGORIES = 'SET_PRODUCT_SUBCATEGORIES'
const SET_SUBCATEGORIES_BY_CATEGORY = 'SET_SUBCATEGORIES_BY_CATEGORY'
const SET_CART_PRODUCT_LIST = 'SET_CART_PRODUCT_LIST'
const SET_USER = 'SET_USER'
const SET_COUNTS_GOODS_IN_CART = 'SET_COUNTS_GOODS_IN_CART'
const SET_CURRENT_SELECTED_CATEGORY = 'SET_CURRENT_SELECTED_CATEGORY'
const SET_IS_SEARCH_OPEN = 'SET_IS_SEARCH_OPEN'
const SET_HAMBURGER_OPEN = 'SET_HAMBURGER_OPEN'
const SET_IS_CATEGORY_HOVERED = 'SET_IS_CATEGORY_HOVERED'
const SET_IS_CART_OPEN = 'SET_IS_CART_OPEN'

let initialState = {
  companyCategories: null as Array<CompanyCategoryType> | null,
  productCategories: null as Array<CategoryType> | null,
  productSubcategories: null as Array<SubcategoryType> | null,
  productSubcategoriesByCategory: [] as SubcategoryType[][] | null,
  cartProductList: null as Array<ProductType> | null,
  user: null as UserType | null,
  countGoodsInCart: 0,
  currentSelectedCategory: null as CategoryType | null,
  isSearchOpen: false as boolean | undefined,
  isHamburgerOpen: false as boolean | undefined,
  isCategoryHovered: false as boolean | undefined,
  isCartOpen: false as boolean | undefined
}

export type NavbarInitialStateType = typeof initialState

const navbarReducer = (state = initialState, action: NavbarActionTypes): NavbarInitialStateType => {
  switch (action.type) {

    case SET_COMPANY_CATEGORIES:
      return {
        ...state,
        companyCategories: action.companyCategories
      }

    case SET_PRODUCT_CATEGORIES:
      return {
        ...state,
        productCategories: action.productCategories
      }

    case SET_PRODUCT_SUBCATEGORIES:
      return {
        ...state,
        productSubcategories: action.productSubcategories
      }

    case SET_SUBCATEGORIES_BY_CATEGORY:
      return {
        ...state,
        productSubcategoriesByCategory: action.subcategoriesByCategory
      }

    case SET_CART_PRODUCT_LIST:
      return {
        ...state,
        cartProductList: action.cartProductList
      }

    case SET_USER:
      return {
        ...state,
        user: action.user
      }

    case SET_COUNTS_GOODS_IN_CART:
      return {
        ...state,
        countGoodsInCart: action.countsGoodsInCart
      }

    case SET_CURRENT_SELECTED_CATEGORY:
      return {
        ...state,
        currentSelectedCategory: action.currentSelectedCategory
      }   

    case SET_IS_SEARCH_OPEN:
      return {
        ...state,
        isSearchOpen: action.isSearchOpen
      }

    case SET_HAMBURGER_OPEN:
      return {
        ...state,
        isHamburgerOpen: action.isHamburgerOpen
      }

    case SET_IS_CATEGORY_HOVERED:
      return {
        ...state,
        isCategoryHovered: action.isCategoryHovered
      }

    case SET_IS_CART_OPEN:       
      return {
        ...state,
        isCartOpen: action.isCartOpen
      }

    default:
      return state

  }
}

export type NavbarActionTypes = SetCompanyCategoriesActionType | SetProductCategoriesActionType | SetProductSubcategoriesActionType |
  SetSubcategoriesByCategoryActionType | SetCartProductListActionType | SetUserActionType | SetCountGoodsInCartActionType |
  SetIsSearchOpenActionType | SetHamburgerOpenActionType | SetIsCategoryHoveredActionType | SetIsCartOpenActionType | SetCurrentSelectedCategory

type SetCompanyCategoriesActionType = {
  type: typeof SET_COMPANY_CATEGORIES
  companyCategories: Array<CompanyCategoryType> | null
}
export const setCompanyCategories = (companyCategories: Array<CompanyCategoryType> | null): SetCompanyCategoriesActionType => ({
  type: SET_COMPANY_CATEGORIES,
  companyCategories
})

type SetProductCategoriesActionType = {
  type: typeof SET_PRODUCT_CATEGORIES
  productCategories: Array<CategoryType> | null
}
export const setProductCategories = (productCategories: Array<CategoryType> | null): SetProductCategoriesActionType => ({
  type: SET_PRODUCT_CATEGORIES,
  productCategories
})

type SetProductSubcategoriesActionType = {
  type: typeof SET_PRODUCT_SUBCATEGORIES
  productSubcategories: Array<SubcategoryType> | null
}
export const setProductSubcategories = (productSubcategories: Array<SubcategoryType> | null): SetProductSubcategoriesActionType => ({
  type: SET_PRODUCT_SUBCATEGORIES,
  productSubcategories
})

type SetSubcategoriesByCategoryActionType = {
  type: typeof SET_SUBCATEGORIES_BY_CATEGORY
  subcategoriesByCategory: SubcategoryType[][] | null
}
export const setSubcategoriesByCategory = (subcategoriesByCategory: SubcategoryType[][] | null): SetSubcategoriesByCategoryActionType => ({
  type: SET_SUBCATEGORIES_BY_CATEGORY,
  subcategoriesByCategory
})

type SetCartProductListActionType = {
  type: typeof SET_CART_PRODUCT_LIST
  cartProductList: Array<ProductType> | null
}
export const setCartProductList = (cartProductList: Array<ProductType> | null): SetCartProductListActionType => ({
  type: SET_CART_PRODUCT_LIST,
  cartProductList
})

type SetUserActionType = {
  type: typeof SET_USER
  user: UserType | null
}
export const setUser = (user: UserType | null): SetUserActionType => ({
  type: SET_USER,
  user
})

type SetCountGoodsInCartActionType = {
  type: typeof SET_COUNTS_GOODS_IN_CART
  countsGoodsInCart: number
}
export const seCountsGoodsInCart = (countsGoodsInCart: number): SetCountGoodsInCartActionType => ({
  type: SET_COUNTS_GOODS_IN_CART,
  countsGoodsInCart
})

type SetCurrentSelectedCategory = {
  type: typeof SET_CURRENT_SELECTED_CATEGORY
  currentSelectedCategory: CategoryType | null
}
export const setCurrentSelectedCategory = (currentSelectedCategory: CategoryType | null): SetCurrentSelectedCategory => ({
  type: SET_CURRENT_SELECTED_CATEGORY,
  currentSelectedCategory
})

type SetIsSearchOpenActionType = {
  type: typeof SET_IS_SEARCH_OPEN
  isSearchOpen: boolean | undefined
}
export const setIsSearchOpen = (isSearchOpen: boolean | undefined): SetIsSearchOpenActionType => ({
  type: SET_IS_SEARCH_OPEN,
  isSearchOpen
})

type SetHamburgerOpenActionType = {
  type: typeof SET_HAMBURGER_OPEN
  isHamburgerOpen: boolean | undefined
}
export const setHamburgerOpen = (isHamburgerOpen: boolean | undefined): SetHamburgerOpenActionType => ({
  type: SET_HAMBURGER_OPEN,
  isHamburgerOpen
})

type SetIsCartOpenActionType = {
  type: typeof SET_IS_CART_OPEN
  isCartOpen: boolean | undefined
}
export const setIsCartOpen = (isCartOpen: boolean | undefined): SetIsCartOpenActionType => ({
  type: SET_IS_CART_OPEN,
  isCartOpen
})

type SetIsCategoryHoveredActionType = {
  type: typeof SET_IS_CATEGORY_HOVERED
  isCategoryHovered: boolean | undefined
}
export const setIsCategoryHovered = (isCategoryHovered: boolean | undefined): SetIsCategoryHoveredActionType => ({
  type: SET_IS_CATEGORY_HOVERED,
  isCategoryHovered
})

export default navbarReducer