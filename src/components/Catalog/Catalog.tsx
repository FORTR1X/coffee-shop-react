import React, {useEffect, useState} from "react"
import {useLocation, useNavigate, useSearchParams} from "react-router-dom"
import {BASE_URL} from "../../hooks/useApi"
import useSearchParam from "../../hooks/useSearchParam"
import {CategoryType, SubcategoryType} from "../../interfaces/interfaces"
import Product from "../Product/Product"

import s from './Catalog.module.css'
import {PropsCatalogType} from "./CatalogContainer"

type OptionSortType = {
    value: string
    option: string
}

export const DEFAULT_LIMIT = 20

const Catalog: React.FC<PropsCatalogType> = (props: PropsCatalogType) => {

    const navigateTo = useNavigate()
    const searchParam = useSearchParam()

    const PAGE_PARAM_VALUE = searchParam.getPage()
    const PRICE_FROM_PARAM_VALUE = searchParam.getPriceFrom()
    const PRICE_TO_PARAM_VALUE = searchParam.getPriceTo()
    const SORT_PARAM_VALUE = searchParam.getSort()

    const sortOptions: Array<OptionSortType> = [
        {value: 'asc', option: 'Возрастанию цены'},
        {value: 'desc', option: 'Убыванию цены'}
    ]
    const [currentItemSort, setCurrentItemSort] = useState<string>('Не выбрано')

    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const [isCatalogOpen, setIsCatalogOpen] = useState(false)

    const currentPageUrlPath: string = useLocation().pathname
    const currentPageUrlPathByCategories = currentPageUrlPath.match(/\w+/g)
    const [pageCategory, setPageCategory] = useState<CategoryType | null>(null)
    const [pageSubcategory, setPageSubcategory] = useState<SubcategoryType | null>(null)
    const [priceFromInput, setPriceFromInput] = useState<number>(0)
    const [priceToInput, setPriceToInput] = useState<number>(0)

    const handleSetPriceFrom = (value: number) => {
        if (value >= 0)
            setPriceFromInput(value)
        else
            setPriceFromInput(0)
    }

    const handleSetPriceTo = (value: number) => {
        if (value >= 0)
            setPriceToInput(value)
        else
            setPriceToInput(0)
    }

    useEffect(() => {
        handleSetPageCategory()
        handleNavigateToSubcategory()
        setDefaultSearchParams()
    }, [])

    const handleSetPageCategory = () => {
        if (props.productCategories && props.productCategories.length > 0 && currentPageUrlPathByCategories) {
            props.productCategories.map((category, index) => {
                if (category.url == `/${currentPageUrlPathByCategories[0]}/`) {
                    setPageCategory(category)
                }
            })
        }
    }

    const handleNavigateToSubcategory = () => {
        if (pageCategory && props.productCategories && props.productSubcategoriesByCategory) {
            const CATEGORY_COUNT = props.productCategories.length
            const CATEGORY_URL = pageCategory.url
            let subcategoryUrl = ''

            for (let i = 0; i < CATEGORY_COUNT; i++) {
                if (props.productSubcategoriesByCategory[i][0].category.url == pageCategory.url
                    && props.productSubcategoriesByCategory[i][0].url != pageCategory.url)

                    subcategoryUrl = props.productSubcategoriesByCategory[i][0].url
                navigateTo(`${CATEGORY_URL}${subcategoryUrl}`)
            }
        }
    }

    const setDefaultSearchParams = () => {
        let isSearchPageParamNull: boolean = PAGE_PARAM_VALUE == null
        if (isSearchPageParamNull) {
            searchParam.setPage('0')
        }
    }

    useEffect(() => {
        if (pageCategory !== null
            && props.productCategories !== null
            && props.productSubcategoriesByCategory !== null
            && props.productSubcategoriesByCategory !== undefined
            && props.productSubcategoriesByCategory.length == props.productCategories.length) {

            handleSetPageSubcategory()
        }
    }, [pageCategory, props.productSubcategoriesByCategory])

    useEffect(() => {
        const page = PAGE_PARAM_VALUE

        if (pageCategory && pageSubcategory && page) {
            props.getProductTotalCount(pageSubcategory.id)

            props.getCatalogProductList({
                subcatId: pageSubcategory.id,
                page: PAGE_PARAM_VALUE,
                priceFrom: PRICE_FROM_PARAM_VALUE,
                priceTo: PRICE_TO_PARAM_VALUE,
                sort: SORT_PARAM_VALUE
            })
        }
    }, [pageCategory, pageSubcategory, PAGE_PARAM_VALUE, PRICE_FROM_PARAM_VALUE, PRICE_TO_PARAM_VALUE, SORT_PARAM_VALUE])

    const handleSetPageSubcategory = () => {
        if (props.productSubcategories && props.productSubcategories.length > 0
            && currentPageUrlPathByCategories && props.productCategories) {

            if (currentPageUrlPathByCategories[0] !== null && currentPageUrlPathByCategories[1] == null) {
                props.productCategories.map((currentCategory, index) => {
                    if (pageCategory && pageCategory.title == currentCategory.title && props.productSubcategoriesByCategory) {
                        if (props.productSubcategoriesByCategory[index].length > 0) {
                            setPageSubcategory(props.productSubcategoriesByCategory[index][0])
                            return
                        }
                    }
                })
            }

            if (currentPageUrlPathByCategories[0] !== null && currentPageUrlPathByCategories[1] !== null && pageCategory) {
                props.productCategories.map((category, index) => {
                    if (pageCategory.id == category.id
                        && props.productSubcategoriesByCategory !== null
                        && props.productSubcategoriesByCategory[index] !== undefined) {

                        props.productSubcategoriesByCategory[index].map((subcat, subIndex) => {
                            if (subcat.url == currentPageUrlPathByCategories[1])
                                setPageSubcategory(subcat)
                        })
                    }
                })
            }

        }
    }

    const handleOnChangeOptionSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrentItemSort(event.currentTarget.value)
        changeSortSearchParam(event.currentTarget.value)
    }

    const changeSortSearchParam = (sort: string) => {
        sortOptions.map((option, index) => {
            if (option.value == sort) {
                searchParam.setSort(option.value)
            }
        })
    }

    const getCountPages = (): number => {

        const LIMIT = DEFAULT_LIMIT
        const COUNT_PAGES: number = props.productTotalCount / LIMIT

        if (props.productTotalCount <= LIMIT)
            return 1

        if (COUNT_PAGES % LIMIT > 0)
            return Math.trunc(COUNT_PAGES + 1)

        if (COUNT_PAGES % LIMIT == 0)
            return COUNT_PAGES

        return 0
    }

    const getHtmlNavigationSlider = () => {

        if (pageCategory == null || pageSubcategory == null)
            return <div/>

        const COUNT_PAGES = getCountPages()
        const NUMBER_PAGE = getNumberFromStringIfExist(PAGE_PARAM_VALUE)
        let htmlPages = []

        for (let page = 0; page < COUNT_PAGES; page++) {
            htmlPages.push(
                <div
                    key={page * 11}
                    onClick={() => {
                        searchParam.setPage(page.toString())
                    }}
                    className={page == NUMBER_PAGE ? `${s.nav_page} ${s.current}` : s.nav_page}
                >
                    <span>{page + 1}</span>
                </div>
            )
        }

        return htmlPages
    }

    const getUrlPrevPage = () => {
        const PREV_PAGE_VALUE = getNumberFromStringIfExist(PAGE_PARAM_VALUE) - 1
        searchParam.setPage(PREV_PAGE_VALUE.toString())
    }

    const getUrlNextPage = () => {
        const NEXT_PAGE_VALUE = getNumberFromStringIfExist(PAGE_PARAM_VALUE) + 1
        searchParam.setPage(NEXT_PAGE_VALUE.toString())
    }

    const getNumberFromStringIfExist = (str: string | null): number => {
        return str == null ? 0 : parseInt(str)
    }

    const handleResetPriceSearchParam = () => {
        searchParam.setPrice('', '')
    }

    const handleSetPriceSearchParam = () => {
        searchParam.setPrice(priceFromInput.toString(), priceToInput.toString())
    }

    const handleIsCatalogOpen = () => {
        setIsCatalogOpen(!isCatalogOpen)

        if (isFilterOpen)
            setIsFilterOpen(false)
    }

    const handleIsFilterOpen = () => {
        setIsFilterOpen(!isFilterOpen)

        if (isCatalogOpen)
            setIsCatalogOpen(false)
    }

    return (
        <div className={s.catalog__wrapper}>
            {props.productCategories
                && props.productSubcategories
                && pageCategory !== null
                && pageSubcategory !== null
                && props.productSubcategoriesByCategory !== null
                && props.productSubcategoriesByCategory.length > 0 &&
                <div>
                    <div className={s.img__container}>
                        <img src={`${BASE_URL}/uploads/catalog/1.jpg`} alt="img" title={pageCategory.title}/>
                        <div className={s.img_title__container}>
                            <a href="/" className={s.img_title__link}>
                                <div className={s.img__arrow}/>
                                <span className={s.img__title}>{pageCategory.title}</span>
                            </a>
                        </div>
                    </div>
                    <div className={s.catalog__content}>
                        <div className={s.catalog__characteristic}>

                            <div className={s.catalog_mobile_spoiler}>
                                <div
                                    onClick={() => {
                                        handleIsCatalogOpen()
                                    }}
                                    className={s.catalog_spoiler}
                                >
                                    <div className={isCatalogOpen ? `${s.burger_menu} ${s.opened}` : s.burger_menu}>
                                        <div className={s.burger_menu_line}/>
                                    </div>

                                    <span>Каталог</span>
                                </div>

                                <div
                                    onClick={() => {
                                        handleIsFilterOpen()
                                    }}
                                    className={s.filter_spoiler}
                                >
                                    <span>Фильтр</span>
                                    <div
                                        className={isFilterOpen ? `${s.filter__arrows} ${s.opened}` : s.filter__arrows}>
                                        <div className={s.filter__arrow_up}/>
                                        <div className={s.filter__arrow_down}/>
                                    </div>
                                </div>
                            </div>

                            <div
                                className={isCatalogOpen ? `${s.characteristic__content} ${s.opened}` : s.characteristic__content}>
                                <span className={s.characteristic__title}>Каталог</span>

                                {props.productCategories.map((currentCategory, index) => {
                                    return (
                                        <div key={index * 2} className={s.spoiler__container}>
                                            <ul className={s.spoiler__ul}>
                                                {/* if category have subcategory */}
                                                {props.productSubcategoriesByCategory !== null
                                                    && props.productSubcategoriesByCategory[index] !== undefined
                                                    && props.productSubcategoriesByCategory[index] !== null
                                                    && props.productSubcategoriesByCategory[index].length > 1 &&
                                                    <div onClick={(event) => {
                                                        event.currentTarget.classList.toggle(s.opened)
                                                    }}
                                                         className={pageCategory.url == currentCategory.url ? `${s.spoiler__title_container} ${s.opened}` : s.spoiler__title_container}>
                            <span
                                className={pageCategory.url == currentCategory.url ? `${s.spoiler__title} ${s.active}` : s.spoiler__title}>
                              {currentCategory.title}
                            </span>

                                                        <div className={s.title_container__btn}/>
                                                    </div>
                                                }
                                                {/* if category without subcategory */}
                                                {props.productSubcategoriesByCategory
                                                    && props.productSubcategoriesByCategory[index] !== null
                                                    && props.productSubcategoriesByCategory[index] !== undefined
                                                    && props.productSubcategoriesByCategory[index].length <= 1 &&
                                                    <a href={currentCategory.url}
                                                       className={currentCategory.url == pageCategory.url ? `${s.spoiler__title} ${s.active}` : s.spoiler__title}>
                                                        {currentCategory.title}
                                                    </a>
                                                }
                                                {props.productSubcategoriesByCategory
                                                    && pageSubcategory
                                                    && props.productSubcategoriesByCategory[index] !== null
                                                    && props.productSubcategoriesByCategory[index] !== undefined
                                                    && props.productSubcategoriesByCategory[index].length > 1
                                                    && props.productSubcategoriesByCategory[index].map((currentSubcategory, subIndex) => {
                                                        return (
                                                            <li key={subIndex * 3}
                                                                className={pageSubcategory.url == currentSubcategory.url ? `${s.spoiler__li} ${s.active}` : s.spoiler__li}>
                                                                <a href={`${currentCategory.url}${currentSubcategory.url}`}>
                                                                    {currentSubcategory.title}
                                                                </a>
                                                            </li>
                                                        )
                                                    })}
                                            </ul>
                                        </div>
                                    )
                                })}

                            </div>

                            <div className={isFilterOpen ? `${s.filter__by_price} ${s.opened}` : s.filter__by_price}>
                                <span>Фильтр по цене</span>

                                <div className={s.split_line}/>

                                <div className={s.filter__by_price_content}>
                                    <div className={s.price__selector}>
                                        <div className={s.price__from}>
                                            <input
                                                onChange={(event) => {
                                                    handleSetPriceFrom(parseInt(event.currentTarget.value))
                                                }}
                                                value={priceFromInput}
                                                type="text"
                                                placeholder="руб"/>
                                            <span>от</span>
                                        </div>

                                        <div className={s.price__to}>
                                            <span>до</span>
                                            <input
                                                onChange={(event) => {
                                                    handleSetPriceTo(parseInt(event.currentTarget.value))
                                                }}
                                                value={priceToInput}
                                                type="text"
                                                placeholder="руб"/>
                                        </div>

                                    </div>

                                    <div className={s.btn__group}>
                                        <button onClick={() => {
                                            handleResetPriceSearchParam()
                                        }} className={s.btn__reset}>
                                            <div className={s.reset__circle}/>
                                            <span>Сбросить</span>
                                        </button>
                                        <button onClick={() => {
                                            handleSetPriceSearchParam()
                                        }} className={s.btn__search}>
                                            <span>Поиск</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={s.catalog__products}>
                            <div className={s.top__content}>
                                {pageCategory !== null && pageSubcategory !== null &&
                                    <div className={s.bread_crumbs}>
                                        <a href="/">Главная /</a>
                                        {pageSubcategory.title == pageCategory.title &&
                                            <span>{pageCategory.title}</span>
                                        }
                                        {pageSubcategory.title !== pageCategory.title &&
                                            <div>
                                                <a href={pageCategory.url}>{pageCategory.title} /</a>
                                                <span>{pageSubcategory.title}</span>
                                            </div>
                                        }
                                    </div>
                                }

                                <form className={s.chooser_sort}>
                                    <label className={s.chooser_sort__label} htmlFor="sort">Сортировка по: </label>
                                    <select className={s.chooser_sort__select} value={currentItemSort}
                                            onChange={(event) => {
                                                handleOnChangeOptionSort(event)
                                            }} name="sort" id="sort">
                                        <option disabled hidden>Не выбрано</option>
                                        {sortOptions.map((option, index) => {
                                            return (
                                                <option key={index * 5} value={option.value}>
                                                    {option.option}
                                                </option>)
                                        })}
                                    </select>
                                    <div className={s.underiline}/>
                                </form>
                            </div>

                            {props.productList !== null && props.productList.length > 0 &&
                                <div className={s.products__container}>
                                    <div className={s.products_content}>
                                        {props.productList && props.productList.map((product, index) => {
                                            return (
                                                <Product key={index * 9} productList={props.productList}
                                                         product={product}/>
                                            )
                                        })}
                                    </div>

                                    <div className={s.products__navigation}>
                                        {PAGE_PARAM_VALUE != null && parseInt(PAGE_PARAM_VALUE) > 0 &&
                                            <div onClick={() => getUrlPrevPage()} className={s.prev_page}>
                                                <div className={s.prev_arrow}/>
                                            </div>
                                        }

                                        {getHtmlNavigationSlider()}

                                        {PAGE_PARAM_VALUE != null && (getCountPages() - 1) != parseInt(PAGE_PARAM_VALUE) &&
                                            <div onClick={() => getUrlNextPage()} className={s.next_page}>
                                                <div className={s.next_arrow}/>
                                            </div>
                                        }
                                    </div>
                                </div>
                            }
                            {props.productList == null || props.productList.length == 0 &&
                                <div className={s.product_list__error}>
                                    <h3>Ошибка!</h3>
                                    <span className={s.error_status}>404</span>
                                    <span>Страница не найдена :(</span>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Catalog