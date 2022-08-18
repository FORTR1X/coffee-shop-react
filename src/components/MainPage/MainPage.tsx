import React from "react"
import { CategoryType, SubcategoryType } from "../../interfaces/interfaces"
import CatalogContainer from "../Catalog/CatalogContainer"
import Slider from "../Sliders/Slider"

const MainPage: React.FC = () => {
  return (
    <div>
      <Slider/>
      <CatalogContainer/>
    </div>
  )
}

export default MainPage