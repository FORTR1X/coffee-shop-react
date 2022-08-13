import React from "react"
import {Route, Routes, useLocation} from 'react-router-dom';

import NavbarContainer from "../Navbar/NavbarContainer";
import { PropsRouter } from "./RouterContainer";
import Slider from "../Sliders/Slider";

const Router: React.FC<PropsRouter> = (props) => {
  return (
    <div>
      <NavbarContainer/>
      {props.companyCategories !== null && props.productCategories !== null && props.productSubcategories !== null && props.user !== null &&
        <Routes>
          <Route path="/" element={<Slider/>}/>
        </Routes>
      }
    </div>
  )
}

export default Router