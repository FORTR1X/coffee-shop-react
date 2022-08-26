import React, { useEffect, useRef, useState } from "react"

import searchSvg from './search.svg'
import cartSvg from './cart_white.svg'

import s from './Product.module.css'
import { CartType, ProductType } from "../../interfaces/interfaces"
import ModalProduct from "./ModalProduct/ModalProduct"
import { useLocalStorage } from "usehooks-ts"

export type ProductPropsType = {
  product: ProductType
  productList: Array<ProductType> | null
}

// TODO: Добавить: Работа с корзиной

const Product: React.FC<ProductPropsType> = (props: ProductPropsType) => {

  const [currentProduct, setCurrentProduct] = useState<ProductType>()
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)
  const handleSetIsProductModalOpen = (state?: boolean) => {

    if (state == undefined)
      setIsProductModalOpen(!isProductModalOpen)
    else
      setIsProductModalOpen(state)
  }

  useEffect(() => {
    document.body.classList.toggle(s.body__no_scroll)
  }, [isProductModalOpen])

  const addCartBtnRef = useRef<HTMLButtonElement>(null)
  const [cart, setCart] = useLocalStorage('cart', [] as Array<CartType>)
  const handleAddToCart = (productId: number, count?: number) => {
    // If new item already exists cart, we just modify count this item in local storage
    const cartSubList = cart
    let isSimilarItem = false
    const item: CartType = {productId, count: count == undefined ? 1 : count}

    cartSubList.map((cartItem, index) => {
      if (cartItem.productId == item.productId) {
        cartItem.count = cartItem.count + 1
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
    if (addCartBtnRef.current !== null) {
      addCartBtnRef.current.classList.toggle(s.successfully)

      setTimeout(() => {
        if (addCartBtnRef.current !== null)
          addCartBtnRef.current.classList.toggle(s.successfully)
      }, 1000)
    }
  }

  return (
    <div
      className={s.product}>
      <div className={s.product__img}>
        <a href={`/product/id${props.product.id}`}>
          <img 
            className={s.img}
            src={`http://localhost:8080/uploads/product/${props.product.id}.jpg`} 
            alt={props.product.header} 
          />
        </a>  
        <div className={s.img__hovered_content}>
          <img
            className={s.img__search}
            src={searchSvg}
            alt="view"
            title="Просмотреть товар"
            onClick={ () => {
              setCurrentProduct(props.product)
              handleSetIsProductModalOpen()
            }}
          />
        </div>
        <button
          ref={addCartBtnRef}
          className={s.add_to_cart_btn}
          onClick={() => { handleAddToCart(props.product.id) }}
        >
          <img src={cartSvg} alt="cart" />
          <span>В корзину</span>
        </button>
      </div>

      <div className={s.product__container}>
        <div>
          <div className={s.product__title}>
            <a href={`/product/id${props.product.id}`}>
              {props.product.header}
            </a>
          </div>

          <div className={s.product__category}>
            {`${props.product.subcategory.category.title}, ${props.product.subcategory.title}`}
          </div>
        </div>  

        <div className={s.product__price}>
          <span className={s.price}>
            {props.product.price} руб 
            {props.product.subcategory.category.title == 'Чай' &&
              <span className={s.count}> /50 гр</span>
            }
            {props.product.subcategory.category.title != 'Чай' &&
              <span className={s.count}> /1 шт</span>
            }
          </span>
        </div> 
      </div>

      {currentProduct !== undefined && isProductModalOpen &&
        <ModalProduct
          handleClose={handleSetIsProductModalOpen}
          product={currentProduct}
          isProductModalOpen={isProductModalOpen}
        />
      }
    </div>
  )
}

export default Product