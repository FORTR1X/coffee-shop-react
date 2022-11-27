import React, {useEffect, useRef, useState} from "react"

import s from './styles/Navbar.module.css'
import './styles/index.css'

import cart from './cart.svg'
import search from './search.svg'

import {CSSTransition} from "react-transition-group"

import {
    CategoryType,
    SubcategoryType,
    ProductType,
    UserType,
    CompanyCategoryType,
    CartType
} from "../../interfaces/interfaces"
import Spoiler from "./Spoiler/Spoiler"
import {PropsNavbar} from "./NavbarContainer"
import {useLocalStorage} from "usehooks-ts"
import {mapCartTypeToProductsIds} from "../../mapper/mapCartTypeToProductsIds"

const Navbar: React.FC<PropsNavbar> = (props) => {

    let uniqueKey = 0;

    useEffect(() => {
        if (props.productCategories == null && props.companyCategories == null) {
            props.getCompanyCategories()
            props.getProductCategories()
            props.getUser()
            props.getAllSubcategories()
        }
    }, [props.productCategories])

    useEffect(() => {
        if (props.productCategories !== null && subcategoriesByCategoryResult.length == 0)
            handleGetSubcategoriesByCategory()
    }, [props.productCategories])

    const handleGetSubcategoriesByCategory = async (): Promise<void> => {
        let resultArray: SubcategoryType[][] = []
        if (props.productCategories !== null && props.productCategories.length !== undefined)
            for (let i = 0; i < props.productCategories.length; i++) {
                let res = await props.getProductSubcategories(i + 1)
                resultArray.push(res)
            }

        props.setSubcategoriesByCategory(resultArray)
    }

    let subcategoriesByCategoryResult: SubcategoryType[][] = []
    let subcategoriesByCategory: SubcategoryType[][] | null = props.productSubcategoriesByCategory;
    const topCategories: Array<CompanyCategoryType> | null = props.companyCategories
    const bottomCategories: Array<CategoryType> | null = props.productCategories //.sort((a, b) => a.title.length > b.title.length ? -1 : 1)
    const cartProductList: Array<ProductType> | null = props.cartProductList
    const user: UserType | null = props.user;

    const [totalCostCart, setTotalCostCart] = useState(0)
    const [countGoodsInCart, setCountGoodsInCart] = useState(0)

    const [cartStorage, setCartStorage] = useLocalStorage('cart', [] as Array<CartType>)

    useEffect(() => {
        if (cartStorage !== null && cartStorage.length > 0) {
            props.getCartProductList(mapCartTypeToProductsIds(cartStorage))
        }
        if (cartStorage !== null && cartStorage.length == 0) {
            props.setCartProductList(null)
        }
    }, [cartStorage])

    useEffect(() => {
        if (cartProductList !== null) {
            setCountGoodsInCart(cartProductList.length)

            handleGetTotalCostCart()
        }

        if (cartProductList == null) {
            setCountGoodsInCart(0)
        }
    }, [cartProductList])

    const handleGetTotalCostCart = () => {
        let totalCost = 0
        if (cartProductList !== null && cartProductList.length > 0)
            cartProductList.map((product, index) => {
                totalCost += (product.price * cartStorage[index].count)
            })

        setTotalCostCart(totalCost)
    }

    const [searchValue, setSearchValue] = useState('')
    const handleSetSearchValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value)
    }

    const isSearchOpen = props.isSearchOpen
    const handleOnClickSearch = (state?: boolean): void => {
        handleIsCategoryHovered(false)

        if (state !== undefined)
            props.setIsSearchOpen(state)

        if (state == undefined)
            props.setIsSearchOpen(!isSearchOpen)
    }

    const isHamburgerOpen = props.isHamburgerOpen
    const toggleHamburger = (): void => {
        props.setHamburgerOpen(!isHamburgerOpen)
        handleOnClickSearch(false)
    }

    const isCategoryHovered = props.isCategoryHovered
    const currentSelectedCategory = props.currentSelectedCategory
    const handleIsCategoryHovered = (isState: boolean, currentCategory?: CategoryType): void => {
        props.setIsCategoryHovered(isState)
        props.setIsSearchOpen(false)
        if (currentCategory !== undefined) {
            props.setCurrentSelectedCategory(currentCategory)
        }
    }

    const deleteFromCart = (productId: number, index: number): void => {
        let subCartArray = cartStorage
        if (subCartArray[index].productId == productId)
            subCartArray.splice(index, 1)
        setCartStorage(subCartArray)
    }

    const isCartOpen = props.isCartOpen
    const handleIsCartOpen = (state?: boolean): void => {
        if (state == undefined)
            props.setIsCartOpen(!isCartOpen)

        if (state !== undefined)
            props.setIsCartOpen(state)

    }

    return (
        <header>
            {(subcategoriesByCategory !== null
                    && topCategories != null && bottomCategories !== null && bottomCategories.length !== undefined
                    && user !== null && subcategoriesByCategory.length === bottomCategories.length) &&
                <nav className={s.header}>
                    <div className={s.header__top}>
                        <div className={s.header__top_container}>
                            <ul className={s.header__top_ul}>
                                {topCategories.map((category, index) =>
                                    <li key={++uniqueKey * 30}>
                                        <a onClick={() => handleIsCategoryHovered(false)} className={s.header__top_li}
                                           href={category.url}>
                                            {category.title}
                                        </a>
                                    </li>
                                )}
                            </ul>
                            <span onClick={() => handleIsCategoryHovered(false)}
                                  className={s.header__number}>{user.phoneNumber}</span>
                        </div>
                    </div>

                    {/* lg */}
                    <div className={s.header__bottom}>
                        <div className={s.header__bottom_container}>
                            <a className={s.header__bottom_logo} href="/"/>

                            <ul className={s.category__ul}>
                                {bottomCategories.map(category =>
                                        <li
                                            key={++uniqueKey * 5}
                                            className={s.category__li}
                                            onClick={(event) => {
                                                event.currentTarget.classList.toggle(`${s.active}`)
                                            }}
                                        >
                                            {/* lg display */}

                                            <a
                                                href={category.url}
                                                className={s.header__text_animation}
                                                onMouseEnter={() => handleIsCategoryHovered(true, category)}
                                                onMouseLeave={() => handleIsCategoryHovered(false)}
                                            >
                      <span
                          className={subcategoriesByCategory !== null && subcategoriesByCategory[category.id - 1].length > 1 ? `${s.down_arrow}` : ''}>
                        {category.title}
                      </span>
                                            </a>

                                            {/* md display */}
                                            {subcategoriesByCategory !== null && subcategoriesByCategory.length !== undefined && subcategoriesByCategory.length > 1 && subcategoriesByCategory[category.id - 1].length <= 1 && subcategoriesByCategory.length == bottomCategories.length &&
                                                <a
                                                    href={category.url}
                                                    className={s.header__text_animation_md}
                                                >
                                                    {category.title}
                                                </a>
                                            }
                                            {subcategoriesByCategory !== null && subcategoriesByCategory.length !== undefined && subcategoriesByCategory.length > 1 && subcategoriesByCategory[category.id - 1].length > 1 && subcategoriesByCategory.length == bottomCategories.length &&
                                                <span
                                                    className={s.header__text_animation_md}
                                                    onClick={() => {
                                                        handleIsCategoryHovered(!isCategoryHovered, category)
                                                    }}
                                                >
                        <span
                            className={subcategoriesByCategory !== null && subcategoriesByCategory[category.id - 1].length > 1 ? `${s.down_arrow}` : ''}>
                          {category.title}
                        </span>
                      </span>
                                            }

                                            {subcategoriesByCategory !== null && subcategoriesByCategory.length !== undefined && subcategoriesByCategory.length > 0 && subcategoriesByCategory.length == bottomCategories.length && subcategoriesByCategory[category.id - 1].length > 1 &&
                                                <div>
                                                    <div className={s.subcategory__ul_outside}/>

                                                    <ul className={s.subcategory__ul}>
                                                        <div
                                                            className={s.subcategory__content}
                                                            onMouseEnter={() => handleIsCategoryHovered(true)}
                                                            onMouseLeave={() => handleIsCategoryHovered(false)}
                                                        >
                                                            <div className={s.subcategory__trinagle}/>
                                                            <div className={s.subcategory__container}>
                                                                {subcategoriesByCategory[category.id - 1].length > 1 && subcategoriesByCategory[category.id - 1].map(subcat => {
                                                                    return (
                                                                        <li key={++uniqueKey * 10}
                                                                            className={s.subcategory__li}>
                                                                            <a className={s.subcategory__li_link}
                                                                               href={`${currentSelectedCategory?.url}${subcat.url}`}>
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
                            <form onClick={() => handleIsCartOpen(false)} className={s.search__form}>
                                <input
                                    className={s.search__input}
                                    type="text"
                                    placeholder="Поиск"
                                    value={searchValue}
                                    onChange={(event) => {
                                        handleSetSearchValue(event)
                                    }}
                                />

                                <a className={s.search__btn} href={`/search?q=${searchValue}`}/>
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
                                        onClick={() => {
                                            handleIsCartOpen(false)
                                        }}
                                        className={s.cart__outside}
                                    />
                                }
                                <ul className={s.cart__category_ul}>
                                    <li className={s.cart__category_li}>
                                        <div
                                            className={s.header__cart}
                                            onClick={() => {
                                                handleIsCartOpen()
                                            }}
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
                                                    {/* Корзина не пустая */}
                                                    {cartProductList !== null && cartProductList.map((product, index) => {
                                                        return (
                                                            <div key={++uniqueKey * 15} className={s.product}>
                                                                <div className={s.product__container}>
                                                                    <img
                                                                        src={`http://localhost:8080/uploads/product/${product.id}.jpg`}
                                                                        className={s.product__img}/>
                                                                    <div className={s.product__content}>
                                                                        <div className={s.product__content_top}>
                                                                            <span
                                                                                className={s.product__title}>{product.header}</span>
                                                                            <span
                                                                                onClick={() => deleteFromCart(product.id, index)}
                                                                                className={s.product__delete}/>
                                                                        </div>

                                                                        <div className={s.product__content_bottom}>
                                                                            {product.subcategory.category.title == 'Чай' &&
                                                                                <span
                                                                                    className={s.product__count}>{cartStorage[index] !== undefined ? 50 * cartStorage[index].count : 50} гр</span>
                                                                            }
                                                                            {product.subcategory.category.title != 'Чай' &&
                                                                                <span
                                                                                    className={s.product__count}>{cartStorage[index] !== undefined ? cartStorage[index].count : 1} шт</span>
                                                                            }
                                                                            <span
                                                                                className={s.product__price}>{cartStorage[index] !== undefined ? product.price * cartStorage[index].count : product.price} р.</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })}

                                                    {/* Корзина пустая */}
                                                    {cartProductList === null &&
                                                        <div className={s.cart__empty}>
                                                            КОРЗИНА ПУСТАЯ :(
                                                        </div>
                                                    }
                                                </div>

                                                {cartProductList !== null &&
                                                    <div className={s.cart__footer}>
                                                        <div className={s.cart__footer_total}>
                                                            <span className={s.cart__total_title}>ИТОГО</span>
                                                            <span
                                                                className={s.cart__total_value}>{totalCostCart} р.</span>
                                                        </div>

                                                        <a
                                                            href={'/checkout'}
                                                            className={s.cart__footer_btn}
                                                            onClick={(event) => {
                                                                event.currentTarget.classList.add(`${s.active}`);
                                                            }}
                                                        >
                                                            ОФОРМИТЬ ЗАКАЗ
                                                        </a>
                                                    </div>
                                                }
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
                            <img className={s.header__icon_md} src={search} alt="ПОИСК"
                                 onClick={() => handleOnClickSearch()}/>
                            <a className={s.header__bottom_logo} href="/"/>

                            <div style={{
                                'display': 'flex',
                            }}>
                                <ul className={s.cart__category_ul}>
                                    <li className={s.cart__category_li}>
                                        <div
                                            className={s.header__cart}
                                            onClick={() => {
                                                handleIsCartOpen()
                                            }}
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
                                                    {/* Корзина не пустая */}
                                                    {cartProductList !== null && cartProductList.map((product, index) => {
                                                        return (
                                                            <div key={++uniqueKey * 20} className={s.product}>
                                                                <div className={s.product__container}>
                                                                    <img
                                                                        src={`http://localhost:8080/uploads/product/${product.id}.jpg`}
                                                                        className={s.product__img}/>
                                                                    <div className={s.product__content}>
                                                                        <div className={s.product__content_top}>
                                                                            <span
                                                                                className={s.product__title}>{product.header}</span>
                                                                            <span
                                                                                onClick={() => deleteFromCart(product.id, index)}
                                                                                className={s.product__delete}/>
                                                                        </div>

                                                                        <div className={s.product__content_bottom}>
                                                                            {product.subcategory.category.title == 'Чай' &&
                                                                                <span
                                                                                    className={s.product__count}>{cartStorage[index] !== undefined ? 50 * cartStorage[index].count : 50} гр</span>
                                                                            }
                                                                            {product.subcategory.category.title != 'Чай' &&
                                                                                <span
                                                                                    className={s.product__count}>{cartStorage[index] !== undefined ? cartStorage[index].count : 1} шт</span>
                                                                            }
                                                                            <span
                                                                                className={s.product__price}>{cartStorage[index] !== undefined ? product.price * cartStorage[index].count : product.price} р.</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })}

                                                    {/* Корзина пустая */}
                                                    {cartProductList === null &&
                                                        <div className={s.cart__empty}>
                                                            КОРЗИНА ПУСТАЯ :(
                                                        </div>
                                                    }
                                                </div>

                                                {cartProductList !== null &&
                                                    <div className={s.cart__footer}>
                                                        <div className={s.cart__footer_total}>
                                                            <span className={s.cart__total_title}>ИТОГО</span>
                                                            <span
                                                                className={s.cart__total_value}>{totalCostCart} р.</span>
                                                        </div>

                                                        <a
                                                            href={'/checkout'}
                                                            className={s.cart__footer_btn}
                                                            onClick={(event) => {
                                                                event.currentTarget.classList.add(`${s.active}`);
                                                            }}
                                                        >
                                                            ОФОРМИТЬ ЗАКАЗ
                                                        </a>
                                                    </div>
                                                }

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
                                                key={++uniqueKey * 25}
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
                            <input value={searchValue} onChange={(event) => {
                                handleSetSearchValue(event)
                            }} className='header__search_input' type="text" placeholder="Поиск"/>
                            <a className='header__search_btn' href={`/search/?q=${searchValue}`}/>
                        </div>
                    </CSSTransition>

                </nav>
            }
        </header>
    )
}

export default Navbar