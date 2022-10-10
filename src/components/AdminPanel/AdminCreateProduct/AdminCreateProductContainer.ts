import { connect } from "react-redux";
import { CategoryType, ProductRequestBodyType, ProductType, SubcategoryType } from "../../../interfaces/interfaces";
import { createImagesProduct, createProduct, getCategories, getSubcategories } from "../../../store/Actions/AdminCreateProductAction";
import { RootState } from "../../../store/redux-store";
import AdminCreateProduct from "./AdminCreateProduct";

type MapStatePropsType = {
  token: string
  refreshToken: string
  isAuth: boolean
  failedRequest: boolean
  subcategories: Array<SubcategoryType>
  responseProduct: ProductType
}

type MapDispatchPropsType = {
  getCategories: () => void
  getSubcategories: () => void
  createProduct: (requestBody: ProductRequestBodyType) => void
  createImagesProduct: (id: string, imagesData: FormData) => void
}

type OwnPropsType = {
}

let mapStateToProps = (state: RootState) => {
  return {
    token: state.OAuth.token,
    refreshToken: state.OAuth.refreshToken,
    isAuth: state.OAuth.isAuth,
    failedRequest: state.OAuth.failedRequest,
    
    subcategories: state.adminCreateProduct.subcategories,
    responseProduct: state.adminCreateProduct.responseProduct
  }
}

const AdminCreateProductContainer = connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, RootState>(
  mapStateToProps, {getCategories, getSubcategories, createProduct, createImagesProduct}
)(AdminCreateProduct)

export default AdminCreateProductContainer
export type PropsAdminCreateProduct = MapStatePropsType & MapDispatchPropsType & OwnPropsType