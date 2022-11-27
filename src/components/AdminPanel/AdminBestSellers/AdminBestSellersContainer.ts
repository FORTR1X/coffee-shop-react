import {connect} from "react-redux";
import {BestSellersType} from "../../../interfaces/interfaces";
import {
    addProductToBestSellers,
    deleteProductFromBestSellers,
    getBestSellers
} from "../../../store/Actions/AdminBestSellersAction";
import {RootState} from "../../../store/redux-store";
import AdminBestSellers from "./AdminBestSellers";

type MapStatePropsType = {
    bestSellers: Array<BestSellersType>
}

type MapDispatchPropsType = {
    getBestSellers: () => void
    addProductToBestSellers: (id: number) => void
    deleteProductFromBestSellers: (id: number) => void
}

type OwnPropsType = {}

let mapStateToProps = (state: RootState) => {
    return {
        bestSellers: state.adminBestSellers.bestSellers
    }
}

const AdminBestSellersContainer = connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, RootState>(
    mapStateToProps, {getBestSellers, addProductToBestSellers, deleteProductFromBestSellers}
)(AdminBestSellers)

export default AdminBestSellersContainer
export type AdminBrstSellersPropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType