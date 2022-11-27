import {CartType} from "../interfaces/interfaces"

export const mapCartTypeToProductsIds = (cartTypeArray: Array<CartType>): Array<number> => {
    let productsIdsArray: Array<number> = []

    cartTypeArray.map((item) => {
        productsIdsArray.push(item.productId)
    })

    return productsIdsArray
}