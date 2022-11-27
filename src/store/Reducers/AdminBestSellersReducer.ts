import {BestSellersType} from "../../interfaces/interfaces"
import {UrlInitialStateType} from "./UrlReducer"

const SET_BEST_SELLERS = 'SET_BEST_SELLERS'


let initialState = {
    bestSellers: [] as Array<BestSellersType>
}

export type AdminBestSellersInitialStateType = typeof initialState

const adminBestSellersReducer = (state = initialState, action: AdminBestSellersActionTypes): AdminBestSellersInitialStateType => {
    switch (action.type) {

        case SET_BEST_SELLERS:
            return {
                ...state,
                bestSellers: action.bestSellers
            }

        default:
            return state
    }
}

export type AdminBestSellersActionTypes = SetBestSellers

type SetBestSellers = {
    type: typeof SET_BEST_SELLERS
    bestSellers: Array<BestSellersType>
}
export const setBestSellers = (bestSellers: Array<BestSellersType>): SetBestSellers => ({
    type: SET_BEST_SELLERS,
    bestSellers
})

export default adminBestSellersReducer