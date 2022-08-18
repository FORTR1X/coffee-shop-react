import React, { useEffect, useRef, useState } from "react"
import { PropsCatalog } from "./CatalogContainer"
import s from './Catalog.module.css'

// import Swiper JS
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, A11y } from 'swiper'
// import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

import Category from "./Category/Category"
import { CategoryType, SubcategoryType } from "../../interfaces/interfaces"

const Catalog: React.FC<PropsCatalog> = (props) => {

  const [countColumnsCategory, setCountColumnsCategory] = useState(5)
  useEffect( () => {
    let pageWidth = document.documentElement.scrollWidth

    if (pageWidth < 1271)
      setCountColumnsCategory(4)

    if (pageWidth < 941)
      setCountColumnsCategory(3)

    if (pageWidth < 731)
      setCountColumnsCategory(2)

    if (pageWidth < 501)
      setCountColumnsCategory(1)  

  }, [document.documentElement.scrollWidth])

  // Count Categories In Catalog for swiper pagination
  let countCategoriesInCatalog: number = 0
  if (props.productCategories !== null 
      && props.productSubcategoriesByCategory !== null
      && props.productSubcategoriesByCategory.length > 0) {

        for (let i = 0; i < props.productSubcategoriesByCategory.length; i++) {
          if (props.productSubcategoriesByCategory[i].length == 0)
            ++countCategoriesInCatalog
          if (props.productSubcategoriesByCategory[i].length > 0)
            countCategoriesInCatalog += props.productSubcategoriesByCategory[i].length 
        }
  }

  // for (let i = 0; i < )
  let countPagesInCatalogInt: number = countCategoriesInCatalog / countColumnsCategory // Integer part of count
  let countPagesInCatalogRemainder: number = countPagesInCatalogInt % countColumnsCategory // Remainder parof of count
  let countPagesInCatalog: number = Math.trunc(countPagesInCatalogRemainder > 0 ? countPagesInCatalogInt + 1 : countPagesInCatalogInt)
  let pageableSubcategories: (SubcategoryType | CategoryType)[][] = []
  let categoriesWithoutSubcategory: CategoryType[] = [] 
  
  // get array categories without subcategory
  if (props.productCategories !== null 
    && props.productCategories.length > 0 
    && props.productSubcategoriesByCategory !== null 
    && props.productSubcategoriesByCategory.length > 0) {

    for(let i = 0; i < props.productSubcategoriesByCategory.length; i++) {
      if (props.productSubcategoriesByCategory[i].length == 0)
        categoriesWithoutSubcategory.push(props.productCategories[i])
    }
  }

  // get pageble array, where index[i] - page categories
  if (props.productAllSubcategories !== null && props.productAllSubcategories.length > 0) {
    for (let i = 0; i < countPagesInCatalog; i++) {
      let currentPage: (SubcategoryType | CategoryType)[] = []
      for (let j = ((i + 1) * countColumnsCategory) - countColumnsCategory; j < (i + 1) * countColumnsCategory; j++) {
        if (props.productAllSubcategories[j] !== undefined)
          currentPage.push(props.productAllSubcategories[j])
      }

      // if subcategories end, add categories without subcategory
      if (currentPage.length < countColumnsCategory) {
        let countPushedElements = 0
        for (let m = 0; m < (countColumnsCategory - currentPage.length); m++) {
          if (categoriesWithoutSubcategory[m] !== undefined) {
            currentPage.push(categoriesWithoutSubcategory[m])
            ++countPushedElements
          }
        }
        categoriesWithoutSubcategory = categoriesWithoutSubcategory.slice(countPushedElements)
      }
      pageableSubcategories.push(currentPage)
    }
  }

  // Custom Swiper Navigation
  const catalogNextRef = useRef(null)
  const catalogPrevRef = useRef(null)

  return (
    <div className={s.catalog}>
      {pageableSubcategories !== null && pageableSubcategories.length > 0 && props.productSubcategoriesByCategory !== null 
        && props.productSubcategoriesByCategory.length > 0
        && props.productCategories !== null 
        && props.productAllSubcategories !== null 
        && props.productAllSubcategories.length > 0 &&
        <div>
          <div className={s.catalog__title}>
            <h2>Разделы каталога</h2>
            <div className={s.title_underline}></div>
          </div>
          
          <div className={s.catalog__categories}>
            <Swiper
              modules={[Navigation, A11y, Pagination]}
              spaceBetween={0}
              slidesPerView={1}
              pagination={
                {
                  bulletClass: s.catalog_pagination_bullet,
                  bulletActiveClass: s.catalog_pagination_bullet_active,
                  clickable: true
                }
              }
              navigation={{nextEl: catalogNextRef.current, prevEl: catalogPrevRef.current, enabled: true}}
              loop={false}
              speed={800}
              autoHeight
              className={s.swiper__wrapper}
              allowTouchMove
              slideToClickedSlide
            >

              {pageableSubcategories.map((page, pageIndex) => {
                  return (
                    <SwiperSlide key={pageIndex * countColumnsCategory}>
                      <div className={s.swiper__container}>
                        {/* Elem have eny type because they can be CategoryType or SubcategoryType (need filed category) */}
                        {page.map((elem: any, elemIndex) => {
                          return (
                            <Category
                              key={(elemIndex + 1) * (pageIndex + 1)}
                              id={elem.id}
                              title={elem.title}
                              url={elem.url}
                              category={elem?.category}
                            />
                          )
                        })}
                      </div>
                    </SwiperSlide>
                  )
                })
              }
              
              <div id={s.catalog_prev_btn} className={`swiper-button-prev`} ref={catalogPrevRef} />
              <div id={s.catalog_next_btn} className={`swiper-button-next`} ref={catalogNextRef} />
            </Swiper>
          </div>
        </div>  
      }
    </div>
  )
}

export default Catalog