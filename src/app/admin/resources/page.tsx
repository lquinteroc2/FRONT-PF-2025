"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FileAudio, FilePlus, FileText, ImageIcon, MoreHorizontal, Search, Video } from "lucide-react"

// Tipos basados en las entidades proporcionadas
type FileType = "DOCUMENT" | "IMAGE" | "AUDIO" | "VIDEO" | "OTHER"
type FileExtension = "JPG" | "JPEG" | "PNG" | "WEBP" | "PDF" | "DOCX" | "MP4" | "MOV" | "MP3" | "WAV"

interface Resource {
  id: string
  name: string
  fileType: FileType
  fileExtension: FileExtension
  cloudinaryUrl: string
  description: string | null
  uploadedBy: {
    id: string
    name: string
  }
  createdAt: string
  updatedAt: string
}

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([
    {
      id: "1",
      name: "Meditación guiada para principiantes",
      fileType: "AUDIO",
      fileExtension: "MP3",
      cloudinaryUrl: "https://res.cloudinary.com/demo/video/upload/v1612345678/sample.mp3",
      description: "Una meditación guiada para personas que están comenzando a meditar",
      uploadedBy: {
        id: "user1",
        name: "Carlos Mendez",
      },
      createdAt: "2023-05-12T10:00:00Z",
      updatedAt: "2023-05-12T10:00:00Z",
    },
    {
      id: "2",
      name: "Guía de ejercicios de respiración",
      fileType: "DOCUMENT",
      fileExtension: "PDF",
      cloudinaryUrl: "https://res.cloudinary.com/demo/image/upload/v1612345678/sample.pdf",
      description: "Documento con ejercicios de respiración para reducir el estrés",
      uploadedBy: {
        id: "user2",
        name: "Ana López",
      },
      createdAt: "2023-05-11T14:30:00Z",
      updatedAt: "2023-05-11T14:30:00Z",
    },
    {
      id: "3",
      name: "Tutorial de técnicas de relajación",
      fileType: "VIDEO",
      fileExtension: "MP4",
      cloudinaryUrl: "https://res.cloudinary.com/demo/video/upload/v1612345678/sample.mp4",
      description: "Video tutorial con técnicas de relajación para momentos de ansiedad",
      uploadedBy: {
        id: "user3",
        name: "Miguel Torres",
      },
      createdAt: "2023-05-10T09:15:00Z",
      updatedAt: "2023-05-10T09:15:00Z",
    },
    {
      id: "4",
      name: "Música relajante para dormir",
      fileType: "AUDIO",
      fileExtension: "MP3",
      cloudinaryUrl: "https://res.cloudinary.com/demo/video/upload/v1612345678/sample2.mp3",
      description: "Compilación de música relajante para ayudar a conciliar el sueño",
      uploadedBy: {
        id: "user4",
        name: "Laura Sánchez",
      },
      createdAt: "2023-05-09T16:45:00Z",
      updatedAt: "2023-05-09T16:45:00Z",
    },
    {
      id: "5",
      name: "Infografía sobre tipos de emociones",
      fileType: "IMAGE",
      fileExtension: "PNG",
      cloudinaryUrl: "https://res.cloudinary.com/demo/image/upload/v1612345678/sample.png",
      description: "Infografía educativa sobre los diferentes tipos de emociones y cómo identificarlas",
      uploadedBy: {
        id: "user5",
        name: "David Ruiz",
      },
      createdAt: "2023-05-08T11:20:00Z",
      updatedAt: "2023-05-08T11:20:00Z",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [fileTypeFilter, setFileTypeFilter] = useState<string>("all")

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (resource.description && resource.description.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesFileType = fileTypeFilter === "all" || resource.fileType === fileTypeFilter

    return matchesSearch && matchesFileType
  })

  const getFileIcon = (fileType: FileType) => {
    switch (fileType) {
      case "AUDIO":
        return <FileAudio className="h-4 w-4" />
      case "DOCUMENT":
        return <FileText className="h-4 w-4" />
      case "VIDEO":
        return <Video className="h-4 w-4" />
      case "IMAGE":
        return <ImageIcon className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Recursos</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <FilePlus className="mr-2 h-4 w-4" />
              Nuevo Recurso
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Crear nuevo recurso</DialogTitle>
              <DialogDescription>Completa los detalles del recurso que deseas añadir al sistema.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nombre
                </Label>
                <Input id="name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="fileType" className="text-right">
                  Tipo de archivo
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecciona un tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DOCUMENT">Documento</SelectItem>
                    <SelectItem value="IMAGE">Imagen</SelectItem>
                    <SelectItem value="AUDIO">Audio</SelectItem>
                    <SelectItem value="VIDEO">Video</SelectItem>
                    <SelectItem value="OTHER">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="fileExtension" className="text-right">
                  Extensión
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecciona una extensión" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="JPG">JPG</SelectItem>
                    <SelectItem value="JPEG">JPEG</SelectItem>
                    <SelectItem value="PNG">PNG</SelectItem>
                    <SelectItem value="WEBP">WEBP</SelectItem>
                    <SelectItem value="PDF">PDF</SelectItem>
                    <SelectItem value="DOCX">DOCX</SelectItem>
                    <SelectItem value="MP4">MP4</SelectItem>
                    <SelectItem value="MOV">MOV</SelectItem>
                    <SelectItem value="MP3">MP3</SelectItem>
                    <SelectItem value="WAV">WAV</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="file" className="text-right">
                  Archivo
                </Label>
                <Input id="file" type="file" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="description" className="text-right pt-2">
                  Descripción
                </Label>
                <Textarea id="description" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Guardar recurso</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
              <TableHead>Tipo</TableHead>
              <TableHead>Extensión</TableHead>
              <TableHead>Subido por</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead className="w-[50px]"></TableHead>
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
                  <TableCell>
                    <div className="flex items-center">
                      {getFileIcon(resource.fileType)}
                      <span className="ml-2">{resource.fileType}</span>
                    </div>
                  </TableCell>
                  <TableCell>{resource.fileExtension}</TableCell>
                  <TableCell>{resource.uploadedBy.name}</TableCell>
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
                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                        <DropdownMenuItem>Ver detalles</DropdownMenuItem>
                        <DropdownMenuItem>Editar</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">Eliminar</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  )
}
