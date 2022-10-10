import { connect } from "react-redux"
import { ProductType } from "../../../interfaces/interfaces"
import { getPageProducts, getUrlProductImages } from "../../../store/Actions/PageProductAction"
import { RootState } from "../../../store/redux-store"
import PageProduct from "./PageProduct"

type MapStatePropsType = {
  product: ProductType | null
  productImages: Array<string>
}

type MapDispatchPropsType = {
  getPageProducts: (productId: number) => void
  getUrlProductImages: (id: number) => void
}

type OwnPropsType = {

}

let mapStateToProps = (state: RootState) => {
  return {
    product: state.pageProduct.product,
    productImages: state.pageProduct.productImages
  }
}

const PageProductContainer = connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, RootState>(
  mapStateToProps, {getPageProducts, getUrlProductImages}
)(PageProduct)

export default PageProductContainer
export type PropsPageProduct = MapStatePropsType & MapDispatchPropsType & OwnPropsType