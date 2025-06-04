"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Legend, Tooltip } from "recharts"

type OverviewProps = {
  totalUsersData: number
  totalCenters: number
  totalResources: number
}

export function Overview({ totalUsersData, totalCenters, totalResources }: OverviewProps) {
  const data = [
    {
      name: "Usuarios",
      cantidad: totalUsersData,
    },
    {
      name: "Centros de Apoyo",
      cantidad: totalCenters,
    },
    {
      name: "Recursos",
      cantidad: totalResources,
    },
  ]

  return (
    
<ResponsiveContainer width="100%" height={350}>
  <BarChart
    data={data}
    margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
    barCategoryGap="20%"
    barGap={8}
  >
    <XAxis
      dataKey="name"
      stroke="#136d34"
      fontSize={13}
      tickLine={false}
      axisLine={false}
    />
    <YAxis
      stroke="#136d34"
      fontSize={13}
      tickLine={false}
      axisLine={false}
    />
    <Tooltip
      contentStyle={{
        backgroundColor: '#f1f4f2', // neutro.ice
        borderColor: '#d4ded8',     // neutro.light
        borderRadius: 8,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        fontSize: 14,
        padding: '10px 12px',
        color: '#136d34',
      }}
      itemStyle={{ color: '#136d34' }}
      cursor={{ fill: '#e2e9e5', opacity: 0.2 }} // neutro.DEFAULT con transparencia
    />
    <Legend
      wrapperStyle={{
        color: '#136d34',
        fontSize: 13,
        paddingTop: 10,
      }}
    />
    <Bar
      dataKey="cantidad"
      fill="#22C55E"
      radius={[6, 6, 0, 0]}
      animationDuration={1000}
      animationEasing="ease-out"
    />
  </BarChart>
</ResponsiveContainer>


  )
}
