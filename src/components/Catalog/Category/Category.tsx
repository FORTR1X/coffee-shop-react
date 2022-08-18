import React from "react"
import { CategoryType, SubcategoryType } from "../../../interfaces/interfaces"

import s from './Category.module.css'

type PropsCategoryType = {
  id: number,
  title: string,
  url: string,
  category?: CategoryType
}

const Category: React.FC<PropsCategoryType> = (props: PropsCategoryType) => {

  return (
    <div className={s.category__container}>
      <a className={s.category__link} href={props.url}>
        <img 
          className={s.category__img}
          src={`http://localhost:3000/img/subcat/${props.id}.jpg`}
          alt="img"
          placeholder={props.title}/>
      </a>
      <div className={s.subcategory__container}>
        <a className={s.subcategory} href="#">
          {props.title}
        </a>
      </div>
      {props.category !== undefined &&
        <div className={s.category__container}>  
          <a className={s.category} href="#">{props.category.title}</a>
        </div>
      }
    </div>
  )
}

export default Category