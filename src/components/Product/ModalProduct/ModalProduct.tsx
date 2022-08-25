import React, { useState } from "react"
import { ProductType } from "../../../interfaces/interfaces"
import { ProductPropsType } from "../Product"

import { CSSTransition } from "react-transition-group"

import s from './ModalProduct.module.css'
import './style.css'

type ModalProductType = {
  product: ProductType
  handleClose: (state?: boolean) => void
  isProductModalOpen: boolean
}

const ModalProduct: React.FC<ModalProductType> = (props: ModalProductType) => {
  const [productCount, setProductCount] = useState(1)
  const handleMinusProductCount = () => {
    if (productCount > 2)
      setProductCount(productCount - 1)
  }
  
  const handlePlusProductCount = () => {
    setProductCount(productCount + 1)
  }

  return (
    <div className={s.modal}>
      <div onClick={() => {props.handleClose(false)}} className={s.modal__outside} />

      <CSSTransition
        in={props.isProductModalOpen} 
        timeout={500}
        unmountOnExit
        classNames='modal-product'
      >
        <div className={s.modal__content}>
          <img 
            className={s.modal__img}
            title={props.product.header}
            src={`http://localhost:8080/uploads/product/${props.product.id}.jpg`}
            alt="img" 
          />
        
          <div className={s.content__right}>
            <div className={s.header__container}>
              <h3 className={s.header__title}>{props.product.header}</h3>
              <div onClick={() => {props.handleClose(false)}} className={s.header__close}/>
            </div>  

            <span>{props.product.price} руб
              <span>
                {props.product.subcategory.category.title == 'Чай' ? '/50 гр' : '/1 шт'}
              </span>
            </span>

            <div className={s.counter__container}>
              <span onClick={handleMinusProductCount} className={s.counter__minus}>-</span>
              <span className={s.counter__count}>{productCount}</span>
              <span onClick={handlePlusProductCount} className={s.counter__plus}>+</span>
            </div>
          </div>
        </div>
      </CSSTransition>

    </div>
  )
}

export default ModalProduct