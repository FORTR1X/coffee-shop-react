import {connect} from "react-redux";
import {
    addPhotoStock,
    deletePhotoStock,
    editIdStock,
    editPhotoStock,
    getStocks
} from "../../../store/Actions/AdminStocksAction";
import {setTitleImages} from "../../../store/Reducers/AdminStocksReducer";
import {RootState} from "../../../store/redux-store";
import AdminStocks from "./AdminStocks";

type MapStatePropsType = {
    titleImages: Array<string>
    defaultTitleImages: Array<string>
}

type MapDispatchPropsType = {
    getStocks: () => void
    addPhotoStock: (id: number, imagesData: FormData) => void
    deletePhotoStock: (id: number) => void
    editIdStock: (prevId: string, newId: string) => void
    editPhotoStock: (id: number, imagesData: FormData) => void
    setTitleImages: (titleImages: Array<string>) => void
}

type OwnPropsType = {}

let mapStateToProps = (state: RootState) => {
    return {
        titleImages: state.adminStocks.titleImages,
        defaultTitleImages: state.adminStocks.defaultTitleImages
    }
}

const AdminStocksContainer = connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, RootState>(
    mapStateToProps, {getStocks, addPhotoStock, deletePhotoStock, editIdStock, editPhotoStock, setTitleImages}
)(AdminStocks)

export default AdminStocksContainer
export type AdminStocksPropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType