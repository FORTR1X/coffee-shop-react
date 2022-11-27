import {connect} from "react-redux"
import {
    getAllSubcategories,
    getCartProductList,
    getCompanyCategories,
    getProductCategories,
    getProductSubcategories,
    getUser
} from "../../store/Actions/NavbarAction"
import {RootState} from "../../store/redux-store"
import Navbar from "./Navbar"
import {CategoryType, CompanyCategoryType, ProductType, SubcategoryType, UserType} from "../../interfaces/interfaces"
import {
    seCountsGoodsInCart,
    setCartProductList,
    setCurrentSelectedCategory,
    setHamburgerOpen,
    setIsCartOpen,
    setIsCategoryHovered,
    setIsSearchOpen,
    setSubcategoriesByCategory
} from "../../store/Reducers/NavbarReducer"

type MapStatePropsType = {
    companyCategories: Array<CompanyCategoryType> | null
    productCategories: Array<CategoryType> | null
    productSubcategories: Array<SubcategoryType> | null
    productSubcategoriesByCategory: SubcategoryType[][] | null
    cartProductList: Array<ProductType> | null
    user: UserType | null
    countGoodsInCart: number
    currentSelectedCategory: CategoryType | null
    isSearchOpen: boolean | undefined
    isHamburgerOpen: boolean | undefined
    isCategoryHovered: boolean | undefined
    isCartOpen: boolean | undefined
}

type MapDispatchPropsType = {
    getCompanyCategories: () => void
    getProductCategories: () => void
    getProductSubcategories: (categoryId: number) => any
    getUser: (userId?: number) => void
    getAllSubcategories: () => void
    getCartProductList: (productsId: Array<number>) => void
    setSubcategoriesByCategory: (subcategoriesByCategory: SubcategoryType[][] | null) => void
    setCurrentSelectedCategory: (currentSelectedCategory: CategoryType | null) => void
    setIsCategoryHovered: (isCategoryHovered: boolean | undefined) => void
    setIsCartOpen: (isCartOpen: boolean | undefined) => void
    setHamburgerOpen: (isHamburgerOpen: boolean | undefined) => void
    setIsSearchOpen: (isSearchOpen: boolean | undefined) => void
    seCountsGoodsInCart: (countsGoodsInCart: number) => void
    setCartProductList: (cartProductList: Array<ProductType> | null) => void
}

type OwnPropsType = {}

let mapStateToProps = (state: RootState) => {
    return {
        companyCategories: state.navbar.companyCategories,
        productCategories: state.navbar.productCategories,
        productSubcategories: state.navbar.productSubcategories,
        productSubcategoriesByCategory: state.navbar.productSubcategoriesByCategory,
        cartProductList: state.navbar.cartProductList,
        user: state.navbar.user,
        countGoodsInCart: state.navbar.countGoodsInCart,
        currentSelectedCategory: state.navbar.currentSelectedCategory,
        isSearchOpen: state.navbar.isSearchOpen,
        isHamburgerOpen: state.navbar.isHamburgerOpen,
        isCategoryHovered: state.navbar.isCategoryHovered,
        isCartOpen: state.navbar.isCartOpen
    }
}

const NavbarContainer = connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, RootState>(
    mapStateToProps, {
        getCompanyCategories, getProductCategories, getProductSubcategories, getUser, setSubcategoriesByCategory,
        setIsCategoryHovered, setIsCartOpen, setHamburgerOpen, setIsSearchOpen, seCountsGoodsInCart, setCartProductList,
        setCurrentSelectedCategory, getAllSubcategories, getCartProductList
    }
)(Navbar)

export default NavbarContainer
export type PropsNavbar = MapStatePropsType & MapDispatchPropsType & OwnPropsType