import React from "react"

import s from './AboutUs.module.css'
import backgroundImg from './background_1.png'

const AboutUs: React.FC = () => {
  return (
    <div className={s.about_us}>
      <div className={s.about_us__image}>
        <h2> <span className={s.description__title}>Marverls</span> — best coffee and tea traditions!</h2>
        <img src={backgroundImg} alt="background" title="Marvels SHOP" />
      </div>

      <div className={s.about_us__description}>
        {/* <h2> <span className={s.description__title}>Marverls</span> — best coffee and tea traditions!</h2> */}

        <div>
          <span>
            <p>Компания начала свою деятельность сравнительно недавно, мы занимаемся закупками и распространением чая и кофе с разных уголков Мира. Цель нашей деятельности, дать возможность каждому человеку открыть для себя что-то новое в чайно-кофейной индустрии.</p>
            <p>По данным статистики компании TNS Marketing Index, чай пьют 96% россиян, но к сожалению, лишь малая часть этих людей является настоящими ценителями чая, которые умеют правильно заваривать и употреблять этот прекрасный напиток. </p>
            <p>Кофе в нашем ассортименте исключительно свежей обжарки, срок хранения которого не более 12 недель. Смело можно заявить, что 90% людей попробовав однажды наш кофе, становятся постоянными клиентами. Многие начинают углубляться в изучение кофейной культуры, узнавать новые методы заваривания, начинают понимать вкусовую гамму разных регионов произрастания кофейного зерна. </p>
            <p>Мы всегда очень рады Вашим отзывам, критике, замечаниям и похвале. </p>
          </span>
        </div>
      </div>
    </div>
  )
}

export default AboutUs