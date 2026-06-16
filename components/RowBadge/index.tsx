import './styles.scss'
import React from 'react'

interface IProps {
   status: string
   type?: 'wrap-green' | 'wrap-red' | 'wrap-yellow' | 'wrap-grey' | 'wrap-blue' | 'wrap-purple'
   className?: string
   isLineThrough?: boolean
}

function RowBadge({ status = '', type, className, isLineThrough = false }: Readonly<IProps>) {
   if (!status) {
      return <>-</>
   }

   const classNames = status
      .trim()
      .split(' ')
      .map((x, i) => (i < 1 ? x : x[0].toUpperCase() + x.slice(1)))
      .join('')

   return <div className={`rowBadge ${classNames} ${className} ${type} ${isLineThrough ? 'line-through' : ''}`}>{status}</div>
}

export default RowBadge
