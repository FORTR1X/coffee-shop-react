import {connect} from "react-redux";
import {ProductType} from "../../interfaces/interfaces";
import {deleteByIds, getAllProducts} from "../../store/Actions/AdminPanelAction";
import {setLogut} from "../../store/Reducers/OAuthReducer";
import {RootState} from "../../store/redux-store";
import AdminPanel from "./AdminPanel";

type MapStatePropsType = {
    token: string
    refreshToken: string
    isAuth: boolean
    failedRequest: boolean
}

type MapDispatchPropsType = {
    setLogut: () => void
}

type OwnPropsType = {}

let mapStateToProps = (state: RootState) => {
    return {
        token: state.OAuth.token,
        refreshToken: state.OAuth.refreshToken,
        isAuth: state.OAuth.isAuth,
        failedRequest: state.OAuth.failedRequest,
    }
}

const AdminPanelContainer = connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, RootState>(
    mapStateToProps, {setLogut}
)(AdminPanel)

export default AdminPanelContainer
export type PropsAdminPanel = MapStatePropsType & MapDispatchPropsType & OwnPropsType