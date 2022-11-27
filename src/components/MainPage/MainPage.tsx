import React from "react"
import {CategoryType, SubcategoryType} from "../../interfaces/interfaces"
import AboutUs from "../AboutUs/AboutUs"
import BestSellerContainer from "../BestSeller/BestSellerContainer"
import CatalogContainer from "../MainPageCatalog/MainPageCatalogContainer"
import SlidersContainer from "../Sliders/SlidersContainer"
import SocialFooter from "../SocialFooter/SocialFooter"

const MainPage: React.FC = () => {
    return (
        <div>
            <SlidersContainer/>
            <CatalogContainer/>
            <BestSellerContainer/>
            <AboutUs/>
            <SocialFooter/>
        </div>
    )
}

export default MainPage