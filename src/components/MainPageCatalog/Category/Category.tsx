import React from "react"
import { BASE_URL } from "../../../hooks/useApi"
import { CategoryType } from "../../../interfaces/interfaces"

import s from './Category.module.css'

type PropsCategoryType = {
  id: number,
  title: string,
  url: string,
  category?: CategoryType
}

const Category: React.FC<PropsCategoryType> = (props: PropsCategoryType) => {

  let linkTo = props.category !== undefined ? `${props.category.url}${props.url}` : `${props.url}`

  return (
    <div className={s.category__container}>
      <a className={s.category__link} href={linkTo}>
        <img 
          className={s.category__img}
          src={`${BASE_URL}/uploads/subcat/${props.id}.jpg`}
          alt="img"
          placeholder={props.title}
        />
      </a>
      <div className={s.subcategory__container}>
        <a className={s.subcategory} href={linkTo}>
          {props.title}
        </a>
      </div>
      {props.category !== undefined && props.category.title != props.title &&
        <div className={s.category__container}>  
          <a className={s.category} href={linkTo}>{props.category.title}</a>
        </div>
      }
    </div>
  )
}

export default Category