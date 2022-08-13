import { connect } from "react-redux"
import { RootState } from "../../store/redux-store"
import Router from "./Router"
import { CategoryType, CompanyCategoryType, SubcategoryType, UserType } from "../../interfaces/interfaces"

type MapStatePropsType = {
  // NavbarReducer
  companyCategories: CompanyCategoryType[] | null
  productCategories: CategoryType[] | null
  productSubcategories: SubcategoryType[] | null
  user: UserType | null,

  // UrlReducer
  categoryTea: string,
  categoryCoffee: string,
  categoryTableware: string,
  categoryAccessory: string,

  subcatMonosorta: string,
  subcatSmesi: string,

  subcatCherniy: string,
  subcatZeleniy: string,
  subcatUlun: string,
  subcatBeliy: string,
  subcatPuer: string,
  subcatTravyanie: string,
  subcatKrasniy: string,

  companyAbout: string,
  companyOptovikam: string,
  companyKontakti: string
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
    user: state.navbar.user,

    categoryTea: state.url.categoryTea,
    categoryCoffee: state.url.categoryCoffee,
    categoryTableware: state.url.categoryTableware,
    categoryAccessory: state.url.categoryAccessory,

    subcatMonosorta: state.url.subcatMonosorta,
    subcatSmesi: state.url.subcatSmesi,

    subcatCherniy: state.url.subcatCherniy,
    subcatZeleniy: state.url.subcatZeleniy,
    subcatUlun: state.url.subcatUlun,
    subcatBeliy: state.url.subcatBeliy,
    subcatPuer: state.url.subcatPuer,
    subcatTravyanie: state.url.subcatTravyanie,
    subcatKrasniy: state.url.subcatKrasniy,

    companyAbout: state.url.companyAbout,
    companyOptovikam: state.url.companyOptovikam,
    companyKontakti: state.url.companyKontakti
  }
}

const RouterContainer = connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, RootState>(
  mapStateToProps
)(Router)

export default RouterContainer
export type PropsRouter = MapStatePropsType & MapDispatchPropsType & OwnPropsType