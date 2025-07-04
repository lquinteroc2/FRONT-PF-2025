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
import { useToast } from "@/components/ui/use-toast"

export default function ResourcesPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingResource, setEditingResource] = useState<Resource | null>(null)
  const [resources, setResources] = useState<Resource[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [fileTypeFilter, setFileTypeFilter] = useState<string>("all")
  const { toast } = useToast()

const getToken = () => {
  const stored = localStorage.getItem("loginUser")
  if (!stored) return null

  try {
    const parsed = JSON.parse(stored)
    return parsed.token // Asegúrate de que la clave sea exactamente esa
  } catch (e) {
    console.error("Error parsing token:", e)
    return null
  }
}

const fetchResources = async () => {
  try {
    const token = getToken()
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/resources`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const data = await response.json()

    if (Array.isArray(data)) {
      setResources(data)
    } else {
      console.error("La respuesta no es un array:", data)
      setResources([])
    }
  } catch (error) {
    console.error("Error fetching resources:", error)
    setResources([])
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
  setTimeout(() => {
    setEditingResource(resource)
    setIsEditModalOpen(true)
  }, 0)
  }

const handleDelete = async (id: string) => {
  const confirmed = confirm("¿Estás seguro de que quieres eliminar este recurso?")
  if (!confirmed) return

  try {
    const token = getToken()
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/resources/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!res.ok) throw new Error("Falló la eliminación")

    setResources((prev) => prev.filter((res) => res.id !== id))

    toast({
      title: "Recurso eliminado",
      description: "El recurso ha sido eliminado exitosamente.",
    })
  } catch (error) {
    console.error("Error al eliminar el recurso:", error)
    toast({
      title: "Error al eliminar",
      description: "Ocurrió un error al intentar eliminar el recurso.",
      variant: "destructive",
    })
  }
}


const toggleShowInSection = async (id: string, show: boolean, section: FileType) => {
  try {
    const token = getToken()
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/resources/${id}/show-in-section/${section}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ show }),
    })

    if (!res.ok) throw new Error("Falló la actualización")

    fetchResources()

    toast({
      title: `Actualizado en sección`,
      description: show
        ? `Recurso ahora visible en la sección ${section}`
        : `Recurso oculto de la sección ${section}`,
    })
  } catch (error) {
    console.error("Error actualizando visibilidad en sección:", error)
    toast({
      title: "Error al actualizar",
      description: "No se pudo actualizar la visibilidad del recurso.",
      variant: "destructive",
    })
  }
}



const toggleShowInCardList = async (id: string, show: boolean) => {
  try {
    const token = getToken()
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/resources/${id}/show-in-cardlist`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ show }),
    })

    if (!res.ok) throw new Error("Falló la actualización")

    fetchResources()

    toast({
      title: "Inicio actualizado",
      description: show ? "Recurso ahora visible en el inicio" : "Recurso ocultado del inicio",
    })
  } catch (error) {
    console.error("Error actualizando visibilidad en CardList:", error)
    toast({
      title: "Error al actualizar",
      description: "No se pudo actualizar la visibilidad del recurso en el inicio.",
      variant: "destructive",
    })
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
            maxLength={100}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={fileTypeFilter} onValueChange={setFileTypeFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los tipos</SelectItem>
            <SelectItem value="document">Documentos</SelectItem>
            <SelectItem value="image">Imágenes</SelectItem>
            <SelectItem value="audio">Audio</SelectItem>
            <SelectItem value="video">Video</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Más vistos</TableHead>
              <TableHead>Sección Destacada</TableHead>
              <TableHead>Vista previa</TableHead>
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
                  <TableCell>
                  <Button
                    size="sm"
                    variant={resource.showInCardList ? "default" : "outline"}
                    onClick={() => toggleShowInCardList(resource.id, !resource.showInCardList)}
                  >
                    {resource.showInCardList ? "Ocultar del inicio" : "Mostrar en inicio"}
                  </Button>
                </TableCell>
                <TableCell className="text-left">
                  {(() => {
                    const section = resource.fileType;
                    const isCurrentSection = resource.showInSection;

                    return (
                      <Button
                        size="sm"
                        variant={isCurrentSection ? "secondary" : "outline"}
                        onClick={() =>
                          toggleShowInSection(resource.id, !isCurrentSection, section)
                        }
                        // className={isCurrentSection ? "font-semibold text-primary" : ""}
                      >
                        {isCurrentSection ? `Ocultar de ${section}` : `Mostrar en ${section}`}
                      </Button>
                    );
                  })()}
                </TableCell>
                  <TableCell>
                  <div className="relative group w-12 h-12">
                    <img
                      src={resource.thumbnailUrl}
                      alt={resource.name}
                      className="w-full h-full object-cover rounded-md cursor-pointer"
                    />
                    <div
                      className="fixed -translate-y-1/2 hidden group-hover:flex w-32 h-32 z-50 border bg-white p-1 rounded-md shadow-lg"
                    >
                      <img
                        src={resource.thumbnailUrl}
                        alt={`preview-${resource.name}`}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                  </div>
                </TableCell>
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

      {editingResource && (
        <EditResourceModal
          open={isEditModalOpen}
          resource={editingResource}
          onClose={handleModalClose}
        />
      )}
    </motion.div>
  )
}
