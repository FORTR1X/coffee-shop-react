import { connect } from "react-redux"
import { CategoryType, SubcategoryType } from "../../interfaces/interfaces"
import { RootState } from "../../store/redux-store"
import Catalog from "./Catalog"

type MapStatePropsType = {
  productCategories: Array<CategoryType> | null
  productSubcategoriesByCategory: SubcategoryType[][] | null
  productAllSubcategories: SubcategoryType[] | null
}

type MapDispatchPropsType = {

}

type OwnPropsType = {

}

let mapStateToProps = (state: RootState) => {
  return {
    productCategories: state.navbar.productCategories,
    productSubcategoriesByCategory: state.navbar.productSubcategoriesByCategory,
    productAllSubcategories: state.navbar.productAllSubcategories
  }
}

const CatalogContainer = connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, RootState>(
  mapStateToProps
)(Catalog)

export default CatalogContainer
export type PropsCatalog = MapStatePropsType & MapDispatchPropsType & OwnPropsType