import React, { useRef, useState } from "react"

import s from './Footer.module.css'

import copyright from './Copyright.svg'
import { CategoryType, CompanyCategoryType, SubcategoryType } from "../../interfaces/interfaces"

type FooterProps = {
  productCategories: Array<CategoryType>
  productSubcategoriesByCategory: SubcategoryType[][] | null
  companyCategories: Array<CategoryType>
}

const Footer: React.FC<FooterProps> = (props: FooterProps) => {

  const [currentEvent, setCurrentEvent] = useState<React.MouseEvent<HTMLUListElement, MouseEvent> | null>(null)

  const [isSpoilerOpen, setIsSpoilerOpen] = useState(false)
  const handleIsSpoilerOpen = (event: React.MouseEvent<HTMLUListElement, MouseEvent>, state?: boolean) => {

    setCurrentEvent(event)

    if (state == undefined)
      setIsSpoilerOpen(!isSpoilerOpen)
    else
      setIsSpoilerOpen(state)
  }

  return (
    <footer className={s.footer}>
      {props.productSubcategoriesByCategory !== null && props.productCategories !== null &&
        <div className={s.footer__content}>
          <div className={s.content__catregories}>
            {props.productSubcategoriesByCategory.map((category, categoryIndex) => {
              if (props.productSubcategoriesByCategory !== null && category !== null && category.length > 1) {
                return (
                  <ul 
                    onClick={ (event) => { event.currentTarget.classList.toggle(`${s.enable}`) } }
                    className={s.category__ul}
                    key={categoryIndex}
                  >
                    <div className={s.category__title}>
                      <span className={s.title}>{props.productCategories[categoryIndex].title}</span>
                      <div className={s.spoiler_arrow}/>
                    </div>  

                    {category.map((subcategory, subcatIndex) => {
                      return (
                        <li className={s.category__li} key={(subcatIndex + 1) * subcategory.id}>
                          <a href={`${props.productCategories[categoryIndex].url}${subcategory.url}`}>{subcategory.title}</a>
                        </li>
                      )
                    })}
                  </ul>
                )
              }
            })}
            <ul onClick={ (event) => { event.currentTarget.classList.toggle(`${s.enable}`) } } className={`${s.category__ul} ${s.disable}`}>
              <div className={s.category__title}>
                <span className={s.title}>Marvels</span>
                <div className={s.spoiler_arrow}/>
              </div>  
              {props.companyCategories.map((category, index) => {
                return (
                  <li key={(index + 1) * category.id} className={s.category__li}>
                    <a href={category.url}>
                      {category.title}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
          
          <div className={s.content__worktime}>
              <p>График работы:</p>
              <span>Пн-Пт с 9:00 до 18:00</span>
              <span>Сб-Вс с 10:00 до 17:00</span>
          </div>
        </div>
      }

      <div className={s.footer__copyright}>
        <span className={s.copyright__text}>
          2022 
          <b>MARVELS SHOP</b>
          <img className={s.copyright} src={copyright} alt="@" />
          design by
          <b><a className={s.copyright__link} href="https://vk.com/f0rtrix">FORTRIX</a></b>
        </span>
      </div>
    </footer>
  )
}

export default Footer