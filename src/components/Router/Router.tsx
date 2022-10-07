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
import Contacts from "../Company/Contacts/Contacts";
import Wholesalers from "../Company/Wholesalers/Wholesalers";
import AboutUsCompany from "../Company/AboutUs/AboutUsCompany";
import Delivery from "../Company/Delivery/Delivery";
import CheckoutContainer from "../Checkout/CheckoutContainer";
import OAuthContainer from "../OAuth/OAuthContainer";
import AdminPanelContainer from "../AdminPanel/AdminPanelContainer";
import AdminCreateProductContainer from "../AdminPanel/AdminCreateProduct/AdminCreateProductContainer";

const Router: React.FC<PropsRouter> = (props) => {

  const URL_PATH = useLocation().pathname

  return (

    <div className={s.content}>
      <OAuthContainer/>

      {!URL_PATH.includes("admin") &&
        <>
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
                <Route path={props.url.companyAbout} element={<AboutUsCompany/>}/>
                <Route path={props.url.companyKontakti} element={<Contacts/>}/>
                <Route path={props.url.companyOptovikam} element={<Wholesalers/>}/>
                <Route path={props.url.companyDostavka} element={<Delivery/>}/>

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

                <Route path={'/product/id:id'} element={<PageProductContainer/>}/>

                <Route path={'/search'} element={<SearchContainer/>}/>
              
                <Route path={'/checkout'} element={<CheckoutContainer/>}/>
              
                <Route path={'/admin'} element={<></>}/>
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
        </>
      }

      <Routes>
        <Route path="/admin" element={<AdminPanelContainer/>}/>
        <Route path="/admin/product/add" element={<AdminPanelContainer/>}/>
        <Route path="/admin/product/edit/id:id" element={<AdminPanelContainer/>}/>
      </Routes>

    </div> 
  )
}

export default Router