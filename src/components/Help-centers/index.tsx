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
import { AnimatedArrow } from "../Emotion/EmotionalLogView"

export default function HelpCentersView() {
  const [helpCenters, setHelpCenters] = useState<HelpCenterData[]>([])
  const [filteredCenters, setFilteredCenters] = useState<HelpCenterData[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [activeView, setActiveView] = useState("list")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number; } | null>(null)
  const [radius, setRadius] = useState<{ radius: number } | null>(null)
  const [isUsingLocation, setIsUsingLocation] = useState(false)

  const categories = [
  { value: "mental-health", label: "Salud Mental" },
  { value: "support-group", label: "Grupo de Apoyo" },
  { value: "therapy", label: "Terapia" },
  { value: "wellness", label: "Bienestar" },
  { value: "meditation", label: "Meditación" },
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
      <motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 1, ease: "easeOut" }}
  viewport={{ once: true }}
  className="w-full max-w-6xl mx-auto text-center my-56 px-4"
>
  <motion.h1
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
    className="text-5xl md:text-6xl font-extrabold text-primary mb-4 leading-tight drop-shadow-[0_0_15px_rgba(109,40,217,0.4)]"
  >
    🆘 Centros de Ayuda
  </motion.h1>

  <motion.p
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
    className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto"
  >
    Encuentra centros de asistencia emocional cerca de tu ubicación.
    <br />
    Porque pedir ayuda también es un acto de valentía 💙
  </motion.p>
  <AnimatedArrow/>
</motion.div>


      <div id="emotion-list" className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre, categoría o ubicación..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
                      alert("No se pudo obtener la ubicación")
                    }
                  )
                } else {
                  alert("Tu navegador no soporta geolocalización")
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
              <option value={3000}>3 km</option>
              <option value={5000}>5 km</option>
              <option value={10000}>10 km</option>
              <option value={20000}>20 km</option>
              <option value={30000}>30 km</option>
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
