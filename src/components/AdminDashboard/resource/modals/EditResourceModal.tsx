'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useEffect, useState } from 'react'
import ResourceForm from '../forms/ResourceForm'
import { Props, ResourceFormData } from "@/lib/types"


const EditResourceModal = ({ resource, onClose }: Props) => {
  const [formData, setFormData] = useState<ResourceFormData>({
    name: '',
    fileType: '',
    fileExtension: '',
    description: '',
    files: null,
    thumbnailFile: null,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (resource) {
      setFormData({
        name: resource.name,
        fileType: resource.fileType,
        fileExtension: resource.fileExtension,
        description: resource.description || "",
        files: null,
      })
    }
  }, [resource])

  const handleChange = (field: keyof ResourceFormData, value: string | File | null) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { name, fileType, fileExtension, description, files, thumbnailFile } = formData
    const uploadedById = 'admin-id' // o quien edita

    if (!name || !fileType || !fileExtension || !uploadedById) {
      alert("Por favor completa todos los campos obligatorios.")
      return
    }

    setIsSubmitting(true)

    try {
      if (files) {
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

        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/resources/${resource.id}`, {
          method: "PATCH",
          body: form,
        })
      } else {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/resources/${resource.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            fileType,
            fileExtension,
            description,
            uploadedById,
          }),
        })
      }

      onClose()
    } catch (err) {
      console.error("Error al editar el recurso:", err)
      alert("Ocurrió un error.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Recurso</DialogTitle>
        </DialogHeader>
        <ResourceForm data={formData} onChange={handleChange} onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </DialogContent>
    </Dialog>
  )
}

export default EditResourceModal
