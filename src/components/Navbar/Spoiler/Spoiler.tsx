import React, { useState } from "react"
import s from './Spoiler.module.css'

import './index.css'

import { CSSTransition } from "react-transition-group"
import { SpoilerContentType } from './../../../interfaces/interfaces'

const Spoiler: React.FC<SpoilerContentType> = (props: SpoilerContentType) => {

  const [isSpoilerOpen, setIsSpoilerOpen] = useState<boolean | undefined>(false)
  const handleSetIsSpoilerOpen = (): void => setIsSpoilerOpen(!isSpoilerOpen)

  const isArrowStyle: string = props.content == null || undefined ? '' : `${s.arrow}`
  const isOpenedSpoiler: string = ((isSpoilerOpen) && (props.content !== (null || undefined))) ? `${s.openned}` : ''
  const titleStyle = `${s.spoiler__title} ${isArrowStyle} ${isOpenedSpoiler}`

  return (
    <div className={s.spoiler} onClick={handleSetIsSpoilerOpen}>
      {/* with subcategory */}
      {props.content !== undefined &&
        <span className={titleStyle}>{props.title}</span>
      }

      {/* without subcategory */}
      {props.content === undefined &&
        <a 
          className={`${titleStyle} ${s.spoiler__title_link}`}
          href={props.categoryUrl}
        >
            {props.title}
        </a>
      }

      {(props.content !== undefined && props.content !== null) &&
        <CSSTransition 
          in={isSpoilerOpen} 
          timeout={300} 
          unmountOnExit 
          classNames='spoiler'
        >   
          <ul className={s.spoiler__content}>
            {props.content?.map(subcategory => {
              return ( 
                <li className={s.spoiler__li}>
                  <a className={s.spoiler__link} href={`${props.categoryUrl}${subcategory.url}`}>
                    {subcategory.title}
                  </a>
                </li>
                )
              }
            )}
          </ul>
        </CSSTransition> 
      }
         
    </div>
  )
}

export default Spoiler;