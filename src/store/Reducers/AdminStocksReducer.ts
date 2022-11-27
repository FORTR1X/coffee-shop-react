const SET_TITLE_IMAGES = 'SET_TITLE_IMAGES'
const SET_DEFAULT_TITLE_IMAGES = 'SET_DEFAULT_TITLE_IMAGES'

let initialState = {
    titleImages: [] as Array<string>,
    defaultTitleImages: [] as Array<string>
}

export type AdminStocksInitialStateProps = typeof initialState

const adminStocksReducer = (state = initialState, action: AdminStocksActionType): AdminStocksInitialStateProps => {

    switch (action.type) {

        case SET_TITLE_IMAGES:
            return {
                ...state,
                titleImages: action.titleImages
            }

        case SET_DEFAULT_TITLE_IMAGES:
            return {
                ...state,
                defaultTitleImages: action.defaultTitleImages
            }

        default:
            return state
    }
}

export type AdminStocksActionType = SetTitleImagesType | SetDefaultTitleImagesType

type SetTitleImagesType = {
    type: typeof SET_TITLE_IMAGES
    titleImages: Array<string>
}
export const setTitleImages = (titleImages: Array<string>): SetTitleImagesType => ({
    type: SET_TITLE_IMAGES,
    titleImages
})

type SetDefaultTitleImagesType = {
    type: typeof SET_DEFAULT_TITLE_IMAGES
    defaultTitleImages: Array<string>
}
export const setDefaultTitleImages = (defaultTitleImages: Array<string>): SetDefaultTitleImagesType => ({
    type: SET_DEFAULT_TITLE_IMAGES,
    defaultTitleImages
})

export default adminStocksReducer

