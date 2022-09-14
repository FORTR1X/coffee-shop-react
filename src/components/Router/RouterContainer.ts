import { connect } from "react-redux"
import { RootState } from "../../store/redux-store"
import Router from "./Router"
import { CategoryType, CompanyCategoryType, SubcategoryType, UrlType, UserType } from "../../interfaces/interfaces"

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