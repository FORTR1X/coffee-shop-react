import { connect } from "react-redux"
import { RootState } from "../../store/redux-store"
import Router from "./Router"
import { CategoryType, CompanyCategoryType, ProductType, SubcategoryType, UserType } from "../../interfaces/interfaces"

type MapStatePropsType = {
  companyCategories: CompanyCategoryType[] | null
  productCategories: CategoryType[] | null
  productSubcategories: SubcategoryType[] | null
  user: UserType | null
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
    user: state.navbar.user
  }
}

const RouterContainer = connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, RootState>(
  mapStateToProps
)(Router)

export default RouterContainer
export type PropsRouter = MapStatePropsType & MapDispatchPropsType & OwnPropsType