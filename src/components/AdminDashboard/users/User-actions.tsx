"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Eye, Edit, Power, Trash2 } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  role: string
  status: "Activo" | "Inactivo"
}

interface UserActionsProps {
  user: User
  onEdit: (user: User) => void
  onToggleStatus: (userId: string, newStatus: "Activo" | "Inactivo") => void
   token?: string
}

export default function UserActions({ user, onEdit, onToggleStatus  }: UserActionsProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showStatusDialog, setShowStatusDialog] = useState(false)


  const handleToggleStatus = () => {
    const newStatus = user.status === "Activo" ? "Inactivo" : "Activo"
    onToggleStatus(user.id, newStatus)
    setShowStatusDialog(false)
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Abrir menú</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onEdit(user)}>
            <Edit className="mr-2 h-4 w-4" />
            Editar usuario
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setShowStatusDialog(true)}>
            <Power className="mr-2 h-4 w-4" />
            {user.status === "Activo" ? "Desactivar" : "Activar"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Diálogo de confirmación para cambiar estado */}
      <AlertDialog open={showStatusDialog} onOpenChange={setShowStatusDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cambiar estado del usuario</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Estás seguro de que quieres {user.status === "Activo" ? "desactivar" : "activar"} al usuario{" "}
              <strong>{user.name}</strong>?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleToggleStatus}>
              {user.status === "Activo" ? "Desactivar" : "Activar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
