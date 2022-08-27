import { connect } from "react-redux"
import { ProductType } from "../../../interfaces/interfaces"
import { getPageProducts } from "../../../store/Actions/PageProductAction"
import { RootState } from "../../../store/redux-store"
import PageProduct from "./PageProduct"

type MapStatePropsType = {
  product: ProductType | null
}

type MapDispatchPropsType = {
  getPageProducts: (productId: number) => void
}

type OwnPropsType = {

}

let mapStateToProps = (state: RootState) => {
  return {
    product: state.pageProduct.product
  }
}

const PageProductContainer = connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, RootState>(
  mapStateToProps, {
    getPageProducts
  }
)(PageProduct)

export default PageProductContainer
export type PropsPageProduct = MapStatePropsType & MapDispatchPropsType & OwnPropsType