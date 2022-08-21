import React from "react"
import { CategoryType, SubcategoryType } from "../../interfaces/interfaces"
import AboutUs from "../AboutUs/AboutUs"
import BestSellerContainer from "../BestSeller/BestSellerContainer"
import CatalogContainer from "../Catalog/CatalogContainer"
import Slider from "../Sliders/Slider"

const MainPage: React.FC = () => {
  return (
    <div>
      <Slider/>
      <CatalogContainer/>
      <BestSellerContainer/>
      <AboutUs/>
    </div>
  )
}

export default MainPage