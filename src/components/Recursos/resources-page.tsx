"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search, Filter, Grid, List, Download, Play, Heart, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import { AnimatedArrow } from "../Emotion/EmotionalLogView"

// Tipos de datos
// Actualizar la interfaz Resource para coincidir con tu API
interface Resource {
  id: string
  name: string
  description: string
  fileType: "image" | "audio" | "video" | "document"
  fileExtension: string
  cloudinaryUrl: string
  publicId: string
  resourceType: "image" | "video"
  thumbnailUrl: string
  thumbnailPublicId: string
  showInCardList: boolean
  showInSection: boolean
  createdAt: string
  updatedAt: string
  uploadedBy: string | null
}

interface FilterState {
  search: string
  fileType: "all" | "image" | "audio" | "video" | "document"
  showInCardList: "all" | "true" | "false"
  sortBy: "newest" | "oldest" | "name"
}

// Componente principal
export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([])
  const [filteredResources, setFilteredResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  // Actualizar el estado inicial de filtros
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    fileType: "all",
    showInCardList: "all",
    sortBy: "newest",
  })

  // Categorías disponibles
  const categories = [
    "Meditación",
    "Relajación",
    "Mindfulness",
    "Ejercicios",
    "Terapia",
    "Música",
    "Libros",
    "Herramientas",
  ]

  // Cargar recursos del backend
  // Reemplazar la función fetchResources
  useEffect(() => {
    const fetchResources = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/resources`)

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        setResources(data || [])
        setFilteredResources(data || [])
      } catch (error) {
        console.error("Error fetching resources:", error)
        // Mostrar mensaje de error al usuario
        setResources([])
        setFilteredResources([])
      } finally {
        setLoading(false)
      }
    }

    fetchResources()
  }, [])

  // Aplicar filtros
  // Actualizar la lógica de filtros
  useEffect(() => {
    let filtered = [...resources]

    // Filtro por búsqueda
    if (filters.search) {
      filtered = filtered.filter(
        (resource) =>
          resource.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          resource.description.toLowerCase().includes(filters.search.toLowerCase()),
      )
    }

    // Filtro por tipo de archivo
    if (filters.fileType !== "all") {
      filtered = filtered.filter((resource) => resource.fileType === filters.fileType)
    }

    // Filtro por showInCardList
    if (filters.showInCardList !== "all") {
      const showValue = filters.showInCardList === "true"
      filtered = filtered.filter((resource) => resource.showInCardList === showValue)
    }

    // Ordenamiento
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case "newest":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case "oldest":
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        case "name":
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })

    setFilteredResources(filtered)
  }, [resources, filters])

  // Actualizar las categorías disponibles basadas en fileType
  const fileTypes = ["image", "audio", "video", "document"]

  // Función para obtener el icono según el tipo de archivo
  const getFileTypeIcon = (fileType: string) => {
    switch (fileType) {
      case "audio":
        return <Play className="h-4 w-4 text-white" />
      case "video":
        return <Play className="h-4 w-4 text-white" />
      case "document":
        return <Download className="h-4 w-4 text-white" />
      case "image":
        return <Download className="h-4 w-4 text-white" />
      default:
        return <Download className="h-4 w-4 text-white" />
    }
  }

  // Función para obtener el texto del botón según el tipo
  const getActionText = (fileType: string) => {
    switch (fileType) {
      case "audio":
      case "video":
        return "Reproducir"
      case "document":
        return "Descargar"
      case "image":
        return "Ver"
      default:
        return "Ver"
    }
  }

  // Componente de tarjeta de recurso
  // Actualizar el componente ResourceCard
  const ResourceCard = ({ resource }: { resource: Resource }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card className="group h-full overflow-hidden transition-all hover:shadow-lg">
        <CardHeader className="p-0">
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={resource.thumbnailUrl || "/placeholder.svg?height=200&width=300"}
              alt={resource.name}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
            {resource.showInCardList && <Badge className="absolute left-2 top-2 bg-teal-600">Destacado</Badge>}
            <div className="absolute right-2 top-2 flex gap-1">
              <div className="rounded-full bg-black/50 p-1">{getFileTypeIcon(resource.fileType)}</div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-4">
          <div className="mb-2 flex items-center justify-between">
            <Badge variant="secondary" className="capitalize">
              {resource.fileType}
            </Badge>
            <Badge variant="outline" className="text-xs">
              .{resource.fileExtension}
            </Badge>
          </div>

          <CardTitle className="mb-2 line-clamp-2 text-lg">{resource.name}</CardTitle>
          <p className="mb-3 line-clamp-3 text-sm text-gray-600">{resource.description}</p>

          <div className="mb-3 flex flex-wrap gap-1">
            {resource.showInSection && (
              <Badge variant="outline" className="text-xs">
                En sección
              </Badge>
            )}
            {resource.showInCardList && (
              <Badge variant="outline" className="text-xs">
                En lista
              </Badge>
            )}
          </div>

          <p className="text-xs text-gray-500">Creado: {new Date(resource.createdAt).toLocaleDateString()}</p>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <div className="flex w-full items-center justify-between">
            <span className="text-sm font-medium text-green-600">Gratis</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Heart className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                className="bg-teal-600 hover:bg-teal-700"
                onClick={() => window.open(resource.cloudinaryUrl, "_blank")}
              >
                {getActionText(resource.fileType)}
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )

  // Componente de vista de lista
  // Actualizar el componente ResourceListItem
  const ResourceListItem = ({ resource }: { resource: Resource }) => (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
      <Card className="mb-4 overflow-hidden transition-all hover:shadow-md">
        <div className="flex">
          <div className="relative h-24 w-32 flex-shrink-0">
            <Image
              src={resource.thumbnailUrl || "/placeholder.svg?height=96&width=128"}
              alt={resource.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-1 flex-col justify-between p-4">
            <div>
              <div className="mb-1 flex items-center gap-2">
                <Badge variant="secondary" className="capitalize">
                  {resource.fileType}
                </Badge>
                {resource.showInCardList && <Badge className="bg-teal-600">Destacado</Badge>}
              </div>
              <h3 className="mb-1 font-semibold">{resource.name}</h3>
              <p className="line-clamp-2 text-sm text-gray-600">{resource.description}</p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex gap-1">
                <Badge variant="outline" className="text-xs">
                  .{resource.fileExtension}
                </Badge>
                {resource.showInSection && (
                  <Badge variant="outline" className="text-xs">
                    En sección
                  </Badge>
                )}
              </div>
              <span className="text-sm font-medium text-green-600">Gratis</span>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )

  return (
    <div className="min-h-screen  font-[family-name:var(--font-geist-sans)">
      {/* Header */}
      <motion.section
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 1, ease: "easeOut" }}
  viewport={{ once: true }}
  className=" py-16 text-primary-dark mt-12 mb-20 md:py-24"
>
  <div className="container mx-auto px-4">
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
      className="mx-auto max-w-4xl text-center"
    >
      <div className="mb-6 flex justify-center">
        <div className="rounded-full bg-neutro-ice p-4 shadow-lg">
          <Shield className="h-12 w-12 text-neutro-dark" />
        </div>
      </div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
        className="text-5xl md:text-6xl font-extrabold text-primary mb-4 leading-tight drop-shadow-[0_0_15px_rgba(109,40,217,0.4)]"
      >
        Recursos de Bienestar
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
        className="mx-auto max-w-2xl text-lg opacity-90 font-medium"
      >
        Descubre herramientas, contenido y productos diseñados para apoyar tu viaje hacia el bienestar emocional
      </motion.p>
    </motion.div>

  </div>
  <AnimatedArrow />
</motion.section>


      {/* Filtros */}
      <section className="border-b bg-white py-6">
        <div id="emotion-list" className="container mx-auto px-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Búsqueda */}
            <div className="relative flex-1 lg:max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Buscar recursos..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="pl-10"
              />
            </div>

            {/* Filtros */}
            <div className="flex flex-wrap gap-4">
              {/* Actualizar la sección de filtros en el JSX */}
              <Select
                value={filters.fileType}
                onValueChange={(value: any) => setFilters({ ...filters, fileType: value })}
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Tipo de archivo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  {fileTypes.map((type) => (
                    <SelectItem key={type} value={type} className="capitalize">
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={filters.showInCardList}
                onValueChange={(value: any) => setFilters({ ...filters, showInCardList: value })}
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Visibilidad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="true">Destacados</SelectItem>
                  <SelectItem value="false">No destacados</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filters.sortBy} onValueChange={(value: any) => setFilters({ ...filters, sortBy: value })}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Más recientes</SelectItem>
                  <SelectItem value="oldest">Más antiguos</SelectItem>
                  <SelectItem value="name">Nombre A-Z</SelectItem>
                </SelectContent>
              </Select>

              {/* Botones de vista */}
              <div className="flex rounded-md border">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contenido principal */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Actualizar las pestañas para usar fileType */}
          <Tabs value={filters.fileType} onValueChange={(value: any) => setFilters({ ...filters, fileType: value })}>
            <TabsList className="mb-8 grid w-full grid-cols-5 lg:w-auto">
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="image">Imágenes</TabsTrigger>
              <TabsTrigger value="audio">Audio</TabsTrigger>
              <TabsTrigger value="video">Videos</TabsTrigger>
              <TabsTrigger value="document">Documentos</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-0">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-gray-600">{filteredResources.length} recursos encontrados</p>
              </div>

              {loading ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="aspect-video rounded-lg bg-gray-200"></div>
                      <div className="mt-4 space-y-2">
                        <div className="h-4 rounded bg-gray-200"></div>
                        <div className="h-4 w-3/4 rounded bg-gray-200"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : viewMode === "grid" ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filteredResources.map((resource) => (
                    <ResourceCard key={resource.id} resource={resource} />
                  ))}
                </div>
              ) : (
                <div>
                  {filteredResources.map((resource) => (
                    <ResourceListItem key={resource.id} resource={resource} />
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Actualizar el contenido de las pestañas */}
            <TabsContent value="image">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredResources
                  .filter((r) => r.fileType === "image")
                  .map((resource) => (
                    <ResourceCard key={resource.id} resource={resource} />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="audio">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredResources
                  .filter((r) => r.fileType === "audio")
                  .map((resource) => (
                    <ResourceCard key={resource.id} resource={resource} />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="video">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredResources
                  .filter((r) => r.fileType === "video")
                  .map((resource) => (
                    <ResourceCard key={resource.id} resource={resource} />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="document">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredResources
                  .filter((r) => r.fileType === "document")
                  .map((resource) => (
                    <ResourceCard key={resource.id} resource={resource} />
                  ))}
              </div>
            </TabsContent>
          </Tabs>

          {!loading && filteredResources.length === 0 && (
            <div className="py-12 text-center">
              <div className="mx-auto mb-4 h-24 w-24 rounded-full bg-gray-100 p-6">
                <Filter className="h-full w-full text-gray-400" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">No se encontraron recursos</h3>
              <p className="text-gray-600">Intenta ajustar los filtros para encontrar lo que buscas</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
