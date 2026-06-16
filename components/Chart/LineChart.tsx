'use client'
import React from 'react'
import {
   ResponsiveContainer,
   LineChart as ReLineChart,
   Line,
   XAxis,
   YAxis,
   CartesianGrid,
   Tooltip,
   Legend,
} from 'recharts'

interface ILineSeries {
   key: string
   color: string
   label?: string
}

interface IProps {
   data: Record<string, any>[]
   series: ILineSeries[]
   xKey: string
   height?: number
   showGrid?: boolean
   showLegend?: boolean
}

function LineChart({ data, series, xKey, height = 260, showGrid = true, showLegend = false }: IProps) {
   return (
      <ResponsiveContainer width="100%" height={height}>
         <ReLineChart data={data} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
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
               cursor={{ stroke: 'var(--color-c-neutral-30)', strokeWidth: 1 }}
            />
            {showLegend && <Legend wrapperStyle={{ fontSize: '12px', fontFamily: 'var(--font-jakarta)' }} />}
            {series.map((s) => (
               <Line
                  key={s.key}
                  type="monotone"
                  dataKey={s.key}
                  name={s.label ?? s.key}
                  stroke={s.color}
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{ r: 5, strokeWidth: 0 }}
               />
            ))}
         </ReLineChart>
      </ResponsiveContainer>
   )
}

export default LineChart
