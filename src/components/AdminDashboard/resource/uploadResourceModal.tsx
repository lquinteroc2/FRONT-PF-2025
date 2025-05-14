"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

type UploadResourceModalProps = {
  open: boolean
  onClose: () => void
}

type FileType = "document" | "image" | "audio" | "video" | "other"
type FileExtension =
  | "jpg"
  | "jpeg"
  | "png"
  | "webp"
  | "pdf"
  | "docx"
  | "mp4"
  | "mov"
  | "mp3"
  | "wav"

const UploadResourceModal = ({ open, onClose }: UploadResourceModalProps) => {
  const [name, setName] = useState("")
  const [fileType, setFileType] = useState<FileType | "">("")
  const [fileExtension, setFileExtension] = useState<FileExtension | "">("")
  const [description, setDescription] = useState("")
  const [uploadedById, setUploadedById] = useState("c4b3d720-1234-4567-abcd-1234567890ab") // Cambia esto por el user real
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!file || !name || !fileType || !fileExtension || !uploadedById) {
      alert("Por favor completa todos los campos obligatorios.")
      return
    }

    setLoading(true)

    const formData = new FormData()
    formData.append("file", file)
    formData.append("name", name)
    formData.append("fileType", fileType)
    formData.append("fileExtension", fileExtension)
    formData.append("description", description)
    formData.append("uploadedById", uploadedById)

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/resources`, {
        method: "POST",
        body: formData,
      })

      if (!res.ok) {
        const errText = await res.text()
        throw new Error(errText)
      }

      const createdResource = await res.json()
      console.log("Recurso creado:", createdResource)

      // Reset form
      setName("")
      setFileType("")
      setFileExtension("")
      setDescription("")
      setFile(null)

      onClose()
    } catch (err) {
      console.error("Error al crear el recurso:", err)
      alert("Ocurrió un error al subir el recurso.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
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
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="fileType" className="text-right">
              Tipo
            </Label>
            <Select value={fileType} onValueChange={(value) => setFileType(value as FileType)}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Selecciona el tipo" />
              </SelectTrigger>
              <SelectContent>
            <SelectItem value="document">Documento</SelectItem>
            <SelectItem value="audio">Audio</SelectItem>
            <SelectItem value="video">Video</SelectItem>
            <SelectItem value="image">Imagen</SelectItem>
            <SelectItem value="other">Otro</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="fileExtension" className="text-right">
              Extensión
            </Label>
            <Select value={fileExtension} onValueChange={(value) => setFileExtension(value as FileExtension)}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Selecciona la extensión" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="mp3">MP3</SelectItem>
                <SelectItem value="wav">WAV</SelectItem>
                <SelectItem value="txt">TXT</SelectItem>
                <SelectItem value="md">Markdown</SelectItem>
                <SelectItem value="jpg">JPG</SelectItem>
                <SelectItem value="png">PNG</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="file" className="text-right">
              Archivo
            </Label>
            <Input
              id="file"
              type="file"
              className="col-span-3"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="description" className="text-right pt-2">
              Descripción
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Subiendo..." : "Guardar recurso"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default UploadResourceModal
