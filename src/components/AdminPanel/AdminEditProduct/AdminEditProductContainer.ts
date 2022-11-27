import {connect} from "react-redux";
import {ProductRequestBodyType, ProductType, SubcategoryType} from "../../../interfaces/interfaces";
import {getSubcategories} from "../../../store/Actions/AdminCreateProductAction";
import {
    getEditableProduct,
    updateProductById,
    updateProductImageById
} from "../../../store/Actions/AdminEditProductAction";
import {RootState} from "../../../store/redux-store";
import AdminEditProduct from "./AdminEditProduct";

type MapStatePropsType = {
    product: ProductType
    subcategories: Array<SubcategoryType>
}

type MapDispatchPropsType = {
    getSubcategories: () => void
    getEditableProduct: (id: number) => void
    updateProductImageById: (id: number, imagesData: FormData) => void
    updateProductById: (id: number, product: ProductRequestBodyType) => void
}

type OwnPropsType = {}

let mapStateToProps = (state: RootState) => {
    return {
        product: state.adminEditProduct.product,

        subcategories: state.adminCreateProduct.subcategories
    }
}

const AdminEditProductContainer = connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, RootState>(
    mapStateToProps, {getSubcategories, getEditableProduct, updateProductImageById, updateProductById}
)(AdminEditProduct)

export default AdminEditProductContainer
export type PropsAdminEditProduct = MapStatePropsType & MapDispatchPropsType & OwnPropsType