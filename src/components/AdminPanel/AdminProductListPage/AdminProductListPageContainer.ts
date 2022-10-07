import { connect } from "react-redux";
import { ProductType } from "../../../interfaces/interfaces";
import { deleteByIds, deleteProductById, getAllProducts } from "../../../store/Actions/AdminPanelAction";
import { RootState } from "../../../store/redux-store";
import AdminProductListPage from "./AdminProductListPage";

type MapStatePropsType = {
  token: string
  refreshToken: string
  isAuth: boolean
  failedRequest: boolean
  products: Array<ProductType>
}

type MapDispatchPropsType = {
  getAllProducts: () => void
  deleteByIds: (ids: Array<number>) => void
  deleteProductById: (id: number) => void
}

type OwnPropsType = {

}

let mapStateToProps = (state: RootState) => {
  return {
    token: state.OAuth.token,
    refreshToken: state.OAuth.refreshToken,
    isAuth: state.OAuth.isAuth,
    failedRequest: state.OAuth.failedRequest,
    products: state.adminPanel.products
  }
}

const AdminProductListPageContainer = connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, RootState>(
  mapStateToProps, {getAllProducts, deleteByIds, deleteProductById}
)(AdminProductListPage)

export default AdminProductListPageContainer
export type PropsAdminProductListType = MapStatePropsType & MapDispatchPropsType & OwnPropsType