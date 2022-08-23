import React from "react"
import {Route, Routes, useLocation} from 'react-router-dom';

import NavbarContainer from "../Navbar/NavbarContainer";
import { PropsRouter } from "./RouterContainer";
import MainPage from "../MainPage/MainPage";
import Footer from "../Footer/Footer";

const Router: React.FC<PropsRouter> = (props) => {

  return (
    <div>
      <NavbarContainer/>
      {props.productSubcategoriesByCategory !== null && props.companyCategories !== null && props.productCategories !== null && props.productSubcategories !== null && props.user !== null &&
        <div>  
          <Routes>
            <Route path="/" element={<MainPage/>}/>

            {/* Company Categories */}
            <Route path={props.url.companyAbout} element/>
            <Route path={props.url.companyKontakti} element/>
            <Route path={props.url.companyOptovikam} element/>

            {/* Product Caregories */}
            <Route path={props.url.categoryAccessory} element/>
            <Route path={props.url.categoryCoffee} element/>
            <Route path={props.url.categoryTableware} element/>
            <Route path={props.url.categoryTea} element/>
            

            {/* Subcategories */}
            <Route path={`${props.url.categoryCoffee}${props.url.subcatMonosorta}`} element/>
            <Route path={`${props.url.categoryTea}${props.url.subcatSmesi}`} element/>
            <Route path={`${props.url.categoryTea}${props.url.subcatCherniy}`} element/>
            <Route path={`${props.url.categoryTea}${props.url.subcatZeleniy}`} element/>
            <Route path={`${props.url.categoryTea}${props.url.subcatUlun}`} element/>
            <Route path={`${props.url.categoryTea}${props.url.subcatBeliy}`} element/>
            <Route path={`${props.url.categoryTea}${props.url.subcatPuer}`} element/>
            <Route path={`${props.url.categoryTea}${props.url.subcatTravyanie}`} element/>
            <Route path={`${props.url.categoryTea}${props.url.subcatKrasniy}`} element/>
          </Routes>

          <Footer
            productCategories={props.productCategories}
            productSubcategoriesByCategory={props.productSubcategoriesByCategory}
            companyCategories={props.companyCategories}
          />
        </div>
      }

    </div>
  )
}

export default Router