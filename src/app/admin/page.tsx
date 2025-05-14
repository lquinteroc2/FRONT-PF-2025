"use client"

import { DashboardStats } from "@/components/AdminDashboard/dashboard/dashboard-stats"
import { Overview } from "@/components/AdminDashboard/dashboard/overview"
import { RecentResources } from "@/components/AdminDashboard/dashboard/recent-resources"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

export default function Dashboard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>

      <DashboardStats />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Resumen</CardTitle>
            <CardDescription>Actividad de recursos en los últimos 30 días</CardDescription>
          </CardHeader>
          <CardContent>
            <Overview />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recursos Recientes</CardTitle>
            <CardDescription>Los últimos recursos añadidos al sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentResources />
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}
