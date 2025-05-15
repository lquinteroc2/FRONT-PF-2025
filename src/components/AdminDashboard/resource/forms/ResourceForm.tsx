"use client"

import React, { ChangeEvent } from "react"
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


const ResourceForm: React.FC<ResourceFormProps> = ({
  data,
  onChange,
  onSubmit,
  isSubmitting = false,
}) => {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    onChange("file", file)
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">Nombre</Label>
        <Input
          id="name"
          value={data.name}
          onChange={(e) => onChange("name", e.target.value)}
          required
          className="col-span-3"
        />
      </div>

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
            <SelectItem value="other">Otro</SelectItem>
          </SelectContent>
        </Select>
      </div>

        <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="fileExtension" className="text-right">
              Extensión
            </Label>
            <Select
            value={data.fileExtension}
            onValueChange={(value) => onChange("fileExtension", value)}
          >
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Selecciona la extensión" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pdf">PDF</SelectItem>
              <SelectItem value="mp3">MP3</SelectItem>
              <SelectItem value="wav">WAV</SelectItem>
              <SelectItem value="jpg">JPG</SelectItem>
              <SelectItem value="png">PNG</SelectItem>
            </SelectContent>
          </Select>
          </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="file" className="text-right">Archivo</Label>
        <Input
          id="file"
          type="file"
          onChange={handleFileChange}
          className="col-span-3"
        />
      </div>

      <div className="grid grid-cols-4 items-start gap-4">
        <Label htmlFor="description" className="text-right pt-2">Descripción</Label>
        <Textarea
          id="description"
          value={data.description}
          onChange={(e) => onChange("description", e.target.value)}
          rows={3}
          className="col-span-3"
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Guardando..." : "Guardar recurso"}
        </Button>
      </div>
    </form>
  )
}

export default ResourceForm
