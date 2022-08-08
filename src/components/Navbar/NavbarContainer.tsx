import React from "react"
import { connect } from "react-redux"
import { getCompanyCategories, getProductCategories, getProductSubcategories } from "../../store/Actions/NavbarAction"
import { RootState } from "../../store/redux-store"
import Navbar from "./Navbar"
import { CategoryType, ProductType, SubcategoryType, UserType } from "../../interfaces/interfaces"

type MapStatePropsType = {
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

type MapDispatchPropsType = {
  getCompanyCategories: () => void
  getProductCategories: () => void
  getProductSubcategories: () => void
}

type OwnPropsType = {

}

let mapStateToProps = (state: RootState) => {
  return {
    companyCategories: state.navbar.companyCategories,
    productCategories: state.navbar.productCategories,
    productSubcategories: state.navbar.productSubcategories,
    productSubcategoriesByCategory: state.navbar.productSubcategoriesByCategory,
    cartProductList: state.navbar.cartProductList,
    user: state.navbar.user,
    countGoodsInCart: state.navbar.countGoodsInCart,
    isSearchOpen: state.navbar.isSearchOpen,
    isHamburgerOpen: state.navbar.isHamburgerOpen,
    isCategoryHovered: state.navbar.isCategoryHovered,
    isCartOpen: state.navbar.isCartOpen
  }
}

const NavbarContainer = connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, RootState>(
  mapStateToProps, 
  {getCompanyCategories, getProductCategories, getProductSubcategories}
)(Navbar)

export default NavbarContainer
export type PropsNavbar = MapStatePropsType & MapDispatchPropsType & OwnPropsType