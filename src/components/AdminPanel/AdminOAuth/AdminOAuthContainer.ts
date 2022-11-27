import {connect} from "react-redux";
import {getAuthToken} from "../../../store/Actions/OAuthAction";
import {RootState} from "../../../store/redux-store";
import AdminOAuth from "./AdminOAuth";

type MapStatePropsType = {}

type MapDispatchPropsType = {
    getAuthToken: (login: string, password: string) => void
}

type OwnPropsType = {}

let mapStateToProps = (state: RootState) => {
    return {}
}

const AdminOAuthContainer = connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, RootState>(
    mapStateToProps, {getAuthToken}
)(AdminOAuth)

export default AdminOAuthContainer
export type PropsAdminOAuthContainer = MapStatePropsType & MapDispatchPropsType & OwnPropsType