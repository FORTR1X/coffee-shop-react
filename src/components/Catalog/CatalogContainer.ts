import { connect } from "react-redux"
import { CategoryType, ProductType, SubcategoryType } from "../../interfaces/interfaces"
import { CatalogProductListPropsType, CatalogThunkActionType, getCatalogProductList, getProductTotalCount } from "../../store/Actions/CatalogAction"
import { CatalogActionTypes } from "../../store/Reducers/CatalogReducer"
import { RootState } from "../../store/redux-store"
import Catalog from "./Catalog"

type MapStatePropsType = {
  productList: Array<ProductType> | null
  productTotalCount: number
  productCategories: Array<CategoryType> | null
  productSubcategoriesByCategory: SubcategoryType[][] | null
  productSubcategories: Array<SubcategoryType> | null
}

type MapDispatchPropsType = {
  getCatalogProductList: (searchParams: CatalogProductListPropsType) => void

  getProductTotalCount: (subcatId: number) => void
}

type OwnPropsType = {

}

let mapStateToProps = (state: RootState) => {
  return {
    productList: state.catalog.productList,
    productTotalCount: state.catalog.productTotalCount,
    productCategories: state.navbar.productCategories,
    productSubcategories: state.navbar.productSubcategories,
    productSubcategoriesByCategory: state.navbar.productSubcategoriesByCategory,
    
  }
}

const CatalogContainer = connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, RootState>(
  mapStateToProps, {getCatalogProductList, getProductTotalCount}
)(Catalog)

export default CatalogContainer
export type PropsCatalogType = MapStatePropsType & MapDispatchPropsType & OwnPropsType