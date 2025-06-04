"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Power } from "lucide-react"
import { User, UserRole } from "@/lib/types"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"

type Props = {
  user: User
  onEdit: () => void
  onToggleStatus: (userId: string, newStatus: "Activo" | "Inactivo") => void
  onChangeRole: (userId: string, newRole: UserRole) => void
}

export default function UserActions({ user, onEdit, onToggleStatus, onChangeRole }: Props) {
  const [selectedRole, setSelectedRole] = useState<UserRole>(user.role as UserRole)

  useEffect(() => {
    setSelectedRole(user.role as UserRole)
  }, [user.role])

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = e.target.value as UserRole
    setSelectedRole(newRole)
    if (newRole !== user.role) {
      onChangeRole(user.id, newRole)
    }
  }

  return (
    <div className="flex items-center space-x-2">
      {/* Select para cambiar rol siempre visible */}
      <select
        value={selectedRole}
        onChange={handleRoleChange}
        className="border rounded-md p-1 text-sm"
        aria-label="Seleccionar rol de usuario"
      >
        <option value={UserRole.FREE}>Free</option>
        <option value={UserRole.PREMIUM}>Premium 💎</option>
        <option value={UserRole.ADMIN}>Admin 🛡️</option>
      </select>

      {/* Botón activar/desactivar siempre visible */}
      <Button
        variant={user.status === "Activo" ? "destructive" : "default"}
        size="sm"
        onClick={() =>
          onToggleStatus(user.id, user.status === "Activo" ? "Inactivo" : "Activo")
        }
        className="flex items-center"
        aria-label={user.status === "Activo" ? "Desactivar usuario" : "Activar usuario"}
      >
        <Power className="mr-1 h-4 w-4" />
        {user.status === "Activo" ? "Desactivar" : "Activar"}
      </Button>

      {/* Dropdown solo con otras acciones, ej. editar */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" aria-label="Abrir menú">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Acciones</DropdownMenuLabel>

          {/* Solo editar u otras acciones */}
          <DropdownMenuItem onClick={onEdit}>Editar</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
