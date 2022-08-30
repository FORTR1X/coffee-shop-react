import React from "react"
import { CategoryType, SubcategoryType } from "../../interfaces/interfaces"
import AboutUs from "../AboutUs/AboutUs"
import BestSellerContainer from "../BestSeller/BestSellerContainer"
import CatalogContainer from "../MainPageCatalog/MainPageCatalogContainer"
import Slider from "../Sliders/Slider"
import SocialFooter from "../SocialFooter/SocialFooter"

const MainPage: React.FC = () => {
  return (
    <div>
      <Slider/>
      <CatalogContainer/>
      <BestSellerContainer/>
      <AboutUs/>
      <SocialFooter/>
    </div>
  )
}

export default MainPage