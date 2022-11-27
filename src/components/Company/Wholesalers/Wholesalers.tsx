import React from "react"

import background from './delivery.jpg'
import s from './Wholesalers.module.css'

const Wholesalers: React.FC = () => {
    return (
        <div className={s.delivery__wrapper}>
            <img className={s.delivery__img} src={background} alt="Доставка"/>

            <div className={s.delivery__content}>
                <h3 className={s.delivery__header}>Условия доставки для оптовых покупателей</h3>
                <ul className={s.delivery__ul}>
                    <span className={s.delivery__ul_header}>Отправка по всей России ТК:</span>

                    <li className={s.delivery__li_first}>ПЭК</li>
                    <li>СДЭК</li>
                    <li>КИТ</li>
                    <li>Энергия</li>
                    <li>Magic-Trance</li>
                </ul>

                <div className={s.delivery__header_content}>
                    <h3 className={s.delivery__header}>Примечание</h3>
                    <p className={s.delivery__note}>Минимальная сумма заказа 15.000 руб.</p>
                    <p className={s.delivery__note}>Оптовый прайс и коммерческое предложение по запросу
                        olegys2006@mail.ru или по телефону +7 (978) 779-02-36</p>
                    <p className={s.delivery__warning}>[!] Чай и кофе обмену и возврату не подлежат [!]</p>
                </div>
            </div>
        </div>
    )
}

export default Wholesalers