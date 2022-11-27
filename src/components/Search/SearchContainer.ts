import {connect} from "react-redux";
import {ProductType} from "../../interfaces/interfaces";
import {getSearchProducts} from "../../store/Actions/SearchAction";
import {RootState} from "../../store/redux-store";
import Search from "./Search";

type MapStatePropsType = {
    productList: Array<ProductType>
    responseStatus: number
}

type MapDispatchPropsType = {
    getSearchProducts: (headerOrDescriptionSearch: string) => void
}

type OwnPropsType = {}

let mapStateToProps = (state: RootState) => {
    return {
        productList: state.search.searchProducts,
        responseStatus: state.search.responseStatus
    }
}

const SearchContainer = connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, RootState>(
    mapStateToProps, {getSearchProducts}
)(Search)

export default SearchContainer
export type PropsSearchType = MapStatePropsType & MapDispatchPropsType & OwnPropsType