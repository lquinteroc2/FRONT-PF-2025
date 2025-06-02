"use client"

import { useState } from "react"

import dynamic from "next/dynamic"
import HelpCenterDetail from "./help-center-detail"
import { HelpCenterData } from "@/lib/types"

// Dynamically import the map component to avoid SSR issues with Leaflet
const MapComponent = dynamic(() => import("./map-component"), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center h-[600px] bg-muted rounded-lg">
      <div className="flex flex-col items-center gap-2">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        <p className="text-sm text-muted-foreground">Cargando mapa...</p>
      </div>
    </div>
  ),
})

interface HelpCentersMapProps {
  centers: HelpCenterData[]
}

export default function HelpCentersMap({ centers }: HelpCentersMapProps) {
  const [selectedCenter, setSelectedCenter] = useState<HelpCenterData | null>(null)

  return (
    <div className="h-[600px] w-full rounded-lg overflow-hidden border">
      <MapComponent centers={centers} onSelectCenter={setSelectedCenter} />
      <HelpCenterDetail center={selectedCenter} isOpen={!!selectedCenter} onClose={() => setSelectedCenter(null)} />
    </div>
  )
}
