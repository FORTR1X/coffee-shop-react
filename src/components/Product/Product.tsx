import React, { useRef, useState } from "react"

import searchSvg from './search.svg'
import cartSvg from './cart.svg'

import s from './Product.module.css'
import { ProductType } from "../../interfaces/interfaces"

type ProductPropsType = {
  product: ProductType
}

type TeaUnitsType = {
  id: number
  title: string
  value: number
}

const Product: React.FC<ProductPropsType> = (props: ProductPropsType) => {

  const teaUnits: Array<TeaUnitsType> = [
    {id: 1, title: '50 гр', value: 50},
    {id: 2, title: '100 гр', value: 100},
    {id: 3, title: '150 гр', value: 150},
    {id: 4, title: '200 гр', value: 200},
    {id: 5, title: '250 гр', value: 250},
    {id: 6, title: '300 гр', value: 300},
  ].reverse()

  const productRef = useRef<HTMLDivElement>(null);
  const productHoveredRef = useRef<HTMLDivElement>(null);

  const handleMouseEnterAnimation = (): void => {
    if (productRef.current !== null && productHoveredRef.current !== null) {
      productRef.current.className = `${s.product} ${s.open}`
      setTimeout(() => {
        if (productHoveredRef.current !== null) {
          productHoveredRef.current.className = `${s.product__hovered_container} ${s.start}`
        }
      }, 300)
    }
  }

  const handleMouseLeaveAnimation = (): void => {
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

  const [isTeaUnitsOpen, setIsTeaUnitsOpen] = useState(false)
  const [currentTeaUnits, setCurrentTeaUnits] = useState<TeaUnitsType>(teaUnits[0])
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
      onMouseLeave={handleMouseLeaveAnimation}
      onMouseEnter={handleMouseEnterAnimation}
      className={s.product}>
      <div className={s.product__container}>
        <div className={s.product__img}>
          <a href={`/product/id${props.product.id}`}>
            <img 
              className={s.img}
              src={`http://localhost:8080/uploads/product/${props.product.id}.jpg`} 
              alt={props.product.header} 
              title={props.product.header}
            />
          </a>  
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

        <div ref={productHoveredRef} className={s.product__hovered_container}>
          <div className={s.product__description}>
            <span>{props.product.description}</span>
          </div>  
          
          {/* For tea */}
          {props.product.subcategory.category.title == 'Чай' &&
            <div className={s.product__btn_group_tea}>
              <ul className={s.product__select_count_tea}>
                <li
                 className={s.tea__li}
                 onClick={() => handleOnClickTeaUnits()}
                 onMouseLeave={() => {handleFadeOutTeaUnits()}}
                >
                  <span className={s.tea__default_value}>
                    {currentTeaUnits.title}
                    <span className={s.tea__arrow}/>
                  </span>
                  <ul ref={teaUnitsRef} className={s.tea_units__ul}>
                    {teaUnits.map((unit, index) => {
                      return (
                        <li 
                          key={(index + 1) * 4}
                          className={s.tea_units__li}
                          onClick={() => handleSetCurrentTeaUnits(unit)}
                        >
                          {unit.title}
                        </li>
                      )
                    })}
                  </ul>
                </li>
                
              </ul>

              <div>
                <div className={s.cart_tea}>
                  <img src={cartSvg} alt="cart" title="Добавить товар"/>
                  <span>{(currentTeaUnits.id == null ? 1 : currentTeaUnits.id) * props.product.price} руб</span>
                </div>
              </div>
            </div>  
          }

          {/* Everything but tea */}
          {props.product.subcategory.category.title !== 'Чай' &&
            <div className={s.cart}>
              <img src={cartSvg} alt="cart" title="Добавить товар"/>
              <span className={s.cart__btn}>В корзину</span>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Product