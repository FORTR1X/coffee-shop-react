import {connect} from "react-redux";
import {ProductType} from "../../../interfaces/interfaces";
import {getUrlProductImages} from "../../../store/Actions/PageProductAction";
import {RootState} from "../../../store/redux-store";
import ModalProduct from "./ModalProduct";

type MapSatePropsType = {
    productImages: Array<string>
}

type MapDispatchPropsType = {
    getUrlProductImages: (id: number) => void
}

type OwnPropsType = {
    product: ProductType
    isProductModalOpen: boolean
    handleClose: (state?: boolean) => void
}

let mapStateToProps = (state: RootState) => {
    return {
        productImages: state.pageProduct.productImages
    }
}

const ModalProductContainer = connect<MapSatePropsType, MapDispatchPropsType, OwnPropsType, RootState>(
    mapStateToProps, {getUrlProductImages}
)(ModalProduct)

export default ModalProductContainer
export type ModalProductPropsType = MapSatePropsType & MapDispatchPropsType & OwnPropsType