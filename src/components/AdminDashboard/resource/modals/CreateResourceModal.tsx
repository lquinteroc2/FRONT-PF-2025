'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import React, { useState } from 'react'
import ResourceForm from '../forms/ResourceForm'
import { ResourceFormData } from "@/lib/types"
import { useToast } from "@/components/ui/use-toast";

type Props = {
  open: boolean
  onClose: () => void
}

const CreateResourceModal = ({ open, onClose }: Props) => {
  const [formData, setFormData] = useState<ResourceFormData>({
    name: '',
    fileType: '',
    fileExtension: '',
    description: '',
    files: null,
    thumbnailFile: null,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleChange = (field: keyof ResourceFormData, value: string | File | null) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { name, fileType, fileExtension, description, files, thumbnailFile } = formData
    const uploadedById = 'admin-id' // Puedes hacer dinámico esto según tu auth

    if (!name || !fileType || !fileExtension || !uploadedById || !files) {
      toast({
        title: "Campos incompletos",
        description: "Por favor completa todos los campos obligatorios.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const form = new FormData()
      form.append("file", files)
      if (thumbnailFile) {
        form.append("thumbnail", thumbnailFile) // ← clave esperada por tu backend
      }
      form.append("name", name)
      form.append("fileType", fileType)
      form.append("fileExtension", fileExtension)
      form.append("description", description)
      form.append("uploadedById", uploadedById)

      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/resources`, {
        method: "POST",
        body: form,
      })

      toast({
        title: "Recurso creado",
        description: "El recurso fue creado exitosamente.",
      })

      onClose()
    } catch (err) {
      console.error("Error al crear el recurso:", err)
      toast({
        title: "Error al crear recurso",
        description: "Ocurrió un error al subir el recurso.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear Recurso</DialogTitle>
        </DialogHeader>
        <ResourceForm data={formData} onChange={handleChange} onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </DialogContent>
    </Dialog>
  )
}

export default CreateResourceModal
