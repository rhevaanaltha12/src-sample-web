import './styles.scss'
import React from 'react'

interface IProps {
   status: any
}

function RowStatus({ status }: IProps) {
   if (!status) {
      return <>-</>
   }

   const className = status
      .trim()
      .split(' ')
      .map((x: any, i: any) => (i < 1 ? x : x[0].toUpperCase() + x.slice(1)))
      .join('')

   const isActive = ['active', 'finished', 'created', 'updated', 'checked', 'approved'].includes(
      className?.toLowerCase()
   )

   return (
      <div className={`rowStatus ${className?.toLowerCase()}`}>
         <div className="statusDot">
            {isActive && <div className="statusPing"></div>}
         </div>
         {status}
      </div>
   )
}

export default RowStatus
