import React from "react"

import s from './Contacts.module.css'
import background from './contacts.jpg'

const Contacts: React.FC = () => {
  return (
    <div className={s.contacts__wrapper}>
      <img className={s.contacts__img} src={background} alt="Контакты" />
    
      <div className={s.contacts__content}>
        <h3 className={s.contacts__header}>Контакты</h3>

        <div className={s.contacts__tea}>
          <p className={s.tea__header}>Отдел продаж по чаю:</p>
          <p>Почта: marveloustea@mail.ru</p>
          <p>Телефон: +7 (978) 512-07-17</p>
        </div>

        <div className={s.contacts__coffee}>
          <p className={s.coffee__header}>Отдел продаж по кофе:</p>
          <p>Почта: marvelouscoffe@mail.ru</p>
          <p>Телефон: +7 (978) 779-02-36</p>
        </div>

        <div className={s.contacts__coffee}>
          <p className={s.coffee__header}>Адреса магазинов:</p>
          <p>г. Ялта, ул. Красноармейская 10</p>
          <p>г. Ялта, ул Весенняя 6А</p>
        </div>

        <div className={s.contacts__coffee}>
          <p className={s.coffee__header}>Время работы:</p>
          <p>Пн-Пт: с 9:00 до 18:00</p>
          <p>Сб-Вс: с 10:00 до 17:00</p>
        </div>
      </div>
    </div>
  )
}

export default Contacts