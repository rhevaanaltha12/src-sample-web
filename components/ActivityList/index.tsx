'use client'
import React from 'react'
import './styles.scss'

export interface IActivityItem {
   id: string | number
   name: string
   action: string
   time: string
   avatar?: string
   avatarInitial?: string
   avatarColor?: string
}

interface IProps {
   items: IActivityItem[]
   title?: string
}

const defaultColors = ['#4ade80', '#2f91ff', '#a78bfa', '#fbbf24', '#f87171', '#34d399']

function ActivityList({ items, title = 'Recent Activity' }: IProps) {
   return (
      <div className="activityList">
         {title && <div className="activityList__title">{title}</div>}
         <div className="activityList__items">
            {items.map((item, idx) => {
               const color = item.avatarColor ?? defaultColors[idx % defaultColors.length]
               const initial = item.avatarInitial ?? item.name.charAt(0).toUpperCase()

               return (
                  <div key={item.id} className="activityList__item">
                     <div className="activityList__connector">
                        <div className="activityList__avatar" style={{ background: color }}>
                           {initial}
                        </div>
                        {idx < items.length - 1 && <div className="activityList__line" />}
                     </div>
                     <div className="activityList__content">
                        <div className="activityList__text">
                           <span className="activityList__name">{item.name}</span>
                           <span className="activityList__action"> {item.action}</span>
                        </div>
                        <div className="activityList__time">{item.time}</div>
                     </div>
                  </div>
               )
            })}
         </div>
      </div>
   )
}

export default ActivityList
