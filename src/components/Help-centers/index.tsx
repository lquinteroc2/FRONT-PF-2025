"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, MapPin, List } from "lucide-react"
import { HelpCenterData } from "@/lib/types"
import { fetchHelpCenters } from "./api"
import HelpCentersList from "./components/help-centers-list"
import HelpCentersMap from "./components/help-centers-map"
import { useToast } from "@/components/ui/use-toast"

export default function HelpCenters() {
  const [helpCenters, setHelpCenters] = useState<HelpCenterData[]>([])
  const [filteredCenters, setFilteredCenters] = useState<HelpCenterData[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [activeView, setActiveView] = useState("list")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number; } | null>(null)
  const [radius, setRadius] = useState<{ radius: number } | null>(null)
  const [isUsingLocation, setIsUsingLocation] = useState(false)
  const { toast } = useToast()

  const categories = [
  { value: "salud-mental", label: "Salud Mental" },
  { value: "grupo-apoyo", label: "Grupo de Apoyo" },
  { value: "terapia", label: "Terapia" },
  { value: "bienestar", label: "Bienestar" },
  { value: "meditacion", label: "Meditación" },
  { value: "yoga", label: "Yoga" },
]
useEffect(() => {
  const loadData = async () => {
    setIsLoading(true)

    try {
      const data = await fetchHelpCenters({
        category: selectedCategory || undefined,
        lat: userLocation?.lat,
        lng: userLocation?.lng,
        radius: radius?.radius,
      })
      setHelpCenters(data)
      setFilteredCenters(data)
    } catch (error) {
      console.error("Error loading help centers:", error)
    } finally {
      setIsLoading(false)
    }
  }

  loadData()
}, [selectedCategory, userLocation, radius])

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredCenters(helpCenters)
      return
    }

    const query = searchQuery.toLowerCase()
    const filtered = helpCenters.filter(
      (center) =>
        center.name.toLowerCase().includes(query) ||
        center.description.toLowerCase().includes(query) ||
        center.category.toLowerCase().includes(query) ||
        center.city.toLowerCase().includes(query) ||
        center.country.toLowerCase().includes(query),
    )
    setFilteredCenters(filtered)
  }, [searchQuery, helpCenters])

  return (
    <>
      <div id="emotion-list" className="flex flex-col md:flex-row gap-4 mb-6 mt-12">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre, categoría o ubicación..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            maxLength={100}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={activeView === "list" ? "default" : "outline"}
            size="icon"
            onClick={() => setActiveView("list")}
          >
            <List className="h-4 w-4" />
            <span className="sr-only">Vista de lista</span>
          </Button>
          <Button
            variant={activeView === "map" ? "default" : "outline"}
            size="icon"
            onClick={() => setActiveView("map")}
          >
            <MapPin className="h-4 w-4" />
            <span className="sr-only">Vista de mapa</span>
          </Button>
          <Button
            variant={isUsingLocation ? "default" : "outline"}
            onClick={() => {
              if (isUsingLocation) {
                setUserLocation(null)
                setRadius(null)
                setIsUsingLocation(false)
              } else {
                if (navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition(
                    (pos) => {
                      setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude })
                      setIsUsingLocation(true)
                    },
                    (err) => {
                      console.error("No se pudo obtener la ubicación", err)
                      toast({
                      title: "Error de ubicación",
                      description: "No se pudo obtener tu ubicación. Intenta nuevamente.",
                      variant: "destructive",
                    })
                    }
                  )
                } else {
                  toast({
                  title: "Geolocalización no soportada",
                  description: "Tu navegador no admite geolocalización.",
                  variant: "destructive",
                })
                }
              }
            }}
          >
            {isUsingLocation ? "Desactivar ubicación" : "Usar mi ubicación"}
          </Button>
          {isUsingLocation && (
            <select
              onChange={(e) => setRadius({ radius: Number(e.target.value) })}
              className="border rounded px-4 py-2"
            >
              <option value={1000}>1 km</option>
              <option value={10000}>10 km</option>
              <option value={50000}>50 km</option>
              <option value={100000}>100 km</option>
              <option value={1000000}>1000 km</option>
            </select>
          )}
          <select
          value={selectedCategory || ""}
          onChange={(e) => setSelectedCategory(e.target.value || null)}
          className="border rounded px-4 py-2"
        >
          <option value="">Todas las categorías</option>
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center items-center h-64"
          >
            <div className="flex flex-col items-center gap-2">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
              <p className="text-sm text-muted-foreground">Cargando centros de ayuda...</p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
              <TabsList className="hidden">
                <TabsTrigger value="list">Lista</TabsTrigger>
                <TabsTrigger value="map">Mapa</TabsTrigger>
              </TabsList>
              <TabsContent value="list" className="mt-0">
                <HelpCentersList centers={filteredCenters} />
              </TabsContent>
              <TabsContent value="map" className="mt-0">
                <HelpCentersMap centers={filteredCenters} />
              </TabsContent>
            </Tabs>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
