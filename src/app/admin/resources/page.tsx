"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileAudio, FilePlus, FileText, ImageIcon, MoreHorizontal, Search, Video } from "lucide-react"
import { FileType, Resource } from "@/lib/types"
import CreateResourceModal from "@/components/AdminDashboard/resource/modals/CreateResourceModal"
import EditResourceModal from "@/components/AdminDashboard/resource/modals/EditResourceModal"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function ResourcesPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingResource, setEditingResource] = useState<Resource | null>(null)
  const [resources, setResources] = useState<Resource[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [fileTypeFilter, setFileTypeFilter] = useState<string>("all")

const fetchResources = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/resources`)
    const data = await response.json()

    // Validar que data sea un array
    if (Array.isArray(data)) {
      setResources(data)
    } else {
      console.error("La respuesta no es un array:", data)
      setResources([]) // fallback seguro
    }
  } catch (error) {
    console.error("Error fetching resources:", error)
    setResources([]) // fallback en caso de error
  }
}

  useEffect(() => {
    fetchResources()
  }, [])

  useEffect(() => {
    if (!isCreateModalOpen && !editingResource) fetchResources()
  }, [isCreateModalOpen, editingResource])

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (resource.description && resource.description.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesFileType = fileTypeFilter === "all" || resource.fileType === fileTypeFilter

    return matchesSearch && matchesFileType
  })

  const getFileIcon = (fileType: FileType) => {
    switch (fileType) {
      case "audio": return <FileAudio className="h-4 w-4" />
      case "document": return <FileText className="h-4 w-4" />
      case "video": return <Video className="h-4 w-4" />
      case "image": return <ImageIcon className="h-4 w-4" />
      default: return <FileText className="h-4 w-4" />
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("es-ES", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date)
  }

  const handleModalClose = () => {
    setIsCreateModalOpen(false)
    setEditingResource(null)
    setIsEditModalOpen(false)
  }

  const handleEdit = (resource: Resource) => {
  setEditingResource(resource)
  setIsEditModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de que quieres eliminar este recurso?")) return
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/resources/${id}`, { method: 'DELETE' })
      setResources((prev) => prev.filter((res) => res.id !== id))
    } catch (error) {
      console.error("Error al eliminar el recurso:", error)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Recursos</h1>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <FilePlus className="mr-2 h-4 w-4" />
          Subir recurso
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar recursos..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={fileTypeFilter} onValueChange={setFileTypeFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los tipos</SelectItem>
            <SelectItem value="DOCUMENT">Documentos</SelectItem>
            <SelectItem value="IMAGE">Imágenes</SelectItem>
            <SelectItem value="AUDIO">Audio</SelectItem>
            <SelectItem value="VIDEO">Video</SelectItem>
            <SelectItem value="OTHER">Otros</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Extensión</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead className="w-[50px]" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredResources.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No se encontraron recursos.
                </TableCell>
              </TableRow>
            ) : (
              filteredResources.map((resource) => (
                <TableRow key={resource.id}>
                  <TableCell className="font-medium">{resource.name}</TableCell>
                  <TableCell className="max-w-xs truncate text-sm">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="cursor-default truncate inline-block max-w-[200px]">
                            {resource.description || "Sin descripción"}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{resource.description}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>    
                  <TableCell>
                    <div className="flex items-center">
                      {getFileIcon(resource.fileType)}
                      <span className="ml-2">{resource.fileType}</span>
                    </div>
                  </TableCell>
                  <TableCell>{resource.fileExtension}</TableCell>
                  <TableCell>{formatDate(resource.createdAt)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Abrir menú</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(resource)}>Editar</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleDelete(resource.id)} className="text-destructive">Eliminar</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {isCreateModalOpen && (
        <CreateResourceModal open={isCreateModalOpen} onClose={handleModalClose} />
      )}

      {isEditModalOpen && editingResource && (
        <EditResourceModal resource={editingResource} onClose={handleModalClose} />
      )}
    </motion.div>
  )
}
