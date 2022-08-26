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
    if (productCount > 1)
      setProductCount(productCount - 1)
  }
  
  const handlePlusProductCount = () => {
    setProductCount(productCount + 1)
  }

  const handleSetProductCount = (event: React.ChangeEvent<HTMLInputElement>) => {
    const productCount = Number(event.currentTarget.value)

    if (productCount > 0)
      setProductCount(productCount)
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

            <div className={s.product__content}>
              <div className={s.price}>  
                <span>{props.product.price} руб
                  <span className={s.price__unit}>
                    {props.product.subcategory.category.title == 'Чай' ? '/50 гр' : '/1 шт'}
                  </span>
                </span>
              </div>

              <div className={s.btn__group}>
                <div className={s.counter__container}>
                  <input type='button' onClick={handleMinusProductCount} className={s.counter__minus} value="-"/>
                  <input type='text' onChange={(event) => {handleSetProductCount(event)}} className={s.counter__count} value={productCount}/>
                  <input type='button' onClick={handlePlusProductCount} className={s.counter__plus} value="+"/>
                </div>

                <div className={s.btn__add_to_cart}>
                  В корзину
                </div>
              </div>

              <span className={s.description}>{props.product.description}</span>

              <div className={s.split_line}/>

              <span className={s.product_id}>Артикул: <span>#{props.product.id}</span></span>
              <span className={s.product_category}>
                Категория: 
                <span>
                  {props.product.subcategory.category.title}, {props.product.subcategory.title}
                </span>
              </span>
            </div>
          </div>
        </div>
      </CSSTransition>

    </div>
  )
}

export default ModalProduct