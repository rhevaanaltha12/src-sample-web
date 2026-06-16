'use client'
import React from 'react'
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'

interface IDonutEntry {
   name: string
   value: number
   color: string
}

interface IProps {
   data: IDonutEntry[]
   height?: number
   innerRadius?: number
   outerRadius?: number
   showLegend?: boolean
}

function DonutChart({ data, height = 260, innerRadius = 60, outerRadius = 90, showLegend = true }: IProps) {
   return (
      <ResponsiveContainer width="100%" height={height}>
         <PieChart>
            <Pie
               data={data}
               cx="50%"
               cy="50%"
               innerRadius={innerRadius}
               outerRadius={outerRadius}
               paddingAngle={3}
               dataKey="value"
               strokeWidth={0}
            >
               {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
               ))}
            </Pie>
            <Tooltip
               contentStyle={{
                  background: 'rgba(255,255,255,0.95)',
                  border: '1px solid var(--color-c-neutral-30)',
                  borderRadius: '10px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                  fontFamily: 'var(--font-jakarta)',
                  fontSize: '12px',
               }}
            />
            {showLegend && (
               <Legend
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{ fontSize: '12px', fontFamily: 'var(--font-jakarta)' }}
               />
            )}
         </PieChart>
      </ResponsiveContainer>
   )
}

export default DonutChart
