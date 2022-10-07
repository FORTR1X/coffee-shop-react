import { connect } from "react-redux";
import { checkIsAuthToken } from "../../store/Actions/OAuthAction";
import { setIsAuth, setTokenAndRefreshToken } from "../../store/Reducers/OAuthReducer";
import { RootState } from "../../store/redux-store";
import OAuth from "./OAuth";

type MapStatePropsType = {
  token: string
  refreshToken: string
  isAuth: boolean
  failedRequest: boolean
}

type MapDispatchPropsType = {
  checkIsAuthToken: (token: string) => void
  setIsAuth: (isAuth: boolean) => void
  setTokenAndRefreshToken: (refreshToken: string, accessToken: string) => void
}

type OwnPropsType = {

}

let mapStateToProps = (state: RootState) => {
  return {
    token: state.OAuth.token,
    refreshToken: state.OAuth.refreshToken,
    isAuth: state.OAuth.isAuth,
    failedRequest: state.OAuth.failedRequest
  }
}

const OAuthContainer = connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, RootState>(
  mapStateToProps, {checkIsAuthToken, setIsAuth, setTokenAndRefreshToken}
)(OAuth)

export default OAuthContainer
export type PropsOAuth = MapStatePropsType & MapDispatchPropsType & OwnPropsType