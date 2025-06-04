"use client"

import { DashboardStats, ResourceCounts } from "@/components/AdminDashboard/dashboard/dashboard-stats"
import { Overview } from "@/components/AdminDashboard/dashboard/overview"
import { RecentResources } from "@/components/AdminDashboard/dashboard/recent-resources"
import { getTotalHelppoins, getTotalResourceCounts, getTotalUsers } from "@/components/AdminDashboard/dashboard/resources-helper"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/context/Auth"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function Dashboard() {

  // ---------- STATE ----------
const [totalCounts, setTotalCounts] = useState<ResourceCounts>({
  document: 0,
  image: 0,
  audio: 0,
  video: 0,
  other: 0,
});

const [totalHelppoins, setTotalHelppoins] = useState<number>(0);
const [totalUsers, setTotalUsers]        = useState<number>(0);

const { user } = useAuth();
const token = user?.token;

// ---------- EFFECT ----------
useEffect(() => {
  if (!token) return;      // salimos si no hay token

  const fetchTotals = async () => {
    try {
      const [
        totalResourceCounts,
        totalHelppoinsData,
        totalUsersData,
      ] = await Promise.all([
        getTotalResourceCounts(token),
        getTotalHelppoins(token),
        getTotalUsers(token),
      ]);

      setTotalCounts(totalResourceCounts);
      setTotalHelppoins(totalHelppoinsData);
      setTotalUsers(totalUsersData.total);

      console.log({
        totalResourceCounts,
        totalHelppoinsData,
        totalUsers: totalUsersData.total,
      });
    } catch (err) {
      console.error("Error obteniendo totales:", err);
    }
  };

  fetchTotals();
}, [token]);

  const totalResources = totalCounts.document + totalCounts.image + totalCounts.audio + totalCounts.video + totalCounts.other
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
            <Overview
  totalUsersData={totalUsers}
  totalCenters={totalHelppoins}
  totalResources={totalResources}
/>
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
