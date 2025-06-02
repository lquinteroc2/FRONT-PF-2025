"use client"

import { useEffect } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import { HelpCenterData } from "@/lib/types"

interface DetailMapProps {
  center: HelpCenterData
}

export default function DetailMap({ center }: DetailMapProps) {
  // Fix Leaflet marker icon issue
  useEffect(() => {
    delete (L.Icon.Default.prototype as any)._getIconUrl

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    })
  }, [])

  const position: [number, number] = [center.coordinates.coordinates[1], center.coordinates.coordinates[0]]

  return (
    <MapContainer
      center={position}
      zoom={14}
      style={{ height: "100%", width: "100%" }}
      scrollWheelZoom={false}
      zoomControl={false}
      attributionControl={false}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={position}>
        <Popup>
          <div className="text-xs p-1">
            <strong>{center.name}</strong>
            <br />
            {center.address}
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  )
}
