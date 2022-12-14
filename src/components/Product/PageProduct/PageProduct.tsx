import React, {useEffect, useRef, useState} from "react"
import {useParams} from "react-router-dom"
import {useLocalStorage} from "usehooks-ts"
import {BASE_URL} from "../../../hooks/useApi"
import {CartType} from "../../../interfaces/interfaces"

// import Swiper JS
import {Swiper, SwiperSlide} from 'swiper/react'
import {Navigation, Pagination, Autoplay, A11y} from 'swiper'
// import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

import s from './PageProduct.module.css'
import {PropsPageProduct} from "./PageProductContainer"
import questionSvg from './question.svg'

const PageProduct: React.FC<PropsPageProduct> = (props: PropsPageProduct) => {
    const pageId: string | undefined = useParams().id
    const productId: number | undefined = pageId === undefined ? undefined : parseInt(pageId)

    const productImages: Array<string> = props.productImages
    useEffect(() => {
        if (props.product == null && productId !== undefined) {
            props.getPageProducts(productId)
        }

        if (props.product !== null && props.productImages.length == 0) {
            props.getUrlProductImages(props.product.id)
        }
    }, [props.product])

    const [productCount, setProductCount] = useState(1)
    const handleMinusProductCount = () => {
        if (productCount > 1)
            setProductCount(productCount - 1)
    }

    const handlePlusProductCount = () => {
        setProductCount(productCount + 1)
    }

    const handleSetProductCount = (event: React.ChangeEvent<HTMLInputElement>) => {
        const productCount = Number(event.currentTarget.value)

        if (productCount > 0)
            setProductCount(productCount)
    }

    const addCartBtnRef = useRef<HTMLButtonElement>(null)
    const successfullyTextRef = useRef<HTMLSpanElement>(null)

    const [cart, setCart] = useLocalStorage('cart', [] as Array<CartType>)
    const handleAddToCart = (productId: number, count?: number) => {
        // If new item already exists cart, we just modify count this item in local storage
        const cartSubList = cart
        let isSimilarItem = false
        const item: CartType = {productId, count: count == undefined ? 1 : count}

        cartSubList.map((cartItem) => {
            if (cartItem.productId == item.productId) {
                cartItem.count = count == undefined ? cartItem.count + 1 : cartItem.count + count
                isSimilarItem = true
            }
        })
        if (isSimilarItem)
            setCart(cartSubList)
        else
            setCart([...cart, item])

        animationSuccessfullyAddToCart()
    }

    const animationSuccessfullyAddToCart = () => {
        if (successfullyTextRef.current !== null) {
            successfullyTextRef.current.classList.toggle(s.active)

            setTimeout(() => {
                if (successfullyTextRef.current !== null) {
                    successfullyTextRef.current.classList.toggle(s.active)
                }
            }, 3000)
        }

        if (addCartBtnRef.current !== null) {
            addCartBtnRef.current.classList.toggle(s.successfully)

            setTimeout(() => {
                if (addCartBtnRef.current !== null)
                    addCartBtnRef.current.classList.toggle(s.successfully)
            }, 3000)
        }
    }

    return (
        <div className={s.product__wrapper}>
            <div className={s.product__container}>
                {props.product !== null &&
                    <div>
                        <div className={s.bread_crumbs}>
                            <a href="/">?????????????? / </a>
                            <a href={props.product.subcategory.category.url}>{props.product.subcategory.category.title} / </a>
                            <a href={`${props.product.subcategory.category.url}${props.product.subcategory.url}`}>{props.product.subcategory.title} / </a>
                            <span>{props.product.header}</span>
                        </div>

                        <div className={s.product}>
                            <div className={s.img__container}>
                                <Swiper
                                    modules={[Navigation, A11y, Autoplay]}
                                    autoplay={{delay: 6000, pauseOnMouseEnter: false, disableOnInteraction: false}}
                                    spaceBetween={0}
                                    slidesPerView={1}
                                    navigation
                                    loop
                                    speed={800}
                                    className={s.swiper__wrapper}
                                    allowTouchMove
                                    slideToClickedSlide
                                >
                                    {productImages.map((productUrl, index) => {
                                        return (
                                            <SwiperSlide key={index * 2}>
                                                <img className={s.swiper__img} src={`${BASE_URL}${productUrl}`}/>
                                            </SwiperSlide>
                                        )
                                    })}
                                </Swiper>
                            </div>

                            <div className={s.right__container}>
                                <div className={s.product__header}>{props.product.header}</div>

                                <div className={s.price}>
                  <span>{props.product.price} ??????
                    <span className={s.price__unit}>
                      {props.product.subcategory.category.title == '??????' ? '/50 ????' : '/1 ????'}
                    </span>
                  </span>
                                </div>

                                <div className={s.btn__group}>
                                    <div className={s.counter__container}>
                                        <input
                                            type='button'
                                            onClick={handleMinusProductCount}
                                            className={s.counter__minus}
                                            value="-"
                                        />

                                        <input
                                            type='text'
                                            onChange={(event) => {
                                                handleSetProductCount(event)
                                            }}
                                            className={s.counter__count} value={productCount}
                                        />

                                        <input type='button'
                                               onClick={handlePlusProductCount}
                                               className={s.counter__plus}
                                               value="+"
                                        />
                                    </div>

                                    <button
                                        ref={addCartBtnRef}
                                        className={s.btn__add_to_cart}
                                        onClick={() => {
                                            // @ts-ignore
                                            handleAddToCart(props.product.id, productCount)
                                        }}
                                    >
                                        ?? ??????????????
                                    </button>
                                </div>
                                <div className={s.successfully__text_container}>
                  <span
                      ref={successfullyTextRef}
                      className={s.successfully__text}
                  >
                    ?????????? ?????????????? ???????????????? ?? ??????????????!
                  </span>
                                </div>

                                <span className={s.description}>{props.product.description}</span>

                                <div className={s.split_line}/>

                                <span className={s.product_id}>??????????????: <span>#{props.product.id}</span></span>
                                <span className={s.product_category}>
                  ??????????????????: 
                  <span>
                    {/* if category have subcategory */}
                      {props.product.subcategory.category.title != props.product.subcategory.title &&
                          `${props.product.subcategory.category.title}, ${props.product.subcategory.title}`
                      }

                      {/* if category don't have subcategory */}
                      {props.product.subcategory.category.title == props.product.subcategory.title &&
                          props.product.subcategory.category.title
                      }
                  </span>
                </span>

                            <div className={s.split_line}/>

                                <div className={s.footer}>
                                    <div className={s.footer__question}>
                                        <img src={questionSvg} alt="ask"/>
                                        <span>???????????? ????????????</span>
                                    </div>

                                    <div className={s.footer_share}>
                                        <span>Share:</span>
                                        <div className={s.social__container}>
                                            <div>
                                                <a href="" className={s.link__vk}>
                                                    <svg id={s.vk_social} width="54" height="54" viewBox="0 0 54 54"
                                                         fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M53 27C53 41.3594 41.3594 53 27 53C12.6406 53 1 41.3594 1 27C1 12.6406 12.6406 1 27 1C41.3594 1 53 12.6406 53 27Z"
                                                            stroke="#4D76A1" strokeWidth="2"/>
                                                        <path id={s.vk_title_social} fillRule="evenodd"
                                                              clipRule="evenodd"
                                                              d="M25.977 38.8441H28.0969C28.0969 38.8441 28.7402 38.7703 29.0672 38.4222C29.3731 38.0953 29.3625 37.4941 29.3625 37.4941C29.3625 37.4941 29.3203 34.6464 30.6387 34.2351C31.9359 33.8238 33.6129 36.9773 35.3848 38.2007C36.7242 39.1183 37.7367 38.9179 37.7367 38.9179L42.4723 38.8546C42.4723 38.8546 44.9508 38.707 43.7695 36.7558C43.6746 36.5976 43.084 35.3109 40.2469 32.6847C37.2832 29.932 37.6734 30.375 41.2488 25.6078C43.432 22.7074 44.2969 20.9355 44.0227 20.1761C43.759 19.4484 42.1664 19.6488 42.1664 19.6488L36.8297 19.6804C36.8297 19.6804 36.4395 19.6277 36.1441 19.7964C35.8594 19.9652 35.6695 20.366 35.6695 20.366C35.6695 20.366 34.8258 22.6125 33.6973 24.5214C31.3242 28.5503 30.375 28.7613 29.9848 28.5187C29.0777 27.9281 29.3098 26.1773 29.3098 24.9222C29.3098 21.0199 29.9004 19.3851 28.1602 18.9632C27.5801 18.8261 27.1582 18.7312 25.6711 18.7207C23.7727 18.6996 22.159 18.7207 21.2414 19.1742C20.6402 19.4695 20.1656 20.1339 20.4504 20.1656C20.7984 20.2078 21.6 20.3871 22.0219 20.9566C22.5703 21.6949 22.5492 23.3718 22.5492 23.3718C22.5492 23.3718 22.8656 27.9703 21.8109 28.5398C21.0938 28.93 20.1023 28.1285 17.993 24.4793C16.9066 22.6019 16.0945 20.5347 16.0945 20.5347C16.0945 20.5347 15.9363 20.1445 15.6516 19.9441C15.3035 19.691 14.8289 19.6171 14.8289 19.6171L9.76641 19.6488C9.76641 19.6488 9.00704 19.6699 8.72227 19.9968C8.47969 20.2921 8.70118 20.9039 8.70118 20.9039C8.70118 20.9039 12.6668 30.1851 17.1598 34.8574C21.3047 39.1289 25.977 38.8441 25.977 38.8441Z"
                                                              fill="#4D76A1"/>
                                                    </svg>
                                                </a>
                                            </div>

                                            <div>
                                                <a href="" className={s.link__whatsapp}>
                                                    <svg id={s.whatsapp_social} width="54" height="54"
                                                         viewBox="0 0 54 54" fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M27 53C12.6429 53 1 41.3571 1 27C1 12.6429 12.6429 1 27 1C41.3571 1 53 12.6429 53 27C53 41.3571 41.3571 53 27 53Z"
                                                            stroke="#25D366" strokeWidth="2"/>
                                                        <path id={s.whatsapp_title_social} fillRule="evenodd"
                                                              clipRule="evenodd"
                                                              d="M40.1168 12.4595C36.7688 9.10611 32.3084 7.25931 27.5618 7.25391C17.7824 7.25391 9.81743 15.2135 9.81743 24.9983C9.81743 28.1249 10.6328 31.1813 12.188 33.8705L9.67163 43.0667L19.0784 40.5989C21.6704 42.0137 24.5864 42.7589 27.5564 42.7589H27.5618C37.3412 42.7589 45.3008 34.7993 45.3062 25.0145C45.3116 20.2733 43.4702 15.8129 40.1168 12.4595ZM27.5672 39.7619H27.5618C24.9158 39.7619 22.3184 39.0491 20.0558 37.7045L19.5158 37.3859L13.9322 38.8493L15.4226 33.4061L15.0716 32.8499C13.5974 30.5009 12.8144 27.7901 12.8144 24.9983C12.8198 16.8659 19.4348 10.2509 27.5726 10.2509C31.5146 10.2509 35.2136 11.7899 38 14.5763C40.7864 17.3627 42.32 21.0725 42.3146 25.0091C42.3146 33.1469 35.6942 39.7619 27.5672 39.7619ZM35.6564 28.7135C35.2136 28.4921 33.032 27.4175 32.627 27.2717C32.222 27.1259 31.925 27.0503 31.628 27.4931C31.331 27.9359 30.4832 28.9349 30.224 29.2319C29.9648 29.5289 29.7056 29.5667 29.2628 29.3453C28.82 29.1239 27.389 28.6541 25.6988 27.1421C24.3812 25.9649 23.4902 24.5123 23.231 24.0695C22.9718 23.6267 23.204 23.3837 23.4254 23.1623C23.6252 22.9625 23.8682 22.6439 24.0896 22.3847C24.311 22.1255 24.3866 21.9419 24.5324 21.6449C24.6782 21.3479 24.608 21.0887 24.4946 20.8673C24.3812 20.6459 23.4956 18.4643 23.1284 17.5733C22.7666 16.7093 22.4048 16.8281 22.1294 16.8119C21.8702 16.8011 21.5732 16.7957 21.2816 16.7957C20.9846 16.7957 20.504 16.9091 20.099 17.3519C19.694 17.7947 18.5492 18.8693 18.5492 21.0509C18.5492 23.2325 20.1368 25.3439 20.3582 25.6355C20.5796 25.9325 23.4848 30.4091 27.9344 32.3315C28.9928 32.7905 29.819 33.0605 30.4616 33.2657C31.5254 33.6059 32.492 33.5573 33.2534 33.4439C34.1066 33.3143 35.8778 32.3693 36.245 31.3379C36.6122 30.3011 36.6122 29.4155 36.5042 29.2319C36.3962 29.0483 36.0992 28.9403 35.6564 28.7135Z"
                                                              fill="#25D366"/>
                                                    </svg>
                                                </a>
                                            </div>

                                            <div>
                                                <a href="" className={s.link__viber}>
                                                    <svg id={s.viber_social} width="57" height="57" viewBox="0 0 57 57"
                                                         fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M47.3902 9.61249C42.5532 4.77707 35.8684 1.78857 28.5032 1.78857C21.1229 1.78857 14.4375 4.77707 9.60134 9.61238C4.77916 14.4493 1.77698 21.1342 1.77698 28.4996C1.77698 35.8804 4.77916 42.5505 9.60134 47.3875C14.4374 52.2233 21.1229 55.2111 28.5032 55.2111C35.8684 55.2111 42.5534 52.2232 47.3902 47.3875C52.212 42.5505 55.2146 35.8804 55.2146 28.4996C55.2146 21.1343 52.2119 14.4494 47.3902 9.61249ZM45.911 45.9226C41.4592 50.3744 35.2915 53.1258 28.5032 53.1258C21.6995 53.1258 15.5319 50.3744 11.0801 45.9226C6.62821 41.456 3.87741 35.3036 3.87741 28.4998C3.87741 21.6968 6.62821 15.5439 11.0801 11.0922C15.5319 6.64025 21.6995 3.87419 28.5032 3.87419C35.2915 3.87419 41.4591 6.64036 45.911 11.0922C50.3629 15.5439 53.1291 21.6968 53.1291 28.4998C53.129 35.3036 50.3629 41.456 45.911 45.9226Z"
                                                            fill="#826CB4"/>
                                                        <path id={s.viber_title_social}
                                                              d="M30.5339 14.5974C38.109 15.8486 41.3145 19.6854 42.7156 27.7851C42.7156 27.8663 42.7156 27.9268 42.7156 27.9857C42.7156 28.7331 42.4847 29.7034 43.3957 29.7034C44.1964 29.7236 44.1545 29.0777 44.1545 28.4512C44.1174 28.2296 44.0777 28.0476 44.0777 27.8663C44.1705 20.2105 37.8789 13.1028 30.6194 12.8595C30.0427 12.9602 28.9941 12.4553 28.9016 13.7682C28.8824 14.6379 29.9 14.5155 30.5339 14.5974Z"
                                                              fill="#826CB4"/>
                                                        <path id={s.viber_title_social}
                                                              d="M41.7624 35.6018C40.7857 34.8444 39.7126 34.1636 38.7175 33.4634C36.6684 32.1007 34.7914 31.9888 33.2786 34.2013C32.417 35.4508 31.2097 35.5075 29.9657 34.9582C26.4993 33.4634 23.8374 31.1364 22.2671 27.7114C22.0369 27.1817 21.8841 26.6715 21.8647 26.1985C21.807 25.29 22.19 24.4961 23.2247 23.7953C24.0862 23.2466 24.9286 22.5842 24.8712 21.3542C24.7948 19.7463 20.7726 14.3911 19.1649 13.8042C18.5131 13.577 17.862 13.6156 17.1919 13.8042C13.4573 15.0334 11.9254 17.9866 13.3997 21.4863C14.2424 23.4547 15.1428 25.2899 16.2151 27.0111C20.7923 34.5801 27.5331 40.1054 36.2277 43.7191C36.8212 43.9651 37.4918 44.0789 37.8552 44.1545C40.2876 44.1923 43.1218 41.9028 43.9457 39.6696C44.75 37.4942 43.0651 36.662 41.7624 35.6018Z"
                                                              fill="#826CB4"/>
                                                        <path id={s.viber_title_social}
                                                              d="M31.6055 16.9807C30.8535 16.8878 29.8946 16.5757 29.726 17.5493C29.5382 18.5596 30.6091 18.4869 31.3048 18.6335C36.0428 19.6445 37.6593 21.2967 38.4487 25.7808C38.4855 25.9647 38.5055 26.203 38.5055 26.4052C38.5617 26.9378 38.693 27.4148 39.52 27.2689C39.9339 27.2133 40.0845 26.9934 40.1031 26.6813C40.1595 26.4052 40.1031 26.0375 40.1408 25.7808C40.1596 21.4622 36.3054 17.5493 31.6055 16.9807Z"
                                                              fill="#826CB4"/>
                                                        <path id={s.viber_title_social}
                                                              d="M31.7195 20.874C31.2411 20.874 30.7628 20.9283 30.5786 21.4379C30.3027 22.1647 30.8734 22.3641 31.4429 22.4548C33.3387 22.7279 34.3321 23.8187 34.5347 25.6357C34.553 25.89 34.6454 26.09 34.7555 26.2544C34.9212 26.4343 35.1231 26.5081 35.3807 26.4902C35.5465 26.4902 35.675 26.4345 35.7851 26.3807C36.0991 26.1443 36.1534 25.7081 36.1167 25.2538C36.1534 23.2011 33.7614 20.819 31.7195 20.874Z"
                                                              fill="#826CB4"/>
                                                    </svg>
                                                </a>
                                            </div>

                                            <div>
                                                <a href="" className={s.link__email}>
                                                    <svg id={s.email_social} width="54" height="54" viewBox="0 0 54 54"
                                                         fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path id={s.email_title_social}
                                                              d="M39.8478 14.1522C36.5252 10.8298 32.1078 9 27.4091 9C22.7104 9 18.2929 10.8298 14.9704 14.1522C11.648 17.4748 9.81818 21.8922 9.81818 26.5909C9.81818 31.2896 11.648 35.7071 14.9704 39.0296C18.2929 42.352 22.7104 44.1818 27.4091 44.1818C29.7834 44.1818 32.0873 43.7166 34.2566 42.799L33.4088 40.7947C31.5092 41.5982 29.4905 42.0056 27.4091 42.0056C18.9094 42.0056 11.9944 35.0906 11.9944 26.5909C11.9944 18.0912 18.9094 11.1762 27.4091 11.1762C35.9088 11.1762 42.8238 18.0912 42.8238 26.5909C42.8238 30.3139 40.5363 32.0096 38.4109 32.0096C36.2856 32.0096 33.9981 30.3139 33.9981 26.5909C33.9981 22.9577 31.0423 20.0019 27.4091 20.0019C23.7759 20.0019 20.8201 22.9578 20.8201 26.5909C20.8201 30.2241 23.7759 33.1799 27.4091 33.1799C29.5603 33.1799 31.4738 32.1436 32.6771 30.5442C32.9852 31.1664 33.373 31.7292 33.8406 32.2208C35.0457 33.4879 36.6688 34.1857 38.4109 34.1857C40.1531 34.1857 41.7762 33.4879 42.9813 32.2208C44.3019 30.8323 45 28.8855 45 26.5909C45 21.8922 43.1702 17.4748 39.8478 14.1522ZM27.4091 31.0037C24.9759 31.0037 22.9963 29.0241 22.9963 26.5909C22.9963 24.1577 24.9759 22.1781 27.4091 22.1781C29.8423 22.1781 31.8219 24.1577 31.8219 26.5909C31.8219 29.0241 29.8423 31.0037 27.4091 31.0037Z"
                                                              fill="#2B74CA"/>
                                                        <circle cx="27" cy="27" r="26" stroke="#2B74CA"
                                                                strokeWidth="2"/>
                                                        <defs>
                                                            <clipPath id="clip0_2729_7784">
                                                                <rect width="35.1818" height="35.1818" fill="white"
                                                                      transform="translate(9.81818 9)"/>
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                </a>
                                            </div>

                                            <div>
                                                <a href="" className={s.link__telegram}>
                                                    <svg id={s.telegram_social} width="54" height="54"
                                                         viewBox="0 0 54 54" fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M53 27C53 41.3594 41.3594 53 27 53C12.6406 53 1 41.3594 1 27C1 12.6406 12.6406 1 27 1C41.3594 1 53 12.6406 53 27Z"
                                                            stroke="#22A6DC" strokeWidth="2"/>
                                                        <path id={s.telegram_title_social}
                                                              d="M40.1414 15.5355L35.3215 39.8461C35.3215 39.8461 34.6465 41.5336 32.7902 40.7215L21.6633 32.1891L17.6133 30.2379L10.8 27.9492C10.8 27.9492 9.75584 27.5801 9.65037 26.768C9.5449 25.9559 10.8316 25.5234 10.8316 25.5234L37.916 14.9027C37.916 14.8922 40.1414 13.9113 40.1414 15.5355Z"
                                                              fill="#22A6DC"/>
                                                        <path id={s.telegram_title_social}
                                                              d="M20.7984 39.572C20.7984 39.572 20.4715 39.5403 20.0707 38.2642C19.6699 36.988 17.6133 30.238 17.6133 30.238L33.9715 19.8493C33.9715 19.8493 34.9207 19.2798 34.8785 19.8493C34.8785 19.8493 35.0473 19.9548 34.541 20.4188C34.0348 20.8935 21.6949 31.9888 21.6949 31.9888"
                                                              fill="#22A6DC"/>
                                                        <path id={s.telegram_title_social}
                                                              d="M25.9242 35.4586L21.5261 39.477C21.5261 39.477 21.1781 39.7406 20.809 39.5719L21.6527 32.1152"
                                                              fill="#22A6DC"/>
                                                    </svg>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default PageProduct