"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileAudio, FileText, Users, Video } from "lucide-react"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { getLast7DaysResourceCounts, getTotalResourceCounts } from "./resources-helper"


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

useEffect(() => {
  const fetchStats = async () => {
    try {
      const [totalData, last7Data] = await Promise.all([
        getTotalResourceCounts(),
        getLast7DaysResourceCounts(),
      ])

      setTotalCounts(totalData)
      setLast7DaysCounts(last7Data)
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
            <CardTitle className="text-sm font-medium">Otros</CardTitle>
            <Video className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCounts.other}</div>
            <p className="text-xs text-muted-foreground">+{last7DaysCounts.other}  en los últimos 7 días</p>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
