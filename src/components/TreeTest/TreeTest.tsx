import React from "react"

import s from './TreeTest.module.css'

const TreeTest: React.FC = () => {

  interface Cat {
    id: number,
    title: string
  }

  const category: Cat[] = [ {id: 1, title: 'КАТЕГОРИЯ 1'}, {id: 2, title: 'КАТЕГОРИЯ 2'}, {id: 3, title: 'КАТЕГОРИЯ 3'} ]
  const subcat: Cat[] = [ {id: 1, title: 'подкат 1'}, {id: 2, title: 'подкат 2'}, {id: 3, title: 'подкат 3'} ]


  return (
    <div className={s.exmpl}>
      <ul className={s.category__ul}>
        <li className={s.category__li}>
          <span>
            КАТЕГОРИЯ 1
          </span>

          <ul className={s.subcategory__ul}>
            <li className={s.subcategory__li}>
              <span>КАТ 1 | ПОДКАТ 1</span>
            </li>

            <li className={s.subcategory__li}>
              <span>КАТ 1 | ПОДКАТ 2</span>
            </li>

            <li className={s.subcategory__li}>
              <span>КАТ 1 | ПОДКАТ 3</span>
            </li>
          </ul>
        </li>

        <li className={s.category__li}>
          <span>
            КАТЕГОРИЯ 2
          </span>

          <ul className={s.subcategory__ul}>
            <li className={s.subcategory__li}>
              <span>КАТ 2 | ПОДКАТ 1</span>
            </li>

            <li className={s.subcategory__li}>
              <span>КАТ 2 | ПОДКАТ 2</span>
            </li>

            <li className={s.subcategory__li}>
              <span>КАТ 2 | ПОДКАТ 3</span>
            </li>
          </ul>
        </li>

        <li className={s.category__li}>
          <span>
            КАТЕГОРИЯ 3
          </span>

          <ul className={s.subcategory__ul}>
            <li className={s.subcategory__li}>
              <span>КАТ 3 | ПОДКАТ 1</span>
            </li>

            <li className={s.subcategory__li}>
              <span>КАТ 3 | ПОДКАТ 2</span>
            </li>

            <li className={s.subcategory__li}>
              <span>КАТ 3 | ПОДКАТ 3</span>
            </li>
          </ul>
        </li>
      </ul>


      <ul className={s.category__ul}>
        {category.map(category => {
          return (
            <li className={s.category__li}>
              <span>{category.title}</span>

              <ul className={s.subcategory__ul}>
                {subcat.map(subcat => {
                  return (
                    <li className={s.subcategory__li}>
                      <span>{subcat.title}</span>
                    </li>
                  )
                })}
              </ul>
            </li>
          )
        })}
      </ul>




















































    </div>
  )
}

export default TreeTest;