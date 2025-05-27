'use client'

import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import L from 'leaflet'

const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  className: 'custom-marker-icon'
})

interface MapSelectorProps {
  onSelect: (lat: number, lng: number) => void
  selectedPosition?: [number, number] | null
}

export default function MapSelector({ onSelect, selectedPosition }: MapSelectorProps) {
  const [position, setPosition] = useState<[number, number] | null>(null)
  
  // Initialize with selected position if available
  useEffect(() => {
    if (selectedPosition) {
      setPosition([selectedPosition[1], selectedPosition[0]])
    }
  }, [selectedPosition])

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng
        setPosition([lat, lng])
        onSelect(lat, lng)
      },
    })
    return null
  }

  return (
    <div className="h-[400px] relative rounded-lg overflow-hidden">
      {/* Overlay with instructions that fades out when map is clicked */}
      {!position && (
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-10 pointer-events-none text-white text-center p-4">
          <div>
            <div className="bg-teal-600 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <MapPin className="h-6 w-6" />
            </div>
            <p className="text-lg font-medium">Haz clic en el mapa para seleccionar la ubicación</p>
          </div>
        </div>
      )}
      
      <MapContainer 
        center={position || [4.6097, -74.0818]} 
        zoom={13} 
        className="h-full w-full z-0"
        style={{ borderRadius: '0.5rem' }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapClickHandler />
        {position && <Marker position={position} icon={customIcon} />}
      </MapContainer>
    </div>
  )
}

// Add the MapPin component for the overlay
function MapPin({ className = "" }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
      <circle cx="12" cy="10" r="3"></circle>
    </svg>
  )
}
