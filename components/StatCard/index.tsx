'use client'
import React from 'react'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import './styles.scss'

type StatCardTheme = 'primary' | 'blue' | 'warning' | 'destructive' | 'violet' | 'success'

interface IProps {
   title: string
   value: string | number
   change?: number
   icon: React.ReactNode
   theme?: StatCardTheme
   suffix?: string
   description?: string
}

function StatCard({ title, value, change, icon, theme = 'primary', suffix, description }: IProps) {
   const isPositive = change !== undefined && change > 0
   const isNegative = change !== undefined && change < 0
   const isNeutral = change === 0

   return (
      <div className={`statCard statCard--${theme}`}>
         <div className="statCard__header">
            <div className="statCard__iconWrap">{icon}</div>
            {change !== undefined && (
               <div className={`statCard__badge ${isPositive ? 'up' : isNegative ? 'down' : 'neutral'}`}>
                  {isPositive && <TrendingUp size={11} />}
                  {isNegative && <TrendingDown size={11} />}
                  {isNeutral && <Minus size={11} />}
                  <span>{Math.abs(change)}%</span>
               </div>
            )}
         </div>
         <div className="statCard__body">
            <div className="statCard__value">
               {value}
               {suffix && <span className="statCard__suffix">{suffix}</span>}
            </div>
            <div className="statCard__title">{title}</div>
            {description && <div className="statCard__desc">{description}</div>}
         </div>
      </div>
   )
}

export default StatCard
