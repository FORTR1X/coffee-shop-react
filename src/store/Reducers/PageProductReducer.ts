import {ProductType} from "../../interfaces/interfaces"

const SET_PRODUCT = 'SET_PRODUCT'
const SET_PRODUCT_IMAGES = 'SET_PRODUCT_IMAGES'

let initialState = {
    product: null as ProductType | null,
    productImages: [] as Array<string>
}

export type PageProductType = typeof initialState

const pageProductReducer = (state = initialState, action: PageProductActionTypes) => {
    switch (action.type) {

        case SET_PRODUCT:
            return {
                ...state,
                product: action.product
            }

        case SET_PRODUCT_IMAGES:
            return {
                ...state,
                productImages: action.productImages
            }

        default:
            return state
    }
}

export type PageProductActionTypes = SetProductActionType | SetProductImagesType

type SetProductActionType = {
    type: typeof SET_PRODUCT
    product: ProductType | null
}
export const setPageProduct = (product: ProductType | null): SetProductActionType => ({
    type: SET_PRODUCT,
    product
})

type SetProductImagesType = {
    type: typeof SET_PRODUCT_IMAGES
    productImages: Array<string>
}
export const setProductImages = (productImages: Array<string>): SetProductImagesType => ({
    type: SET_PRODUCT_IMAGES,
    productImages
})

export default pageProductReducer