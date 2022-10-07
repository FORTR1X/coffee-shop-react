import React, { useEffect, useState } from "react"
import { PropsCheckout } from "./CheckoutContainer"

import s from './Checkout.module.css'

import Input from "./Input/Input"
import Radio from "./Ratio/Radio"
import Checkbox from "./Checkbox/Checkbox"
import { useLocalStorage } from "usehooks-ts"
import { CartType, OrderType } from "../../interfaces/interfaces"
import ReCAPTCHA from "react-google-recaptcha";

const Checkout: React.FC<PropsCheckout> = (props: PropsCheckout) => {

  const CARD = 'card'
  const CASH = 'cash'
  const SUCCESS_VALIDATION_CAPTCHA_TOKEN = props.successValidationToken

  const [reCaptchaSizeMobile, setRecaptchaSizeMobile] = useState<boolean | undefined>()
  useEffect( () => {
    let pageWidth = document.documentElement.scrollWidth
    const PAGE_WIDTH_IS_MOBILE = pageWidth < 416
    setRecaptchaSizeMobile(PAGE_WIDTH_IS_MOBILE)
  }, [document.documentElement.scrollWidth])

  const FIRST_NAME = props.firstName
  const handleSetFirstName = (value: string) => {
    props.setFirstName(value)
  }

  const LAST_NAME = props.lastName
  const handleSetLastName = (value: string) => {
    props.setLastName(value)
  }

  const PHONE_NUMBER = props.phoneNumber
  const handleSetPhoneNumber = (value: string) => {
    props.setPhoneNumber(value)
  }

  const EMAIL = props.email
  const handleSetEmail = (value: string) => {
    props.setEmail(value)
  }

  const ADDRESS = props.address
  const handleSetAddress = (value: string) => {
    props.setAddress(value)
  }

  const ORDER_NOTE = props.orderNote
  const handleSetOrderNote = (value: string) => {
    props.setOrderNote(value)
  }

  useEffect(() => {
    setCartTotalCost(handleGetTotalCostCart())
  }, [props.cartProductList])

  const handleGetTotalCostCart = () => {
    let totalCost = 0
    const cartProductsList = props.cartProductList 

    if (cartProductsList !== null && cartProductsList.length > 0)
    cartProductsList.map((product, index) => {
      totalCost += (product.price * cartProducts[index].count)
    })

    return totalCost
  }

  const [cartProducts, setCartProducts] = useLocalStorage('cart', [] as Array<CartType>)
  const [cartTotalCost, setCartTotalCost] = useState(handleGetTotalCostCart())

  const [paymentMethod, setPaymentMethod] = useState('')
  const handleSetPaymentMethod = (value: string) => {
    setPaymentMethod(value)
  }

  const [isConfirmedHandlingPersonalInfo, setIsConfirmHandlingPersonalInfo] = useState(false)
  const handleSetIsConfirmHandlingPersonalInfo = () => {
    setIsConfirmHandlingPersonalInfo(!isConfirmedHandlingPersonalInfo)
  }
  
  const [isConfirmedPublicOffer, setIsConfirmPublicOffer] = useState(false)
  const handleSetIsConfirmPublicOffer = () => {
    setIsConfirmPublicOffer(!isConfirmedPublicOffer)
  }

  const [isAllNeedCheckboxAndRadioSelected, setIsAllNeedCheckboxAndRadioSelected] = useState(false)
  useEffect(() => {
    const PATMENT_METHOD_SELECTED = paymentMethod.length > 0
    const FIRST_NAME_NOT_EMPTY = FIRST_NAME.length > 0
    const LAST_NAME_NOT_EMPTY = LAST_NAME.length > 0
    const EMAIL_NOT_EMPTY = EMAIL.length > 0
    const PHONE_NUMBER_NOT_EMPTY = PHONE_NUMBER.length > 0
    const ADDRESS_NOT_EMPTY = ADDRESS.length > 0

    if (PATMENT_METHOD_SELECTED && isConfirmedHandlingPersonalInfo && isConfirmedPublicOffer
      && FIRST_NAME_NOT_EMPTY && LAST_NAME_NOT_EMPTY && EMAIL_NOT_EMPTY && PHONE_NUMBER_NOT_EMPTY
      && ADDRESS_NOT_EMPTY && SUCCESS_VALIDATION_CAPTCHA_TOKEN) {
      setIsAllNeedCheckboxAndRadioSelected(true)
    } else {
      setIsAllNeedCheckboxAndRadioSelected(false)
    }
  }, [
    paymentMethod, isConfirmedHandlingPersonalInfo, isConfirmedPublicOffer,
    FIRST_NAME, LAST_NAME, EMAIL, PHONE_NUMBER,
    ADDRESS, SUCCESS_VALIDATION_CAPTCHA_TOKEN
  ])

  const validateToken = async (token: string | null) => {
    if (token == null)
      props.setSuccessValidationToken(false)

    if (token !== null) {
      props.validateReCAPTCHAToken(token)
    }
  }

  const [cartStorage, setCartStorage] = useLocalStorage('cart', [] as Array<CartType>)
  const handleOnClickBtnConfirm = () => {
    const order: OrderType =  {
      firstName: props.firstName,
      lastName: props.lastName,
      phoneNumber: props.phoneNumber,
      email: props.email,
      address: props.address,
      orderNote: props.orderNote,
      methodPayment: paymentMethod == 'cash' ? 'Наличными' : 'Онлайн перевод',
      productDtoList: cartStorage
    }

    props.confirmCheckoutOrder(order)
  }

  const handleSetSuccessOrder = (state: boolean) => {
    props.setSuccessOrder(state)
  }
  useEffect(() => {
    if (props.successOrder) {
      setTimeout(() => {
        handleSetSuccessOrder(false)
      }, 10000)
    }
  }, [props.successOrder])

  return (
    <>
      {props.cartProductList !== null &&
        <div className={s.checkout__wrapper}>
          <div className={s.checkout__contacts_inf}>
            <h3>Детали заказа</h3>

            <div className={s.contacts_inf}>
              <div className={s.contacts_inf__fields}>
                <Input
                  type="text"
                  placeholder="Введите имя"
                  title="Имя"
                  required={true}
                  value={FIRST_NAME}
                  multiple={false}
                  onChangeHandle={handleSetFirstName}
                />

                <Input
                  type="text"
                  placeholder="Введите фамилию"
                  title="Фамилия"
                  required={true}
                  value={LAST_NAME}
                  multiple={false}
                  onChangeHandle={handleSetLastName}
                />

                <Input
                  type="text"
                  placeholder="+7 (***) *** - ** - **"
                  title="Номер телефона"
                  required={true}
                  value={PHONE_NUMBER}
                  multiple={false}
                  onChangeHandle={handleSetPhoneNumber}
                />

                <Input
                  type="text"
                  placeholder="Введите email"
                  title="Электронная почта"
                  required={true}
                  value={EMAIL}
                  multiple={false}
                  onChangeHandle={handleSetEmail}
                />

              </div>

              <Input
                type="text"
                placeholder="Введите адрес доставки"
                title="Адрес доставки"
                required={true}
                value={ADDRESS}
                onChangeHandle={handleSetAddress}
                fullWidth
                multiple={false}
              />

              <Input
                type="text"
                placeholder="Укажите примечание к заказу (необязательно)"
                title="Примечание к заказу"
                required={false}
                value={ORDER_NOTE}
                onChangeHandle={handleSetOrderNote}
                fullWidth
                multiple
              /> 
            </div>

            <div className={s.contacts_inf__radio}>
              <h3>Способ оплаты:</h3>
              
              <div className={s.radio__group}>
                <Radio
                  id={CARD}
                  name="payment"
                  title="Онлайн перевод"
                  onClick={handleSetPaymentMethod}
                />

                <Radio
                  id={CASH}
                  name="payment"
                  title="Наличными при получении (при доставке по городу)"
                  onClick={handleSetPaymentMethod}
                />
              </div>  
            </div>

            <div className={s.contacts_inf__agreement}>
              <h3>Соглашения</h3>

              <div className={s.checkbox__group}>
                <Checkbox
                  id="personal"
                  title="Нажимая кнопку «Оформить заказ», я даю свое согласие на обработку моих персональных данных, в соответствии с Федеральным законом от 27.07.2006 года №152-ФЗ «О персональных данных», на условиях и для целей, определенных в Согласии на обработку персональных данных"
                  onChange={handleSetIsConfirmHandlingPersonalInfo}
                />

                <Checkbox
                  id="oferta"
                  title="Нажимая на кнопку «Оформить заказ», я принимаю условия"
                  link="ПУБЛИЧНОЙ ОФЕРТЫ О ПРОДАЖЕ ТОВАРОВ"
                  href="#"
                  onChange={handleSetIsConfirmPublicOffer}
                />
              </div>  
            </div>
          </div>

          <div className={s.checkout__cart_inf}>
            <h3 className={s.cart__header_h3}>Ваш заказ</h3>

            <div className={s.cart}>
              <div className={s.cart__header}>
                <h3>Товар</h3>
                <h3>Сумма</h3>
              </div>

              <div className={s.cart__products}>
                {props.cartProductList.map((product, index) => {
                  return (
                    <div className={s.product}>
                      <span className={s.product__header}>{product.header} * {cartProducts[index].count}</span>
                      <span className={s.product__price}>{product.price * cartProducts[index].count} руб.</span>
                    </div>
                  )
                })}
              </div>

              <div className={s.cart__total_cost}>
                <span>Итого</span>
                <span>{cartTotalCost} руб</span>
              </div>
            </div>
            
            <div className={s.error__container}>    
              {(FIRST_NAME.length == 0 || LAST_NAME.length == 0 || EMAIL.length == 0 || PHONE_NUMBER.length == 0 || ADDRESS.length == 0) &&
                <p className={s.error__not_selected}>Заполните все обязательные поля <strong>(обозначены *)</strong></p>
              }

              {paymentMethod.length == 0 &&
                <p className={s.error__not_selected}>Выберите способ оплаты!</p>
              }

              {!isConfirmedHandlingPersonalInfo &&
                <p className={s.error__not_selected}>Подтвердите согласие на обработку персональных данных!</p>
              }

              {!isConfirmedPublicOffer &&
                <p className={s.error__not_selected}>Подвердите согласие на заключение договора публичной оферты!</p>
              }
            </div>

            <div className={s.reCaptcha__container}>
              <ReCAPTCHA
                sitekey="6Lfu-QciAAAAANDBb4zDC5uRzSJ3Wft_kAkuD8Dk"
                onChange={(token) => validateToken(token)}
                size={reCaptchaSizeMobile ? "compact" : "normal"}
              />
            </div>  

            <div
              onClick={handleOnClickBtnConfirm}
              className={isAllNeedCheckboxAndRadioSelected ? s.btn_confirm : `${s.btn_confirm} ${s.disabled}`}
            >
              Подтвердить заказ
            </div>
 
            {props.successOrder &&
              <div className={s.success_order_alert}>
                <span>
                  Заказ успешно отправлен на обработку, в ближайшее время ожидайте ответное сообщение или звонок для подтверждения заказа.
                </span>
                
                <div
                  onClick={() => {handleSetSuccessOrder(false)}}
                  className={s.close_icon}
                />
              </div> 
            }
          </div>
        </div>
      }
    </>  
  )
}

export default Checkout