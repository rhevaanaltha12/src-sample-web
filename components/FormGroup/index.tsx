import React from 'react'
import './styles.scss'

interface IFormGroup {
   children: any
   header?: any
   title?: any
   desc?: any
   className?: string
   style?: React.CSSProperties
   useBtn?: boolean
   button?: any
   flex?: boolean
   useBorder?: boolean
   icon?: React.ReactNode
}

function FormGroup(props: IFormGroup) {
   const { children, title, desc, className, style, useBtn = false, button, flex = true, useBorder = true, icon } = props
   return (
      <div className={`formLayoutGroup ${className ?? ''}`} style={style}>
         {(title || desc) && (
            <div className={`formLayoutWrapper ${flex ? 'gridComp' : ''}`}>
               <div className="header">
                  {icon && <div className="headerIcon">{icon}</div>}
                  {title && <div className="title">{title}</div>}
                  {desc && <div className="desc">{desc}</div>}
                  {useBtn && <div className="useBtn">{button}</div>}
               </div>
               {flex && <div className="child">{children}</div>}
            </div>
         )}
         {!flex && <div className="child">{children}</div>}
         {useBorder && <hr className="line" />}
      </div>
   )
}

export default FormGroup
