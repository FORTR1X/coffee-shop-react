import React, { useEffect, useRef } from "react"
import Product from "../Product/Product"

import s from './BestSeller.module.css'
import { PropsBestSeller } from "./BestSellerContainer"

const BestSeller: React.FC<PropsBestSeller> = (props: PropsBestSeller) => {

  useEffect( () => {
    if (props.bestSellersProduct == null)
      props.getBestSellersList()
  }, [props.bestSellersProduct])

  return (
    <div className={s.bestSeller}>
      {props.bestSellersProduct !== null && props.bestSellersProduct.length > 0 &&
        <div className={s.products__container}>
          {props.bestSellersProduct.map((bestSeller, index) => {
            return (
              <Product product={bestSeller.product}/>
            )
          })}
        </div>
      }
    </div>
  )
}

export default BestSeller