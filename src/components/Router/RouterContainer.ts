import { connect } from "react-redux"
import { RootState } from "../../store/redux-store"
import Router from "./Router"
import { CategoryType, CompanyCategoryType, SubcategoryType, UserType } from "../../interfaces/interfaces"

type UrlType = {
  categoryTea: string
  categoryCoffee: string
  categoryTableware: string
  categoryAccessory: string

  subcatMonosorta: string
  subcatSmesi: string

  subcatCherniy: string
  subcatZeleniy: string
  subcatUlun: string
  subcatBeliy: string
  subcatPuer: string
  subcatTravyanie: string
  subcatKrasniy: string

  companyAbout: string
  companyOptovikam: string
  companyKontakti: string

  isAllUrlReady: boolean
}

type MapStatePropsType = {
  // NavbarReducer
  companyCategories: CompanyCategoryType[] | null
  productCategories: CategoryType[] | null
  productSubcategories: SubcategoryType[] | null
  user: UserType | null
  productSubcategoriesByCategory: SubcategoryType[][] | null

  // UrlReducer
  url: UrlType  
}

type MapDispatchPropsType = {

}

type OwnPropsType = {

}

let mapStateToProps = (state: RootState) => {
  return {
    companyCategories: state.navbar.companyCategories,
    productCategories: state.navbar.productCategories,
    productSubcategories: state.navbar.productSubcategories,
    productSubcategoriesByCategory: state.navbar.productSubcategoriesByCategory,
    user: state.navbar.user,

    url: state.url,
  }
}

const RouterContainer = connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, RootState>(
  mapStateToProps
)(Router)

export default RouterContainer
export type PropsRouter = MapStatePropsType & MapDispatchPropsType & OwnPropsType