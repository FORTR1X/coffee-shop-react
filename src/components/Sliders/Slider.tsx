import React from "react"
// import Swiper JS
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, A11y } from 'swiper'
// import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
// import custom style
import s from './Slider.module.css'
import './CustomSwiper.css'
import { BASE_URL } from "../../hooks/useApi"

type SlideImagesType = {
  id: number
  imgUrl: string
  alt: string
  urlTo: string
}

const slideImages: SlideImagesType[] = [
  {id: 1, imgUrl: `${BASE_URL}/uploads/bg/background_1.jpg`, alt: 'img1', urlTo: '/product1'},
  {id: 2, imgUrl: `${BASE_URL}/uploads/bg/background_2.jpg`, alt: 'img2', urlTo: '/product2'},
  {id: 3, imgUrl: `${BASE_URL}/uploads/bg/background_3.jpg`, alt: 'img3', urlTo: '/product3'},
  {id: 4, imgUrl: `${BASE_URL}/uploads/bg/background_4.jpg`, alt: 'img4', urlTo: '/product4'},
  {id: 5, imgUrl: `${BASE_URL}/uploads/bg/background_5.jpg`, alt: 'img5', urlTo: '/product5'},
]

const Slider: React.FC = () => {
  return (
    <div className={s.swiper}>
      <Swiper
        modules={[Navigation, Pagination, A11y, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        loop
        speed={800}
        className={s.swiper__wrapper}
        autoplay={ {delay: 6000, pauseOnMouseEnter: false, disableOnInteraction: false} }
        allowTouchMove
        slideToClickedSlide
      >
        
          {slideImages.map((slide, index) => {
            return (
              <SwiperSlide key={index * 2}>
                <a className={s.slide__link} href={slide.urlTo}>
                  <img className={s.slide__img} src={slide.imgUrl} alt={slide.alt} />
                </a>
              </SwiperSlide>
            )
          })}
        
        
      </Swiper>
    </div>
  )
}

export default Slider