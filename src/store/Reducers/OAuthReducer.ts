const SET_TOKEN_AND_REFRESH_TOKEN = 'SET_TOKEN_AND_REFRESH_TOKEN'
const SET_IS_AUTH = 'IS_AUTH'
const SET_LOGOUT = 'SET_LOGOUT'
const SET_FAILED_REQUEST = 'SET_FAILED_REQUEST'

let initialState = {
    token: '',
    refreshToken: '',
    isAuth: false,
    failedRequest: false
}

export type OAuthInitialStateType = typeof initialState

const OAuthReducer = (state = initialState, action: OAuthActionTypes): OAuthInitialStateType => {

    switch (action.type) {

        case SET_TOKEN_AND_REFRESH_TOKEN:
            return {
                ...state,
                token: action.accessToken,
                refreshToken: action.refreshToken
            }

        case SET_IS_AUTH:
            return {
                ...state,
                isAuth: action.isAuth
            }

        case SET_LOGOUT:
            return {
                ...state,
                isAuth: false,
                token: '',
                refreshToken: '',
            }

        case SET_FAILED_REQUEST:
            return {
                ...state,
                failedRequest: action.failedRequest
            }

        default:
            return state
    }
}

export type OAuthActionTypes = SetTokenAndRefreshTokenType | SetIsAuthType | SetLogoutType | SetFailedRequestType

type SetTokenAndRefreshTokenType = {
    type: typeof SET_TOKEN_AND_REFRESH_TOKEN
    refreshToken: string
    accessToken: string
}
export const setTokenAndRefreshToken = (refreshToken: string, accessToken: string): SetTokenAndRefreshTokenType => ({
    type: SET_TOKEN_AND_REFRESH_TOKEN,
    refreshToken,
    accessToken
})

type SetIsAuthType = {
    type: typeof SET_IS_AUTH
    isAuth: boolean
}
export const setIsAuth = (isAuth: boolean): SetIsAuthType => ({
    type: SET_IS_AUTH,
    isAuth
})

type SetLogoutType = {
    type: typeof SET_LOGOUT
}
export const setLogut = (): SetLogoutType => ({
    type: SET_LOGOUT
})

type SetFailedRequestType = {
    type: typeof SET_FAILED_REQUEST
    failedRequest: boolean
}
export const setFailedRequest = (failedRequest: boolean): SetFailedRequestType => ({
    type: SET_FAILED_REQUEST,
    failedRequest
})

export default OAuthReducer