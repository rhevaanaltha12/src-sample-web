import { TieredMenu } from 'primereact/tieredmenu'
import { useId, useRef } from 'react'

interface IProps {
   actions: any
   row: any
}

function RowAction(props: IProps) {
   const { row, actions } = props
   const menu = useRef<any>(null)
   const op = useRef<any>(null)
   const items = [...actions(row)]

   const empty = [{ label: 'No Action Available' }]

   const menuTable = items.length > 0 ? items : empty
   const findTooltip = items?.find((item: any) => item?.hasOwnProperty('tooltip'))

   const handleToggle = (e: any) => {
      if (findTooltip?.tooltip) {
         console.log('Mouse entered menu')
         op.current?.toggle(e)
      }
   }

   return (
      <div className="actionButton" style={{ padding: 0 }}>
         <TieredMenu
            model={menuTable}
            popup
            ref={menu}
            id={`overlay_tmenu_${useId()}`}
            className="actionMenu"
            onMouseEnter={handleToggle}
            onMouseLeave={handleToggle}
         />
         <button
            onClick={(event: any) => {
               event?.preventDefault()
               menu.current?.toggle(event)
            }}
            aria-controls={`overlay_tmenu_${useId()}`}
            aria-haspopup
            className="btnRowAction"
         >
            <i className="pi pi-ellipsis-v"></i>
         </button>
      </div>
   )
}

export default RowAction
