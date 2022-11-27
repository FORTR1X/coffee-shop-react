import {connect} from "react-redux"
import {BestSellersType} from "../../interfaces/interfaces"
import {getBestSellersList} from "../../store/Actions/BestSellersAction"
import {RootState} from "../../store/redux-store"

import BestSeller from './BestSeller'

type MapStatePropsType = {
    bestSellersProduct: Array<BestSellersType> | null
}

type MapDispatchPropsType = {
    getBestSellersList: () => void
}

type OwnPropsType = {}

let mapStateToProps = (state: RootState) => {
    return {
        bestSellersProduct: state.bestSellers.bestSellersProduct,
    }
}

const BestSellerContainer = connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, RootState>(
    mapStateToProps, {getBestSellersList}
)(BestSeller)

export default BestSellerContainer
export type PropsBestSeller = MapStatePropsType & MapDispatchPropsType & OwnPropsType