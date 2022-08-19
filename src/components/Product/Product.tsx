import React, { useRef, useState } from "react"

import searchSvg from './search.svg'
import cartSvg from './cart.svg'

import s from './Product.module.css'
import { ProductType } from "../../interfaces/interfaces"

type ProductPropsType = {
  product: ProductType
}

const Product: React.FC<ProductPropsType> = (props: ProductPropsType) => {

  const productRef = useRef<HTMLDivElement>(null);
  const productHoveredRef = useRef<HTMLDivElement>(null);

  const handleMouseEnterAnimation = () => {
    if (productRef.current !== null && productHoveredRef.current !== null) {
      productRef.current.className = `${s.product} ${s.open}`
      setTimeout(() => {
        if (productHoveredRef.current !== null) {
          productHoveredRef.current.className = `${s.product__hovered_container} ${s.start}`
        }
      }, 300)
    }
  }

  const handleMouseLeaveAnimation = () => {
    if (productRef.current !== null && productHoveredRef.current !== null) {
      productHoveredRef.current.className = `${s.product__hovered_container} ${s.end}`
      setTimeout( () => {
        if (productHoveredRef.current !== null)
        productHoveredRef.current.className = `${s.product__hovered_container} ${s.end_active}`
      }, 500)

      setTimeout( () => {
        if (productRef.current !== null)
          productRef.current.className = `${s.product}`
      }, 300)
    }
  }

  return (
    <div 
      ref={productRef}
      onMouseLeave={handleMouseLeaveAnimation}
      onMouseEnter={handleMouseEnterAnimation}
      className={s.product}>
      <div className={s.product__container}>
        <div className={s.product__img}>
          <img 
            className={s.img}
            src={`http://localhost:8080/uploads/product/${props.product.id}.jpg`} 
            alt={props.product.header} 
            title={props.product.header}
          />
          <div className={s.img__hovered_content}>
            <img className={s.img__search} src={searchSvg} alt="view" title="Просмотреть товар" />
          </div>
        </div>

        <div className={s.product__title}>
          <a href={`/product/id${props.product.id}`}>
            {props.product.header}
          </a>
        </div>

        <div className={s.product__category}>
          {`${props.product.subcategory.category.title}, ${props.product.subcategory.title}`}
        </div>

        <div className={s.product__price}>
          <span className={s.price}>{props.product.price} руб <span className={s.count}>/50 гр</span></span>
        </div>

        <div ref={productHoveredRef} className={s.product__hovered_container}>
          <span>{props.product.description}</span>
          
          <div className={s.product__btn_group}>
            <div className={s.product__select_count}>
              100 гр v
            </div>

            <div className={s.product__to_cart}>
              <div className={s.cart}>
                <img src={cartSvg} alt="" title="Добавить товар"/>
                <span>{props.product.price} руб</span>
              </div>
            </div>
          </div>  
        </div>
      </div>
    </div>
  )
}

export default Product