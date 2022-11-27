import React, {useEffect, useState} from "react"
// import Swiper JS
import {Swiper, SwiperSlide} from 'swiper/react'
import {Navigation, Pagination, Autoplay, A11y} from 'swiper'
// import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
// import custom style
import s from './Slider.module.css'
import './CustomSwiper.css'
import {BASE_URL} from "../../hooks/useApi"
import {SlidersPropsType} from "./SlidersContainer"

type SlideImagesType = {
    id: number
    imgUrl: string
    alt: string
    urlTo: string
}

const BASE_BACKGROUND_URL = `${BASE_URL}/uploads/bg/`

const Slider: React.FC<SlidersPropsType> = (props: SlidersPropsType) => {

    const [slideImages, setSlideImages] = useState<Array<SlideImagesType>>([])

    useEffect(() => {
        const IS_SLIDE_IMAGES_EMPTY = slideImages.length == 0
        const IS_BACKGROUND_LIST_EMPTY = props.backgroundsList.length == 0

        if (IS_BACKGROUND_LIST_EMPTY) {
            props.getBackgroundsList()
        }

        if (IS_SLIDE_IMAGES_EMPTY && !IS_BACKGROUND_LIST_EMPTY) {
            let slideImagesList: Array<SlideImagesType> = []

            props.backgroundsList.map((elem, index) => {
                slideImagesList.push({
                    id: index,
                    alt: elem,
                    imgUrl: `${BASE_BACKGROUND_URL}${elem}`,
                    urlTo: `/product/id${elem}`
                })
            })

            setSlideImages(slideImagesList)
        }
    }, [props.backgroundsList])

    return (
        <>
            {props.backgroundsList.length > 0 &&
                <div className={s.swiper}>
                    <Swiper
                        modules={[Navigation, Pagination, A11y, Autoplay]}
                        spaceBetween={0}
                        slidesPerView={1}
                        navigation
                        pagination={{clickable: true}}
                        loop
                        speed={800}
                        className={s.swiper__wrapper}
                        autoplay={{delay: 6000, pauseOnMouseEnter: false, disableOnInteraction: false}}
                        allowTouchMove
                        slideToClickedSlide
                    >

                        {slideImages.map((slide, index) => {
                            return (
                                <SwiperSlide key={index * 2}>
                                    <a className={s.slide__link} href={slide.urlTo}>
                                        <img className={s.slide__img} src={slide.imgUrl} alt={slide.alt}/>
                                    </a>
                                </SwiperSlide>
                            )
                        })}


                    </Swiper>
                </div>
            }
        </>
    )
}

export default Slider