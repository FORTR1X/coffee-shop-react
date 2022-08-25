import React, { useEffect, useRef, useState } from "react"

import searchSvg from './search.svg'
import cartSvg from './cart.svg'

import s from './Product.module.css'
import { ProductType } from "../../interfaces/interfaces"
import ModalProduct from "./ModalProduct/ModalProduct"

export type ProductPropsType = {
  product: ProductType
  productList: Array<ProductType> | null
}

type TeaUnitsType = {
  id: number
  title: string
  value: number
}

// TODO: Добавить: Просмотреть товар
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

  const teaUnits: Array<TeaUnitsType> = [
    {id: 1, title: '50 гр', value: 50},
    {id: 2, title: '100 гр', value: 100},
    {id: 3, title: '150 гр', value: 150},
    {id: 4, title: '200 гр', value: 200},
    {id: 5, title: '250 гр', value: 250},
    {id: 6, title: '300 гр', value: 300},
  ].reverse()

  const productRef = useRef<HTMLDivElement>(null);

  const [isTeaUnitsOpen, setIsTeaUnitsOpen] = useState(false)
  const [currentTeaUnits, setCurrentTeaUnits] = useState<TeaUnitsType>(teaUnits[5])
  const teaUnitsRef = useRef<HTMLUListElement>(null)
  const handleSetCurrentTeaUnits = (currentTeaUnits: TeaUnitsType | null): void => {
    if (currentTeaUnits !== null)
      setCurrentTeaUnits(currentTeaUnits)
  }

  const handleOnClickTeaUnits = (): void => {

    if (isTeaUnitsOpen)
      handleFadeOutTeaUnits()
    else
      handleFadeInTeaUnits()
  }

  const handleFadeInTeaUnits = (): void => {
    if (!isTeaUnitsOpen && teaUnitsRef.current !== null) {
      teaUnitsRef.current.className = `${s.tea_units__ul} ${s.start}`
      setTimeout( () => {
        if (teaUnitsRef.current !== null) {
          teaUnitsRef.current.className = `${s.tea_units__ul} ${s.active}`
          setIsTeaUnitsOpen(true)
        }
      }, 500)
    }
  }
  const handleFadeOutTeaUnits = (): void => {
    if (isTeaUnitsOpen && teaUnitsRef.current !== null) {
      teaUnitsRef.current.className = `${s.tea_units__ul} ${s.disable}`
      setTimeout( () => {
        if (teaUnitsRef.current !== null) {
          teaUnitsRef.current.className = `${s.tea_units__ul}`
          setIsTeaUnitsOpen(false)
        }
      }, 500)
    }
  }

  return (
    <div
      ref={productRef}
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