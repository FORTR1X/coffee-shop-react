import React, { useEffect, useState } from "react"
import { PropsAdminPanel } from "./AdminPanelContainer"

import s from './AdminPanel.module.css'

import productListSvg from './svg/product-list.svg'
import bestSellersSvg from './svg/best-sellers.svg'
import discountSvg from './svg/discount.svg'

import { ProductType } from "../../interfaces/interfaces"
import AdminOAuthContainer from "./AdminOAuth/AdminOAuthContainer"
import { useLocation, useNavigate } from "react-router-dom"
import { useLocalStorage } from "usehooks-ts"
import AdminProductListPageContainer from "./AdminProductListPage/AdminProductListPageContainer"
import AdminCreateProductContainer from "./AdminCreateProduct/AdminCreateProductContainer"
import AdminEditProductContainer from "./AdminEditProduct/AdminEditProductContainer"
import AdminBestSellersContainer from "./AdminBestSellers/AdminBestSellersContainer"

const AdminPanel: React.FC<PropsAdminPanel> = (props: PropsAdminPanel) => {
  
  const localToken = localStorage.getItem('token')
  const token = localToken == null ? '' : localToken
  const [refreshToken, setRefreshToken] = useLocalStorage('refresh-token', '')
  const IS_TOKEN_EMPTY = token !== undefined && token.length == 0

  const dayOfMonth = new Date().getDate()
  const dayOfMonthWithZeroBeforeNumber = dayOfMonth < 10 ? `0${dayOfMonth}` : dayOfMonth

  const month = new Date().getMonth() + 1
  const monthWithZeroBeforeNumber = month < 10 ? `0${month}` : month
  
  const year = new Date().getFullYear()
  const currentDate = `${dayOfMonthWithZeroBeforeNumber}.${monthWithZeroBeforeNumber}.${year}`

  const navigateTo = useNavigate()
  const handleLogout = () => {
    localStorage.setItem('token', '')
    localStorage.setItem('refresh-token', '')
    props.setLogut()
    navigateTo("/")
  }

  const URL_PATH = useLocation().pathname
  
  return (
    <div>

      {!props.isAuth && IS_TOKEN_EMPTY &&
        <AdminOAuthContainer/>
      }

      {props.isAuth && !IS_TOKEN_EMPTY &&
        <div className={s.adm__product_list}>
          <div className={s.adm__menu}>
            <div className={s.header}>
              <div>
                <span className={s.menu__header}>Marvels shop</span>
                <div className={s.menu__header_line}/>
              </div>
              <span className={s.menu__subheader}>Панель управления</span>
            </div>  

            <div className={s.catalog_and_footer__container}>
              <div className={s.catalog}>
                <div className={URL_PATH == "/admin" ? `${s.catalog__container} ${s.current}` : s.catalog__container}>
                  <img src={productListSvg} alt="Список" /> <a href="/admin" className={s.catalog__link}>Список товаров</a>
                </div>

                <div className={URL_PATH == "/admin/best_sellers" ? `${s.catalog__container} ${s.current}` : s.catalog__container}>
                  <img src={bestSellersSvg} alt="Список" /> <a href="/admin/best_sellers" className={s.catalog__link}>Топ продаж</a>
                </div>

                <div className={s.catalog__container}>
                  <img src={discountSvg} alt="Список" /> <a href="#" className={s.catalog__link}>Акции</a>
                </div>
              </div>

              <div className={s.footer__container}>
                <span className={s.footer__text}>2022 <strong>MARVERLS SHOP</strong> &copy; design by <strong><a href="https://vk.com/f0rtdix">FORTRIX</a></strong></span>
              </div>
            </div>
          </div>

          <div className={s.adm__content}>
            <div className={s.content__info_panel}>
              <div>
                <span>{currentDate}</span>
                <a href="/">Перейти на сайт</a>
              </div>

              <span onClick={handleLogout}>Выйти</span>
            </div>

            <div className={s.content__container}>
              {URL_PATH == "/admin" &&
                <AdminProductListPageContainer/>
              }

              {URL_PATH == "/admin/product/add" &&
                <AdminCreateProductContainer/>
              }

              {URL_PATH.includes("/admin/product/edit") &&
                <AdminEditProductContainer/>
              }

              {URL_PATH == "/admin/best_sellers" &&
                <AdminBestSellersContainer/>
              }
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default AdminPanel