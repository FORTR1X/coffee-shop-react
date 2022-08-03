import React, { useState } from "react"
import s from './Spoiler.module.css'

import './index.css'

import { CSSTransition } from "react-transition-group"
import { Subcategory } from './../../../interfaces/interfaces'

interface SpoilerContent {
  title: string | undefined | null,
  content: Subcategory[] | undefined | null,
  categoryUrl: string | undefined | null
}

const Spoiler: React.FC<SpoilerContent> = (props: SpoilerContent) => {

  const [isSpoilerOpen, setIsSpoilerOpen] = useState<boolean | undefined>(false)
  const handleSetIsSpoilerOpen = (): void => setIsSpoilerOpen(!isSpoilerOpen)

  // const titleStyle = props.content == null ? s.spoiler__title : `${s.spoiler__title} ${s.arrow}`} + ' ' + isSpoilerOpen ? `${s.opened}` : `` 

  const isArrowStyle: string = props.content == null || undefined ? '' : `${s.arrow}`
  const isOpenedSpoiler: string = ((isSpoilerOpen) && (props.content !== (null || undefined))) ? `${s.openned}` : ''
  const titleStyle = `${s.spoiler__title} ${isArrowStyle} ${isOpenedSpoiler}`

  return (
    <div className={s.spoiler} onClick={handleSetIsSpoilerOpen}>
      <span className={titleStyle}>
        {props.title}
      </span>

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