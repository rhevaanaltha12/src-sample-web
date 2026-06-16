'use client'
import React from 'react'
import {
   ResponsiveContainer,
   BarChart as ReBarChart,
   Bar,
   XAxis,
   YAxis,
   CartesianGrid,
   Tooltip,
   Legend,
   Cell,
} from 'recharts'

interface IBarSeries {
   key: string
   color: string
   label?: string
}

interface IProps {
   data: Record<string, any>[]
   series: IBarSeries[]
   xKey: string
   height?: number
   showGrid?: boolean
   showLegend?: boolean
   radius?: number
}

function BarChart({ data, series, xKey, height = 260, showGrid = true, showLegend = false, radius = 6 }: IProps) {
   return (
      <ResponsiveContainer width="100%" height={height}>
         <ReBarChart data={data} margin={{ top: 4, right: 8, left: -20, bottom: 0 }} barCategoryGap="30%">
            {showGrid && (
               <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--color-c-neutral-30)"
                  vertical={false}
               />
            )}
            <XAxis
               dataKey={xKey}
               tick={{ fontSize: 11, fill: 'var(--color-c-neutral-50)', fontFamily: 'var(--font-jakarta)' }}
               axisLine={false}
               tickLine={false}
            />
            <YAxis
               tick={{ fontSize: 11, fill: 'var(--color-c-neutral-50)', fontFamily: 'var(--font-jakarta)' }}
               axisLine={false}
               tickLine={false}
            />
            <Tooltip
               contentStyle={{
                  background: 'rgba(255,255,255,0.95)',
                  border: '1px solid var(--color-c-neutral-30)',
                  borderRadius: '10px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                  fontFamily: 'var(--font-jakarta)',
                  fontSize: '12px',
               }}
               cursor={{ fill: 'var(--color-c-neutral-20)' }}
            />
            {showLegend && <Legend wrapperStyle={{ fontSize: '12px', fontFamily: 'var(--font-jakarta)' }} />}
            {series.map((s) => (
               <Bar key={s.key} dataKey={s.key} name={s.label ?? s.key} fill={s.color} radius={[radius, radius, 0, 0]} />
            ))}
         </ReBarChart>
      </ResponsiveContainer>
   )
}

export default BarChart
