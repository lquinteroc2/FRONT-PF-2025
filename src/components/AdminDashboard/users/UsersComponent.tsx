"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Upload, X } from "lucide-react"
import { User, UserRole } from "@/lib/types"
import { useAuth } from "@/context/Auth"


interface UserFormProps {
  user?: User | null
  onSubmit: (userData: Partial<User>) => Promise<void>
  onCancel: () => void
  isLoading?: boolean
  mode: "create" | "edit"
}

export default function UserForm({ user: editingUser, onSubmit, onCancel, isLoading = false, mode }: UserFormProps) {
  const [formData, setFormData] = useState<Partial<User>>({
    name: "",
    email: "",
    address: "",
    profileImage: "",
    role: UserRole.FREE,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [imagePreview, setImagePreview] = useState<string>("")
  const { user } = useAuth()

  useEffect(() => {
    if (editingUser && mode === "edit") {
      setFormData({
        ...editingUser,
      })
    setImagePreview(
  typeof editingUser.profileImage === "string"
    ? editingUser.profileImage
    : "" // o una URL temporal si es File, o "" si no tienes nada
);
    }
  }, [editingUser, mode])

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.name?.trim()) {
      newErrors.name = "El nombre es requerido"
    }

    if (!formData.email?.trim()) {
      newErrors.email = "El email es requerido"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "El email no es válido"
    }

    if (!formData.role) {
      newErrors.role = "El rol es requerido"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

   const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};

    if (!formData.name || formData.name.trim() === "") {
      newErrors.name = "El nombre es obligatorio";
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }
    if (!formData.role || formData.role.trim() === "") {
      newErrors.role = "El rol es obligatorio";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return; // Hay errores, no continuar
    }

    // Si está todo ok, llamamos al onSubmit que viene de afuera (tu handleUpdateUser)
    onSubmit(formData);
  };

  const handleInputChange = (field: keyof User, value: string) => {
    // Para role, que es enum, casteamos a UserRole
    const newValue = field === "role" ? (value as UserRole) : value

    setFormData((prev) => ({ ...prev, [field]: newValue }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setImagePreview(result)
        setFormData((prev) => ({ ...prev, profileImage: result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setImagePreview("")
    setFormData((prev) => ({ ...prev, profileImage: "" }))
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Imagen de perfil */}
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <Avatar className="h-24 w-24">
            <AvatarImage src={imagePreview || "/placeholder.svg"} alt="Profile" />
            <AvatarFallback className="text-lg">{formData.name ? getInitials(formData.name) : "U"}</AvatarFallback>
          </Avatar>
          {imagePreview && (
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
              onClick={removeImage}
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>
        <div>
          <Label htmlFor="profileImage" className="cursor-pointer">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground">
              <Upload className="h-4 w-4" />
              <span>Subir imagen</span>
            </div>
          </Label>
          <Input id="profileImage" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Nombre */}
        <div className="space-y-2">
          <Label htmlFor="name">Nombre *</Label>
          <Input
            id="name"
            value={formData.name || ""}
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder="Nombre completo"
            className={errors.name ? "border-red-500" : ""}
          />
          {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email || ""}
            onChange={(e) => handleInputChange("email", e.target.value)}
            placeholder="usuario@ejemplo.com"
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
        </div>

        {/* Rol */}
        <div className="space-y-2">
          <Label htmlFor="role">Rol *</Label>
          <Select value={formData.role || ""} onValueChange={(value) => handleInputChange("role", value)}>
            <SelectTrigger className={errors.role ? "border-red-500" : ""}>
              <SelectValue placeholder="Selecciona un rol" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={UserRole.FREE}>Usuario Gratuito</SelectItem>
              <SelectItem value={UserRole.PREMIUM}>Usuario Premium</SelectItem>
              <SelectItem value={UserRole.ADMIN}>Administrador</SelectItem>
            </SelectContent>
          </Select>
          {errors.role && <p className="text-sm text-red-500">{errors.role}</p>}
        </div>
      </div>

      {/* Dirección */}
      <div className="space-y-2">
        <Label htmlFor="address">Dirección</Label>
        <Textarea
          id="address"
          value={formData.address || ""}
          onChange={(e) => handleInputChange("address", e.target.value)}
          placeholder="Dirección completa (opcional)"
          rows={3}
        />
      </div>

      {/* Botones */}
      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
          Cancelar
        </Button>
<Button type="submit">
  Guardar
</Button>
      </div>
    </form>
  )
}
