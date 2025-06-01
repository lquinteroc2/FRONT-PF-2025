"use client"

import { useEffect } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import L from "leaflet"
import { HelpCenterData } from "@/lib/types"

interface MapComponentProps {
  centers: HelpCenterData[]
  onSelectCenter?: (center: HelpCenterData) => void
}

// Component to fit bounds when centers change
function BoundsUpdater({ centers }: { centers: HelpCenterData[] }) {
  const map = useMap()

  useEffect(() => {
    if (centers.length === 0) return

    const bounds = L.latLngBounds(
      centers.map((center) => [center.coordinates.coordinates[1], center.coordinates.coordinates[0]]),
    )

    map.fitBounds(bounds, { padding: [50, 50] })
  }, [centers, map])

  return null
}

export default function MapComponent({ centers, onSelectCenter }: MapComponentProps) {
  // Default center (can be adjusted based on user location or centers average)
  const defaultCenter: [number, number] = [0, 0]

  // Calculate center from centers if available
  const mapCenter =
    centers.length > 0
      ? ([
          centers.reduce((sum, center) => sum + center.coordinates.coordinates[1], 0) / centers.length,
          centers.reduce((sum, center) => sum + center.coordinates.coordinates[0], 0) / centers.length,
        ] as [number, number])
      : defaultCenter

  // Fix Leaflet marker icon issue
  useEffect(() => {
    // This is needed to fix the marker icon issue with webpack
    delete (L.Icon.Default.prototype as any)._getIconUrl

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    })
  }, [])

  return (
    <MapContainer center={mapCenter} zoom={3} style={{ height: "100%", width: "100%" }} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {centers.map((center) => (
        <Marker key={center.id} position={[center.coordinates.coordinates[1], center.coordinates.coordinates[0]]}>
          <Popup>
            <div className="p-1">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-medium text-sm">{center.name}</h3>
                <Badge className="text-xs">{center.category}</Badge>
              </div>
              <p className="text-xs text-muted-foreground mb-2">{center.address}</p>
              {onSelectCenter && (
                <Button size="sm" className="w-full text-xs" onClick={() => onSelectCenter(center)}>
                  Ver detalles
                </Button>
              )}
            </div>
          </Popup>
        </Marker>
      ))}

      <BoundsUpdater centers={centers} />
    </MapContainer>
  )
}
