import React, { useRef, useState } from "react"
import { CartType, ProductType } from "../../../interfaces/interfaces"

import { CSSTransition } from "react-transition-group"

import s from './ModalProduct.module.css'
import './style.css'
import { useLocalStorage } from "usehooks-ts"
import { BASE_URL } from "../../../hooks/useApi"

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

  const addCartBtnRef = useRef<HTMLButtonElement>(null)
  const successfullyTextRef = useRef<HTMLSpanElement>(null)

  const [cart, setCart] = useLocalStorage('cart', [] as Array<CartType>)
  const handleAddToCart = (productId: number, count?: number) => {
    // If new item already exists cart, we just modify count this item in local storage
    const cartSubList = cart
    let isSimilarItem = false
    const item: CartType = {productId, count: count == undefined ? 1 : count}

    cartSubList.map((cartItem) => {
      if (cartItem.productId == item.productId) {
        cartItem.count = count == undefined ? cartItem.count + 1 : cartItem.count + count
        isSimilarItem = true
      }
    })
    if (isSimilarItem)
      setCart(cartSubList)
    else
      setCart([...cart, item])  

    animationSuccessfullyAddToCart()
  }

  const animationSuccessfullyAddToCart = () => {
    if (successfullyTextRef.current !== null) {
      successfullyTextRef.current.classList.toggle(s.active)

      setTimeout(() => {
        if (successfullyTextRef.current !== null) {
          successfullyTextRef.current.classList.toggle(s.active)
        }
      }, 3000)
    }

    if (addCartBtnRef.current !== null) {
      addCartBtnRef.current.classList.toggle(s.successfully)

      setTimeout(() => {
        if (addCartBtnRef.current !== null)
          addCartBtnRef.current.classList.toggle(s.successfully)
      }, 3000)
    }
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
            src={`${BASE_URL}/uploads/product/${props.product.id}.jpg`}
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
                  <input
                    type='button'
                    onClick={handleMinusProductCount}
                    className={s.counter__minus}
                    value="-"
                  />

                  <input
                    type='text'
                    onChange={(event) => {handleSetProductCount(event)}}
                    className={s.counter__count} value={productCount}
                  />

                  <input type='button'
                    onClick={handlePlusProductCount}
                    className={s.counter__plus}
                    value="+"
                  />
                </div>

                <button
                  ref={addCartBtnRef}
                  className={s.btn__add_to_cart}
                  onClick={() => { handleAddToCart(props.product.id, productCount) }}
                >
                  В корзину
                </button>
              </div>
              <div className={s.successfully__text_container}>
                <span
                  ref={successfullyTextRef}
                  className={s.successfully__text}
                >
                  Товар успешно добавлен в корзину!
                </span>
              </div>

              <span className={s.description}>{props.product.description}</span>

              <div className={s.split_line}/>

              <span className={s.product_id}>Артикул: <span>#{props.product.id}</span></span>
              <span className={s.product_category}>
                Категория: 
                <span>
                  {/* if category have subcategory */}
                  {props.product.subcategory.category.title != props.product.subcategory.title && 
                    `${props.product.subcategory.category.title}, ${props.product.subcategory.title}`
                  }

                  {/* if category don't have subcategory */}
                  {props.product.subcategory.category.title == props.product.subcategory.title &&
                    props.product.subcategory.category.title
                  }
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