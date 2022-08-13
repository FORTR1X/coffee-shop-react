import React from "react"
import {Route, Routes, useLocation} from 'react-router-dom';

import NavbarContainer from "../Navbar/NavbarContainer";
import { PropsRouter } from "./RouterContainer";
import Slider from "../Sliders/Slider";

const Router: React.FC<PropsRouter> = (props) => {

  console.log(props)

  return (
    <div>
      <NavbarContainer/>
      {props.companyCategories !== null && props.productCategories !== null && props.productSubcategories !== null && props.user !== null &&
        <Routes>
          <Route path="/" element={<Slider/>}/>

          {/* Company Categories */}
          <Route path={props.companyAbout} element/>
          <Route path={props.companyKontakti} element/>
          <Route path={props.companyOptovikam} element/>

          {/* Product Caregories */}
          <Route path={props.categoryAccessory} element/>
          <Route path={props.categoryCoffee} element/>
          <Route path={props.categoryTableware} element/>
          <Route path={props.categoryTea} element/>
          

          {/* Subcategories */}
          <Route path={`${props.categoryCoffee}${props.subcatMonosorta}`} element/>
          <Route path={`${props.categoryTea}${props.subcatSmesi}`} element/>
          <Route path={`${props.categoryTea}${props.subcatCherniy}`} element/>
          <Route path={`${props.categoryTea}${props.subcatZeleniy}`} element/>
          <Route path={`${props.categoryTea}${props.subcatUlun}`} element/>
          <Route path={`${props.categoryTea}${props.subcatBeliy}`} element/>
          <Route path={`${props.categoryTea}${props.subcatPuer}`} element/>
          <Route path={`${props.categoryTea}${props.subcatTravyanie}`} element/>
          <Route path={`${props.categoryTea}${props.subcatKrasniy}`} element/>
        </Routes>
      }
    </div>
  )
}

export default Router