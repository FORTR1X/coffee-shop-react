import React, { useEffect, useState } from "react"

import s from './styles/Navbar.module.css'
import './styles/index.css'

import cart from './cart.svg'
import search from './search.svg'

import { CSSTransition } from "react-transition-group"

import { Category, Subcategory } from "../../interfaces/interfaces"
import Spoiler from "./Spoiler/Spoiler"

const Navbar: React.FC = () => {

  const topCategories: string[] = ['О компании', 'Оптовикам', 'Контакты']
  const bottomCategories: Category[] = [
    { id: 1, title: 'Аксессуары', url: '/accessuari' },
    { id: 2, title: 'Кофе', url: '/coffee' },
    { id: 3, title: 'Чай', url: '/chay' },
    { id: 4, title: 'Посуда', url: '/posuda' }
  ]
  const bottomSubcategories: Subcategory[] = [
    { id: 1, title: 'Моносорта', url: '/monosorta' },
    { id: 2, title: 'Смеси', url: '/smesi' },
    { id: 3, title: 'Чёрный', url: '/cherniy' },
    { id: 4, title: 'Зеленый', url: '/zeleniy' },
    { id: 5, title: 'Улун', url: '/ulun' },
    { id: 6, title: 'Белый', url: '/beliy' },
    { id: 7, title: 'Пуэр', url: '/puer' },
    { id: 8, title: 'Травяные', url: '/travyanie' },
    { id: 9, title: 'Красный', url: '/krasniy' }
  ]

  // bottomCategories.size() - i; j - 
  const subcategoriesByCategory: Subcategory[][] = bottomCategories.map(category => {
    // делаем запрос, получаем список по category.id, затем return полученный список
    return bottomSubcategories;
  })
  subcategoriesByCategory.pop();

  const user = {
    email: 'example@gmail.com',
    phoneNumber: '+7 (978)-779-02-36'
  }
  let countGoodsInCart: number = 7;

  const [isSearchOpen, setIsSearchOpen] = useState<boolean | undefined>(false)
  const handleOnClickSearch = (): void => {
    handleIsCategoryHovered(false)
    setIsSearchOpen(!isSearchOpen)
  }

  const getSubcategoriesByCategoryId = (id: number): Subcategory[] => {
    return bottomSubcategories;
  }

  const [isHamburgerOpen, setIsHamburgerOpen] = useState<boolean | undefined>(false)
  const toggleHamburger = (): void => setIsHamburgerOpen(!isHamburgerOpen)

  const [isCategoryHovered, setIsCategoryHovered] = useState<boolean | undefined>(false)
  const [currentSelectedCategory, setCurrentSelectedCategory] = useState<Category | null | undefined>(null)
  const handleIsCategoryHovered = (isState: boolean, currentCategory?: Category): void => {
    setIsCategoryHovered(isState)
    setIsSearchOpen(false)
    if (currentCategory !== undefined) {
      setCurrentSelectedCategory(currentCategory)
    }
  }

  return (
    <nav className={s.header}>
      <div className={s.header__top}>
        <div className={s.header__top_container}>
          <ul className={s.header__top_ul}>
            {topCategories.map(category => 
              <li>
                <a onClick={() => handleIsCategoryHovered(false)} className={s.header__top_li} href="#" >
                  {category}
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
              <li className={s.category__li}>
                {/* lg display */}
                <a 
                  key={category.id}
                  href={category.url}
                  className={s.header__text_animation}
                  onClick={() => getSubcategoriesByCategoryId(category.id)}
                  onMouseEnter={ () => handleIsCategoryHovered(true, category) }
                  onMouseLeave={ () => handleIsCategoryHovered(false) }
                >
                  {category.title}
                </a>

                {/* md display */}
                <span
                  key={category.id}
                  className={s.header__text_animation_md}
                  onClick={() => {
                    getSubcategoriesByCategoryId(category.id)
                    handleIsCategoryHovered(!isCategoryHovered, category)
                  }}
                >
                  {category.title}
                </span>

                <ul className={s.subcategory__ul}>
                  <div 
                    className={s.subcategory__outside_container}
                    onClick={ () => handleIsCategoryHovered(false) }
                  />
                  <div 
                    className={s.subcategory__content}
                    onMouseEnter={ () => handleIsCategoryHovered(true) }
                    onMouseLeave={ () => handleIsCategoryHovered(false) }
                  >
                    <div className={s.subcategory__trinagle}/>
                    <div className={s.subcategory__container}>
                      {bottomSubcategories.map(subcat => {
                        return (
                          <li className={s.subcategory__li}>
                            <a className={s.subcategory__li_link} href={`${currentSelectedCategory?.url}${subcat.url}`}>
                              {subcat.title}
                            </a>
                          </li>
                        )
                      })}
                    </div>
                  </div> 
                </ul>
              </li>
            )}
          </ul>


          {/* for lg */}
          <input 
            className={s.header__search}
            type="text"
            placeholder="Поиск"
          />

          {/* for md */}
          <img 
            className={s.header__icon_md}
            src={search}
            alt="img"
            onClick={handleOnClickSearch}
          />

          <div className={s.header__cart}>
            <img className={s.header__cart_svg} alt="cart" src={cart}/>
            <div className={s.header__cart_circle}/>
            <span className={s.header__cart_count}>{countGoodsInCart}</span>
          </div>
        </div>
      </div>

      {/* md */}
      <div className={s.header__bottom_md}>
        <div className={s.header__bottom_container_md}>
          <img className={s.header__icon_md} src={search} alt="img" onClick={handleOnClickSearch}/>
          <a className={s.header__bottom_logo} href="/"/>

          <div style={{ 
            'display': 'flex',
           }}>
            <div className={s.header__cart}>
              <img className={s.header__cart_svg} alt="cart" src={cart}/>
              <div className={s.header__cart_circle}/>
              <span className={s.header__cart_count}>{countGoodsInCart}</span>
            </div>

            <div 
              className={isHamburgerOpen ? `${s.burger__container} ${s.burger__active}` : s.burger__container} 
              onClick={toggleHamburger}
            >
              <span/>
            </div>
          </div>
        </div>

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
                            key={category.id}
                            title={category.title}
                            content={subcategoriesByCategory[category.id - 1]}
                            categoryUrl={category.url}
                          />
                })
              }
            </div>
          </div>
        </CSSTransition>  
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
  )
}

export default Navbar