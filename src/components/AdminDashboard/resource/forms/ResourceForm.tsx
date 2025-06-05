"use client"

import React, { ChangeEvent, useEffect, useState } from "react"
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
import { Button } from "@/components/ui/button"
import { ResourceFormProps } from "@/lib/types"
import {
  fileTypeExtensions,
  getFileExtensionFromName,
  isValidExtensionForType,
  isMatchingExtension,
} from "@/lib/resourcesValidation"
import { useToast } from "@/components/ui/use-toast";

const ResourceForm: React.FC<ResourceFormProps> = ({
  data,
  onChange,
  onSubmit,
  isSubmitting = false,
}) => {
  const [validExtensions, setValidExtensions] = useState<string[]>([])
  const { toast } = useToast();

  useEffect(() => {
    if (data.fileType) {
      const valid = fileTypeExtensions[data.fileType] || []
      setValidExtensions(valid)

      if (!valid.includes(data.fileExtension)) {
        onChange("fileExtension", "")
      }
    }
  }, [data.fileType])

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const extension = getFileExtensionFromName(file.name)

if (!isValidExtensionForType(data.fileType, extension)) {
      toast({
        title: "Archivo inválido",
        description: `El archivo no es válido para el tipo ${data.fileType}. Extensiones permitidas: ${validExtensions.join(", ")}`,
        variant: "destructive",
      })
      return
    }

    if (data.fileExtension && !isMatchingExtension(file.name, data.fileExtension)) {
      toast({
        title: "Extensión no coincide",
        description: `La extensión del archivo no coincide con la seleccionada: ${data.fileExtension}`,
        variant: "destructive",
      })
      return
    }

    onChange("files", file)
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Campo nombre */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">Nombre</Label>
        <Input
          id="name"
          value={data.name}
          onChange={(e) => onChange("name", e.target.value)}
          required
          maxLength={20}
          className="col-span-3"
        />
      </div>

      {/* Campo tipo */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="fileType" className="text-right">Tipo</Label>
        <Select
          value={data.fileType}
          onValueChange={(value) => onChange("fileType", value)}
        >
          <SelectTrigger className="col-span-3">
            <SelectValue placeholder="Selecciona el tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="audio">Audio</SelectItem>
            <SelectItem value="video">Video</SelectItem>
            <SelectItem value="document">Documento</SelectItem>
            <SelectItem value="image">Imagen</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Campo extensión dependiente */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="fileExtension" className="text-right">Extensión</Label>
        <Select
          value={data.fileExtension}
          onValueChange={(value) => onChange("fileExtension", value)}
        >
          <SelectTrigger className="col-span-3">
            <SelectValue placeholder="Selecciona la extensión" />
          </SelectTrigger>
          <SelectContent>
            {validExtensions.map((ext) => (
              <SelectItem key={ext} value={ext}>
                {ext.toUpperCase()}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Archivo */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="file" className="text-right">Archivo</Label>
        <Input
          id="file"
          type="file"
          onChange={handleFileChange}
          className="col-span-3"
        />
      </div>

      {/* Imagen portada */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="thumbnailFile" className="text-left">Imagen portada</Label>
        <Input
          id="thumbnailFile"
          type="file"
          accept="image/*"
          onChange={(e) => {
            const files = e.target.files?.[0] || null
            onChange("thumbnailFile", files)
          }}
          className="col-span-3"
        />
      </div>

      {/* Descripción */}
      <div className="grid grid-cols-4 items-start gap-4">
        <Label htmlFor="description" className="text-right pt-2">Descripción</Label>
        <Textarea
          id="description"
          value={data.description}
          onChange={(e) => onChange("description", e.target.value)}
          rows={3}
          maxLength={200}
          className="col-span-3"
        />
      </div>

      {/* Botón */}
      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Guardando..." : "Guardar recurso"}
        </Button>
      </div>
    </form>
  )
}

export default ResourceForm
