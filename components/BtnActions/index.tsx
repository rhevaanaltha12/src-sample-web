import React from 'react'

function BtnActions(props: any) {
   const { row, actions } = props
   const items = actions(row)

   return (
      <div className="item-center" style={{ display: 'flex', alignItems: 'center' }}>
         {items.map((item: any, index: number) => (
            <React.Fragment key={index}>{item}</React.Fragment>
         ))}
      </div>
   )
}

export default BtnActions
