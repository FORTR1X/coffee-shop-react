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
      <div className={s.catalog__title}>
        <h2>Топ продаж</h2>
        <div className={s.title_underline}></div>
      </div>

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