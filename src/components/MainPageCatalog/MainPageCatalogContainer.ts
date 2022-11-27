import {connect} from "react-redux"
import {CategoryType, SubcategoryType} from "../../interfaces/interfaces"
import {RootState} from "../../store/redux-store"
import Catalog from "./MainPageCatalog"

type MapStatePropsType = {
    productCategories: Array<CategoryType> | null
    productSubcategoriesByCategory: SubcategoryType[][] | null
    productAllSubcategories: SubcategoryType[] | null
}

type MapDispatchPropsType = {}

type OwnPropsType = {}

let mapStateToProps = (state: RootState) => {
    return {
        productCategories: state.navbar.productCategories,
        productSubcategoriesByCategory: state.navbar.productSubcategoriesByCategory,
        productAllSubcategories: state.navbar.productAllSubcategories
    }
}

const MainPageCatalogContainer = connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, RootState>(
    mapStateToProps
)(Catalog)

export default MainPageCatalogContainer
export type PropsCatalog = MapStatePropsType & MapDispatchPropsType & OwnPropsType