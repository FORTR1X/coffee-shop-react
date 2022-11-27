import React from "react"

import s from './Delivery.module.css'
import background from './delivery.jpg'

const Delivery: React.FC = () => {
    return (
        <div className={s.delivery__wrapper}>
            <img className={s.delivery__img} src={background} alt="Доставка"/>

            <div className={s.delivery__content}>
                <h3 className={s.delivery__header}>Условия доставки для розничных покупателей</h3>

                <div className={s.delivery__text_content}>
                    <span className={s.delivery__subheader}>Самовывоз</span>
                    <span className={s.delivery__text}>г. Ялта, ул. Красноармейская 10</span>
                    <span className={s.delivery__text}>г. Ялта, ул Весенняя 6А</span>

                    <span className={s.delivery__subheader}>Доставка</span>
                    <span className={s.delivery__text}>Доставка по городу осуществляется с 18:00 до 22:00</span>

                    <span className={s.delivery__subheader}>Способы оплаты</span>

                    <ul className={s.delivery__ul_first}>
                        <ul className={s.delivery__ul_second}>
                            <span>По городу Ялта:</span>
                            <li>Онлайн перевод</li>
                            <li>Наличными при получении</li>
                        </ul>

                        <ul className={s.delivery__ul_second}>
                            <span>Вне города Ялта:</span>
                            <li>Только онлайн перевод</li>
                        </ul>
                    </ul>

                </div>
            </div>
        </div>
    )
}

export default Delivery