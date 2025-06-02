"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileAudio, FileText, Users, Video } from "lucide-react"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { getLast7DaysHelppoins, getLast7DaysResourceCounts, getLast7DaysUsers, getTotalHelppoins, getTotalResourceCounts, getTotalUsers } from "./resources-helper"
import { useAuth } from "@/context/Auth"



type ResourceCounts = {
  document: number
  image: number
  audio: number
  video: number
  other: number
}

export function DashboardStats() {

const [totalCounts, setTotalCounts] = useState<ResourceCounts>({
  document: 0,
  image: 0,
  audio: 0,
  video: 0,
  other: 0,
})

const [last7DaysCounts, setLast7DaysCounts] = useState<ResourceCounts>({
  document: 0,
  image: 0,
  audio: 0,
  video: 0,
  other: 0,
})

   const [totalHelppoins, setTotalHelppoins] = useState<number>(0)
   const [last7DaysHelppoins, setLast7DaysHelppoins] = useState<number>(0)
   const [totalUsersData, setTotalUsersData] = useState<number>(0)
   const [last7DaysUsersData, setLast7DaysUsersData] = useState<number>(0)
   const { user } = useAuth()
   const token = user?.token
  useEffect(() => {
    const fetchStats = async () => {
      try {

        if (!token) {
  throw new Error("Token no disponible");
}
 
        const [
          totalData,
          last7Data,
          totalHelppoinsData,
          last7DaysHelppoinsData,
          totalUsersData,
          last7DaysUsersData,
        ] = await Promise.all([
          getTotalResourceCounts(token),
          getLast7DaysResourceCounts(token),
          getTotalHelppoins(token),
          getLast7DaysHelppoins(token),
          getTotalUsers(token),
          getLast7DaysUsers(token),
        ])

        setTotalCounts(totalData)
        setLast7DaysCounts(last7Data)
        setTotalHelppoins(totalHelppoinsData)
        setLast7DaysHelppoins(last7DaysHelppoinsData)
        setTotalUsersData(totalUsersData.total)
        setLast7DaysUsersData(last7DaysUsersData.last7Days)

             console.log({
        totalHelppoinsData,
        last7DaysHelppoinsData,
        totalUsersData,
        last7DaysUsersData,
      })
      } catch (error) {
        console.error("Error fetching resource stats:", error)
      }
    }

    fetchStats()
  }, [])






  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={item}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuarios</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsersData}</div>
            <p className="text-xs text-muted-foreground">+{last7DaysUsersData}  en los últimos 7 días</p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item}>
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">Documentos</CardTitle>
      <FileText className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{totalCounts.document}</div>
      <p className="text-xs text-muted-foreground">
        +{last7DaysCounts.document} en los últimos 7 días
      </p>
    </CardContent>
  </Card>
</motion.div>

      <motion.div variants={item}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Archivos de Audio</CardTitle>
            <FileAudio className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCounts.audio}</div>
            <p className="text-xs text-muted-foreground">+{last7DaysCounts.audio}  en los últimos 7 días</p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Videos</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCounts.video}</div>
            <p className="text-xs text-muted-foreground">+{last7DaysCounts.video}  en los últimos 7 días</p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Centros de Apoyo</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
             <div className="text-2xl font-bold">{totalHelppoins}</div>
            <p className="text-xs text-muted-foreground">+{last7DaysHelppoins}  en los últimos 7 días</p>
          </CardContent>
        </Card>
      </motion.div>


    </motion.div>
  )
}
