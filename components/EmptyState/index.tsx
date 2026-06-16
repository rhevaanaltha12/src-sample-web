'use client'
import React from 'react'
import { Inbox } from 'lucide-react'
import './styles.scss'

interface IProps {
   title?: string
   description?: string
   icon?: React.ReactNode
   action?: React.ReactNode
}

function EmptyState({
   title = 'No data found',
   description = 'There is nothing to display here yet.',
   icon,
   action,
}: IProps) {
   return (
      <div className="emptyState">
         <div className="emptyState__iconWrap">
            {icon ?? <Inbox size={28} strokeWidth={1.5} />}
         </div>
         <div className="emptyState__title">{title}</div>
         <div className="emptyState__desc">{description}</div>
         {action && <div className="emptyState__action">{action}</div>}
      </div>
   )
}

export default EmptyState
