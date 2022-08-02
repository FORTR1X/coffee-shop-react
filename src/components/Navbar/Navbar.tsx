import React, { useState } from "react"

import s from './styles/Navbar.module.css'
import './styles/index.css'

import cart from './cart.svg'
import search from './search.svg'

import { CSSTransition } from "react-transition-group"

const Navbar: React.FC = () => {

  const topCategories: string[] = ['О компании', 'Оптовикам', 'Контакты']
  const bottomCategories: string[] = ['Кофе', 'Чай', "Аксессуары", 'Посуда']
  bottomCategories.push('О нас')

  const user = {
    email: 'example@gmail.com',
    phoneNumber: '+7 (978)-779-02-36'
  }
  let countGoodsInCart: number = 0;

  const [isSearchOpen, setIsSearchOpen] = useState<Boolean>(false);

  const handleOnClickSearch: VoidFunction = () => {
    setIsSearchOpen(!isSearchOpen)
  }

  return (
    <nav className={s.header}>
      <div className={s.header__top}>
        <div className={s.header__top_container}>
          <ul className={s.header__top_ul}>
            {topCategories.map(category => 
              <li>
                <a className={s.header__top_li} href="#" >
                  {category}
                </a>
              </li>
            )}
          </ul>
          <span className={s.header__number}>{user.phoneNumber}</span>
        </div>
      </div>

      <div className={s.header__bottom}>
        <div className={s.header__bottom_container}>
          <span className={s.header__bottom_logo}>LOGO</span>

          <ul className={s.header_bottom_categories}>
            {bottomCategories.map(category => 
              <li className={s.header_bottom_li}>
                <a href="#" className={s.header__text_animation}>
                  {category}
                </a>
              </li>
            )}
          </ul>

          {/* for lg */}
          <input className={s.header__search} type="text" placeholder="Поиск"/>

          {/* for md */}
          <img className={s.header__icon_md} src={search} alt="img" onClick={handleOnClickSearch}/>

          <div className={s.header__cart}>
            <img className={s.header__cart_svg} alt="cart" src={cart}/>
            <div className={s.header__cart_circle}/>
            <span className={s.header__cart_count}>{countGoodsInCart}</span>
          </div>
        </div>
      </div>

      <CSSTransition 
        in={isSearchOpen ? true : false} 
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