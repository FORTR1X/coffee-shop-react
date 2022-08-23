import React from "react"

import s from './Footer.module.css'

import copyright from './Copyright.svg'
import { CategoryType, CompanyCategoryType, SubcategoryType } from "../../interfaces/interfaces"

type FooterProps = {
  productCategories: Array<CategoryType>
  productSubcategoriesByCategory: SubcategoryType[][] | null
  companyCategories: Array<CategoryType>
}

const Footer: React.FC<FooterProps> = (props: FooterProps) => {
  return (
    <div className={s.footer}>
      {props.productSubcategoriesByCategory !== null && props.productCategories !== null &&
        <div className={s.footer__content}>
          <div className={s.content__catregories}>
            {props.productSubcategoriesByCategory.map((category, categoryIndex) => {
              if (props.productSubcategoriesByCategory !== null && category !== null && category.length > 0) {
                return (
                  <ul className={s.category__ul} key={categoryIndex}>
                    {props.productCategories[categoryIndex].title}

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
            <ul className={s.category__ul}>
              Marvels
              {props.companyCategories.map((category) => {
                return (
                  <li className={s.category__li}>
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
    </div>
  )
}

export default Footer