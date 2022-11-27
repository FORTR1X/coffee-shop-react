import {BestSellersType} from "../../interfaces/interfaces"

const SET_BEST_SELLERS_LIST = 'SET_BEST_SELLERS_LIST'

let initialState = {
    bestSellersProduct: null as Array<BestSellersType> | null
}

export type BestSellersInitialStateType = typeof initialState

const bestSellersReducer = (state = initialState, action: BestSellersActionTypes): BestSellersInitialStateType => {
    switch (action.type) {
        case SET_BEST_SELLERS_LIST:
            return {
                ...state,
                bestSellersProduct: action.bestSellersProduct
            }

        default:
            return state
    }
}

export type BestSellersActionTypes = SetBestSellersListType

type SetBestSellersListType = {
    type: typeof SET_BEST_SELLERS_LIST
    bestSellersProduct: Array<BestSellersType> | null
}
export const setBestSellersList = (bestSellersProduct: Array<BestSellersType> | null): SetBestSellersListType => ({
    type: SET_BEST_SELLERS_LIST,
    bestSellersProduct
})

export default bestSellersReducer