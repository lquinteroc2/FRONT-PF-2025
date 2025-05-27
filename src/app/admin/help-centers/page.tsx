"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, FilePlus, MoreHorizontal } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useRouter } from "next/navigation"


interface Coordinates {
  type: "Point"
  coordinates: [number, number]
}

interface HelpCenterData {
  id: string
  name: string
  description: string
  contact: string
  category: string
  address: string
  city: string
  country: string
  coordinates: Coordinates | null
  createdAt: string
}

export default function HelpCenterPage() {
  const [helpPoints, setHelpPoints] = useState<HelpCenterData[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()

  const fetchHelpPoints = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/helppoints`)
      const data = await response.json()
      if (Array.isArray(data)) {
        setHelpPoints(data)
      } else {
        console.error("Respuesta inesperada:", data)
        setHelpPoints([])
      }
    } catch (error) {
      console.error("Error al cargar los puntos de ayuda:", error)
      setHelpPoints([])
    }
  }

  useEffect(() => {
    fetchHelpPoints()
  }, [])

  const filteredHelpPoints = helpPoints.filter((point) => {
    const term = searchTerm.toLowerCase()
    return (
      point.name.toLowerCase().includes(term) ||
      (point.description && point.description.toLowerCase().includes(term)) ||
      (point.city && point.city.toLowerCase().includes(term)) ||
      (point.category && point.category.toLowerCase().includes(term))
    )
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return "Fecha inválida"

    return new Intl.DateTimeFormat("es-ES", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date)
  }

  const handleEdit = (point: HelpCenterData) => {
  router.push(`/admin/help-centers/edit?edit=${point.id}`)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de que quieres eliminar este punto de ayuda?")) return
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/helppoints/${id}`, { method: "DELETE" })
      setHelpPoints((prev) => prev.filter((p) => p.id !== id))
    } catch (error) {
      console.error("Error al eliminar el punto de ayuda:", error)
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
        <h1 className="text-3xl font-bold tracking-tight">Puntos de Ayuda</h1>
        {/* <Button onClick={() => setIsCreateModalOpen(true)}> */}
        <Button onClick={() => router.push("/admin/help-centers/create")}>
          <FilePlus className="mr-2 h-4 w-4" />
          Crear punto
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar puntos..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Ciudad</TableHead>
              <TableHead>País</TableHead>
              <TableHead>Dirección</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead className="w-[50px]" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredHelpPoints.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No se encontraron puntos de ayuda.
                </TableCell>
              </TableRow>
            ) : (
              filteredHelpPoints.map((point) => (
                <TableRow key={point.id}>
                  <TableCell className="font-medium">{point.name}</TableCell>
                  <TableCell className="max-w-xs truncate text-sm">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="cursor-default truncate inline-block max-w-[200px]">
                            {point.description || "Sin descripción"}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{point.description}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                  <TableCell>{point.category}</TableCell>
                  <TableCell>{point.city}</TableCell>
                  <TableCell>{point.country}</TableCell>
                  <TableCell>{point.address}</TableCell>
                  <TableCell>{formatDate(point.createdAt)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(point)}>Editar</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleDelete(point.id)} className="text-destructive">
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* {isCreateModalOpen && (
        <CreateHelpCenterModal open={isCreateModalOpen} onClose={handleModalClose} />
      )}

      {isEditModalOpen && editingHelpPoint && (
        <EditHelpCenterModal open={isEditModalOpen} resource={editingHelpPoint} onClose={handleModalClose} />
      )} */}
    </motion.div>
  )
}
