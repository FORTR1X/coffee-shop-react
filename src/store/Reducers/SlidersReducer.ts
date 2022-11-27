const SET_BACKGROUNDS_LIST = "SET_BACKGROUNDS_LIST"

let initialState = {
    backgroundsList: [] as Array<string>
}

export type SlidersReducer = typeof initialState

const slidersReducer = (state = initialState, action: SlidersActionTypes) => {
    switch (action.type) {
        case SET_BACKGROUNDS_LIST:
            return {
                ...state,
                backgroundsList: action.backgroundsList
            }

        default:
            return state
    }
}

export type SlidersActionTypes = SetBackgroundsListType

type SetBackgroundsListType = {
    type: typeof SET_BACKGROUNDS_LIST
    backgroundsList: Array<string>
}
export const setBackgroundsList = (backgroundsList: Array<string>): SetBackgroundsListType => ({
    type: SET_BACKGROUNDS_LIST,
    backgroundsList
})

export default slidersReducer