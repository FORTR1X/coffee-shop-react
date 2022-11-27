import {ProductType} from "../../interfaces/interfaces"

const SET_PRODUCTS = 'SET_PRODUCTS'

let initialState = {
    products: [] as Array<ProductType>
}

export type AdminPanelInitialStateType = typeof initialState

const adminPanelReducer = (state = initialState, action: AdminPanelActionTypes): AdminPanelInitialStateType => {
    switch (action.type) {
        case SET_PRODUCTS:
            return {
                ...state,
                products: action.products
            }

        default:
            return state
    }
}

export type AdminPanelActionTypes = SetProductsType

type SetProductsType = {
    type: typeof SET_PRODUCTS
    products: Array<ProductType>
}
export const setProducts = (products: Array<ProductType>): SetProductsType => ({
    type: SET_PRODUCTS,
    products
})

export default adminPanelReducer