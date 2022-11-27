import {BestSellersType, ProductType} from "../interfaces/interfaces";

export const mapBestSellersArrayToProductArray = (bestSellersArray: Array<BestSellersType> | null): Array<ProductType> => {
    let productList: Array<ProductType> = []

    if (bestSellersArray !== null)
        bestSellersArray.map((bestSeller, index) => {
            productList.push(bestSeller.product)
        })

    return productList
}