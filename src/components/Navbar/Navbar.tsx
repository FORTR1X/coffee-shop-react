import React, { useEffect, useState } from "react"

import s from './styles/Navbar.module.css'
import './styles/index.css'

import cart from './cart.svg'
import search from './search.svg'

import { CSSTransition } from "react-transition-group"

import { CategoryType, SubcategoryType, ProductType, UserType, CompanyCategoryType } from "../../interfaces/interfaces"
import Spoiler from "./Spoiler/Spoiler"
import { PropsNavbar } from "./NavbarContainer"
import axios from "axios"

const Navbar: React.FC<PropsNavbar> = (props) => {

  let uniqueKey = 0;

  useEffect( () => {
    if (props.productCategories == null && props.companyCategories == null) {
      props.getCompanyCategories()
      props.getProductCategories()
    }
  }, [props.productCategories])

  useEffect( () => {
    if (props.productCategories !== null && subcategoriesByCategoryResult.length == 0) {

      props.productCategories.map(async (category, index) => {
        let response: SubcategoryType[] = await props.getProductSubcategories(category.id)
        subcategoriesByCategoryResult?.push(response)
        if (subcategoriesByCategoryResult.length == props.productCategories?.length)
          props.setSubcategoriesByCategory(subcategoriesByCategoryResult)
      })

    }
  }, [props.productCategories])

  let subcategoriesByCategoryResult: SubcategoryType[][] = []
  let subcategoriesByCategory: SubcategoryType[][] | null = props.productSubcategoriesByCategory;

  const topCategories: Array<CompanyCategoryType> | null = props.companyCategories
  const bottomCategories: Array<CategoryType> | null = props.productCategories //.sort((a, b) => a.title.length > b.title.length ? -1 : 1)
  const bottomSubcategories: Array<SubcategoryType> = [
    { id: 1, title: 'Моносорта', url: '/monosorta' },
    { id: 2, title: 'Смеси', url: '/smesi' },
    { id: 3, title: 'Чёрный', url: '/cherniy' },
    { id: 4, title: 'Зеленый', url: '/zeleniy' },
    { id: 5, title: 'Улун', url: '/ulun' },
    { id: 6, title: 'Белый', url: '/beliy' },
    { id: 7, title: 'Пуэр', url: '/puer' },
    { id: 8, title: 'Травяные', url: '/travyanie' },
    { id: 9, title: 'Красный', url: '/krasniy' }
  ].sort((a, b) => a.title.length > b.title.length ? -1 : 1)

  const cartProductList: Array<ProductType> = [ 
    { id: 1, header: 'Пуэр 1', price: 12, description: 'Вкусный питательный чайок' },
    { id: 2, header: 'Пуэр 2', price: 1200, description: 'Вкусный питательный чайок' },
    { id: 3, header: 'Пуэр 3', price: 120, description: 'Вкусный питательный чайок' },
    { id: 4, header: 'Пуэр 4', price: 1203, description: 'Вкусный питательный чайок' },
    { id: 5, header: 'Пуэр 5', price: 1220, description: 'Вкусный питательный чайок' },
    { id: 6, header: 'Пуэр 6', price: 1120, description: 'Вкусный питательный чайок' },
    { id: 7, header: 'Пуэр 7', price: 1210, description: 'Вкусный питательный чайок' },
    { id: 8, header: 'Пуэр 8', price: 1290, description: 'Вкусный питательный чайок' },
    { id: 9, header: 'Пуэр 9', price: 1260, description: 'Вкусный питательный чайок' },
    { id: 10, header: 'Пуэр 10', price: 1220, description: 'Вкусный питательный чайок' },
   ]

   let totalCostCart: number = 0;

  const user: UserType = {
    email: 'example@gmail.com',
    phoneNumber: '+7 (978)-779-02-36'
  }
  let countGoodsInCart: number = 3;

  const [isSearchOpen, setIsSearchOpen] = useState<boolean | undefined>(false)
  const handleOnClickSearch = (state?: boolean): void => {
    handleIsCategoryHovered(false)
    
    if (state !== undefined)
      setIsSearchOpen(state)

    if (state == undefined)  
      setIsSearchOpen(!isSearchOpen)
  }

  const [isHamburgerOpen, setIsHamburgerOpen] = useState<boolean | undefined>(false)
  const toggleHamburger = (): void => {
    setIsHamburgerOpen(!isHamburgerOpen)
    handleOnClickSearch(false)
  }

  const [isCategoryHovered, setIsCategoryHovered] = useState<boolean | undefined>(false)
  const [currentSelectedCategory, setCurrentSelectedCategory] = useState<CategoryType | null>(null)
  const handleIsCategoryHovered = (isState: boolean, currentCategory?: CategoryType): void => {
    setIsCategoryHovered(isState)
    setIsSearchOpen(false)
    if (currentCategory !== undefined) {
      setCurrentSelectedCategory(currentCategory)
    }
  }

  const deleteFromCart = (productId: number, index: number): void => {
    if (cartProductList[index].id == productId)
      cartProductList.splice(index, 1)
  }

  const [isCartOpen, setIsCartOpen] = useState<boolean | undefined>(false);
  const handleIsCartOpen = (state?: boolean):void => {
    if (state == undefined)
      setIsCartOpen(!isCartOpen)

    if (state !== undefined)
      setIsCartOpen(state)

      totalCostCart = 0;  
  }

  console.log(subcategoriesByCategory)
  // TODO ругается что length не найден


  return (
    <div>
      {(subcategoriesByCategory !== null && topCategories != null && bottomCategories !== null) && 
        <nav className={s.header}>
          <div className={s.header__top}>
            <div className={s.header__top_container}>
              <ul className={s.header__top_ul}>
                {topCategories.map((category, index) => 
                  <li key={++uniqueKey}>
                    <a onClick={() => handleIsCategoryHovered(false)} className={s.header__top_li} href={category.url} >
                      {category.title}
                    </a>
                  </li>
                )}
              </ul>
              <span onClick={() => handleIsCategoryHovered(false)} className={s.header__number}>{user.phoneNumber}</span>
            </div>
          </div>

          {/* lg */}
          <div className={s.header__bottom}>
            <div className={s.header__bottom_container}>
              <a className={s.header__bottom_logo} href="/"/>

              <ul className={s.category__ul}>
                {bottomCategories.map(category => 
                  <li
                    className={s.category__li}
                    onClick={ (event) => {event.currentTarget.classList.toggle(`${s.active}`);} }
                  >
                    {/* lg display */}
                    <a 
                      key={++uniqueKey * 5}
                      href={category.url}
                      className={s.header__text_animation}
                      onMouseEnter={ () => handleIsCategoryHovered(true, category) }
                      onMouseLeave={ () => handleIsCategoryHovered(false) }
                    >
                      {category.title}
                    </a>

                    {/* md display */}
                    {subcategoriesByCategory !== null && subcategoriesByCategory.length !== undefined && subcategoriesByCategory.length > 0 && subcategoriesByCategory[category.id - 1].length == 0 && subcategoriesByCategory.length == bottomCategories.length &&
                      <a
                        key={++uniqueKey * 10}
                        href={category.url}
                        className={s.header__text_animation_md}
                      >
                        {category.title}
                      </a>
                    }
                    {subcategoriesByCategory !== null && subcategoriesByCategory.length !== undefined && subcategoriesByCategory.length > 0 && subcategoriesByCategory[category.id - 1].length > 0 && subcategoriesByCategory.length == bottomCategories.length &&
                      <span
                        key={++uniqueKey * 10}
                        className={s.header__text_animation_md}
                        onClick={() => {
                          handleIsCategoryHovered(!isCategoryHovered, category)
                        }}
                      >
                        {category.title}
                      </span>
                    }

                    {subcategoriesByCategory !== null && subcategoriesByCategory.length !== undefined && subcategoriesByCategory.length > 0 && subcategoriesByCategory.length == bottomCategories.length && subcategoriesByCategory[category.id - 1].length > 0 &&
                      <div>
                        <div className={s.subcategory__ul_outside} />

                        <ul className={s.subcategory__ul}>
                          <div
                            className={s.subcategory__content}
                            onMouseEnter={ () => handleIsCategoryHovered(true) }
                            onMouseLeave={ () => handleIsCategoryHovered(false) }
                          >
                            <div className={s.subcategory__trinagle}/>
                              <div className={s.subcategory__container} >
                                {subcategoriesByCategory[category.id - 1].length > 0 && subcategoriesByCategory[category.id - 1].map(subcat => {
                                  return (
                                    <li className={s.subcategory__li}>
                                      <a key={++uniqueKey * 100} className={s.subcategory__li_link} href={`${currentSelectedCategory?.url}${subcat.url}`}>
                                        {subcat.title}
                                      </a>
                                    </li>
                                  )
                                })}
                              </div>
                          </div> 
                        </ul>
                      </div>
                    }
                  </li>
                )}
              </ul>


              {/* for lg */}
              <form onClick={ () => handleIsCartOpen(false) } className={s.search__form} action="#">
                <input 
                  className={s.search__input}
                  type="text"
                  placeholder="Поиск"
                />

                <button className={s.search__btn} type="submit">
                  <a href="/search"/>
                </button>
              </form>

              {/* for md */}
              <img 
                className={s.header__icon_md}
                src={search}
                alt="img"
                onClick={() => handleOnClickSearch()}
              />

              <div className={s.cart__wrapper}>
                {isCartOpen && 
                  <div
                    onClick={ () => {handleIsCartOpen(false)} }
                    className={s.cart__outside} 
                  />
                }
                <ul className={s.cart__category_ul}>
                  <li className={s.cart__category_li}>
                    <div 
                      className={s.header__cart}
                      onClick={ () => {handleIsCartOpen()} }
                    >
                      <img className={s.header__cart_svg} alt="КОРЗИНА" src={cart}/>
                      <div className={s.header__cart_circle}/>
                      <span className={s.header__cart_count}>{countGoodsInCart}</span>
                    </div>

                    <CSSTransition
                      in={isCartOpen} 
                      timeout={300} 
                      unmountOnExit 
                      classNames='menu'
                    >
                      <ul className={s.cart__subcategory_ul}>
                        <div className={s.cart__subcategory_header}>
                          <span className={s.header__span}>КОРЗИНА ({countGoodsInCart})</span>
                            <span 
                              className={s.header__close}
                              onClick={(event) => {
                                handleIsCartOpen(false)
                                event.currentTarget.classList.add(`${s.active}`)
                              }}
                            />
                        </div>
                        <div className={s.cart__subcategory_container}>
                          {cartProductList.map((product, index) => {
                            return (
                              <div key={++uniqueKey} className={s.product}>
                                <div className={s.product__container}>
                                  <div className={s.product__img} />
                                  <div className={s.product__content}>
                                    <div className={s.product__content_top}>
                                      <span className={s.product__title}>{product.header}</span>
                                      <span onClick={ () => deleteFromCart(product.id, index) } className={s.product__delete}/>
                                    </div>

                                    <div className={s.product__content_bottom}>
                                      <span className={s.product__count}>100 гр.</span>
                                      <span className={s.product__price}>{product.price} р.</span>
                                    </div>
                                    <span style={{ 'display': 'none' }}>{totalCostCart += product.price}</span>
                                  </div>
                                </div>
                              </div>
                            )
                          })}
                        </div>

                        <div className={s.cart__footer}>
                          <div className={s.cart__footer_total}>
                            <span className={s.cart__total_title}>ИТОГО</span>
                            <span className={s.cart__total_value}>{totalCostCart} р.</span>
                          </div>

                          <div 
                            className={s.cart__footer_btn}
                            onClick={ (event) => {event.currentTarget.classList.add(`${s.active}`);} }
                          >
                            ОФОРМИТЬ ЗАКАЗ
                          </div>
                        </div>  

                      </ul>
                    </CSSTransition>  
                  </li>
                </ul>

                <div 
                  className={isHamburgerOpen ? `${s.burger__container} ${s.burger__active}` : s.burger__container} 
                  onClick={toggleHamburger}
                >
                  <span/>
                </div>
              </div>
            </div>
          </div>

          {/* md */}
          <div className={s.header__bottom_md}>
            <div className={s.header__bottom_container_md}>
              <img className={s.header__icon_md} src={search} alt="ПОИСК" onClick={() => handleOnClickSearch()}/>
              <a className={s.header__bottom_logo} href="/"/>

              <div style={{ 
                'display': 'flex',
              }}>
                <ul className={s.cart__category_ul}>
                  <li className={s.cart__category_li}>
                    <div 
                      className={s.header__cart}
                      onClick={ () => {handleIsCartOpen()} }
                    >
                      <img className={s.header__cart_svg} alt="КОРЗИНА" src={cart}/>
                      <div className={s.header__cart_circle}/>
                      <span className={s.header__cart_count}>{countGoodsInCart}</span>
                    </div>

                    <CSSTransition
                      in={isCartOpen} 
                      timeout={300} 
                      unmountOnExit 
                      classNames='menu'
                    >
                      <ul className={s.cart__subcategory_ul}>
                        <div className={s.cart__subcategory_header}>
                          <span className={s.header__span}>КОРЗИНА ({countGoodsInCart})</span>
                            <span 
                              className={s.header__close}
                              onClick={(event) => {
                                handleIsCartOpen(false)
                                event.currentTarget.classList.add(`${s.active}`)
                              }}
                            >
                              12
                            </span>
                        </div>
                        <div className={s.cart__subcategory_container}>
                          {cartProductList.map((product, index) => {
                            return (
                              <div key={++uniqueKey} className={s.product}>
                                <div className={s.product__container}>
                                  <div className={s.product__img} />
                                  <div className={s.product__content}>
                                    <div className={s.product__content_top}>
                                      <span className={s.product__title}>{product.header}</span>
                                      <span onClick={ () => deleteFromCart(product.id, index) } className={s.product__delete}/>
                                    </div>

                                    <div className={s.product__content_bottom}>
                                      <span className={s.product__count}>100 гр.</span>
                                      <span className={s.product__price}>{product.price} р.</span>
                                    </div>
                                    <span style={{ 'display': 'none' }}>{totalCostCart += product.price}</span>
                                  </div>
                                </div>
                              </div>
                            )
                          })}
                        </div>

                        <div className={s.cart__footer}>
                          <div className={s.cart__footer_total}>
                            <span className={s.cart__total_title}>ИТОГО</span>
                            <span className={s.cart__total_value}>{totalCostCart} р.</span>
                          </div>

                          <div 
                            className={s.cart__footer_btn}
                            onClick={ (event) => {event.currentTarget.classList.add(`${s.active}`);} }
                          >
                            ОФОРМИТЬ ЗАКАЗ
                          </div>
                        </div>  

                      </ul>
                    </CSSTransition>  
                  </li>
                </ul>

                <div 
                  className={isHamburgerOpen ? `${s.burger__container} ${s.burger__active}` : s.burger__container} 
                  onClick={() => toggleHamburger()}
                >
                  <span/>
                </div>
              </div>
            </div>

            {subcategoriesByCategory !== null && subcategoriesByCategory.length > 0 &&
              <CSSTransition 
                in={isHamburgerOpen} 
                timeout={300} 
                unmountOnExit 
                classNames='menu'
              >   
                <div className={s.burger__menu}>
                  <div className={s.burger__menu_container}>
                    {bottomCategories.map(category => {
                        return <Spoiler
                                  key={++uniqueKey}
                                  title={category.title}
                                  content={subcategoriesByCategory !== null ? subcategoriesByCategory[category.id - 1] : null}
                                  categoryUrl={category.url}
                                />
                      })
                    }
                  </div>
                </div>
              </CSSTransition>
            }  
          </div>
                
          <CSSTransition 
            in={isSearchOpen} 
            timeout={300} 
            unmountOnExit 
            classNames='search'
          >
            <div className='header__search_md'>
              <input className='header__search_input' type="text" placeholder="Поиск"/>
              <a href="#">
                <button className='header__search_btn'/>
              </a>
            </div>
          </CSSTransition>
        
        </nav>
      }
    </div>
  )
}

export default Navbar