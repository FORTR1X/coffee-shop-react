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

type SlideImagesType = {
  id: number
  imgUrl: string
  alt: string
  urlTo: string
}

const slideImages: SlideImagesType[] = [
  {id: 1, imgUrl: 'http://localhost:3000/img/background_1.jpg', alt: 'img1', urlTo: '/product1'},
  {id: 2, imgUrl: 'http://localhost:3000/img/background_2.jpg', alt: 'img2', urlTo: '/product2'},
  {id: 3, imgUrl: 'http://localhost:3000/img/background_3.jpg', alt: 'img3', urlTo: '/product3'},
  {id: 4, imgUrl: 'http://localhost:3000/img/background_4.jpg', alt: 'img4', urlTo: '/product4'},
  {id: 5, imgUrl: 'http://localhost:3000/img/background_5.jpg', alt: 'img5', urlTo: '/product5'},
]

const Slider: React.FC = () => {
  return (
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
            <SwiperSlide>
              <a className={s.slide__link} href={slide.urlTo}>
                <img className={s.slide__img} src={slide.imgUrl} alt={slide.alt} />
              </a>
            </SwiperSlide>
          )
        })}
      
      
    </Swiper>
  )
}

export default Slider