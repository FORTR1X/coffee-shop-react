import React, { useRef } from "react"
import {Route, Routes, useLocation} from 'react-router-dom';

import s from './Router.module.css'

import NavbarContainer from "../Navbar/NavbarContainer";
import { PropsRouter } from "./RouterContainer";
import MainPage from "../MainPage/MainPage";
import Footer from "../Footer/Footer";
import PageProductContainer from "../Product/PageProduct/PageProductContainer";
import CatalogContainer from "../Catalog/CatalogContainer";
import SearchContainer from "../Search/SearchContainer";

const Router: React.FC<PropsRouter> = (props) => {

  return (

    <div className={s.content}>
      <NavbarContainer/>

      <main className={s.main_content}>
        {props.productSubcategoriesByCategory !== null
          && props.companyCategories !== null
          && props.productCategories !== null
          && props.productSubcategories !== null
          && props.user !== null
          && props.url !== null
          && props.url.isAllUrlReady &&
          <Routes>
            <Route path="/" element={<MainPage/>}/>

            {/* Company Categories */}
            <Route path={props.url.companyAbout} element={<CatalogContainer/>}/>
            <Route path={props.url.companyKontakti} element={<CatalogContainer/>}/>
            <Route path={props.url.companyOptovikam} element={<CatalogContainer/>}/>

            {/* Accessory */}
            <Route path={props.url.categoryAccessory} element={<CatalogContainer/>}/>

            {/* Coffee */}
            <Route path={props.url.categoryCoffee} element={<CatalogContainer/>}>
              <Route path={props.url.subcatSmesi} element={<CatalogContainer/>}/>
              <Route path={props.url.subcatMonosorta} element={<CatalogContainer/>}/>
            </Route>

            {/* Tableware */}
            <Route path={props.url.categoryTableware}element={<CatalogContainer/>}/>

            {/* Tea */}
            <Route path={props.url.categoryTea} element={<CatalogContainer/>}>
              <Route path={props.url.subcatZeleniy} element={<CatalogContainer/>}/>
              <Route path={props.url.subcatUlun} element={<CatalogContainer/>}/>
              <Route path={props.url.subcatBeliy} element={<CatalogContainer/>}/>
              <Route path={props.url.subcatPuer} element={<CatalogContainer/>}/>
              <Route path={props.url.subcatTravyanie} element={<CatalogContainer/>}/>
              <Route path={props.url.subcatKrasniy} element={<CatalogContainer/>}/>
              <Route path={props.url.subcatCherniy} element={<CatalogContainer/>}/>
            </Route>

            {/* Product */}
            <Route path={'/product/id:id'} element={<PageProductContainer/>}/>

            {/* Search */}
            <Route path={'/search'} element={<SearchContainer/>}/>
          </Routes>
        }
      </main>

      {props.productCategories !== null && props.productSubcategoriesByCategory !== null && props.companyCategories !== null &&
        <Footer
          productCategories={props.productCategories}
          productSubcategoriesByCategory={props.productSubcategoriesByCategory}
          companyCategories={props.companyCategories}
        />
      }

    </div> 
  )
}

export default Router