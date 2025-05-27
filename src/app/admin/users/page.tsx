"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, UserPlus } from "lucide-react"
import { toast } from "sonner"
import { User, UserRole } from "@/lib/types"
import UserForm from "@/components/AdminDashboard/users/UsersComponent"
import UserActions from "@/components/AdminDashboard/users/User-actions"



export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "Carlos Mendez",
      email: "carlos@example.com",
      role: UserRole.ADMIN,
      status: "active",
      profileImage: "/placeholder.svg?height=40&width=40",
      createdAt: new Date("2023-01-15T10:00:00Z").toISOString(),
      address: "Calle Principal 123, Ciudad",
    },
    {
      id: "2",
      name: "Ana López",
      email: "ana@example.com",
      role: UserRole.PREMIUM,
      status: "active",
      profileImage: "/placeholder.svg?height=40&width=40",
      createdAt: new Date("2023-01-15T10:00:00Z").toISOString(),
      address: "Calle Principal 123, Ciudad",
    },
    {
      id: "3",
      name: "Miguel Torres",
      email: "miguel@example.com",
      role: UserRole.FREE,
      status: "inactive",
      profileImage: "/placeholder.svg?height=40&width=40",
      createdAt: new Date("2023-01-15T10:00:00Z").toISOString(),
      address: "Calle Principal 123, Ciudad",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState<UserRole | "all">("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRole = roleFilter === "all" || user.role === roleFilter
    const matchesStatus = statusFilter === "all" || user.status === statusFilter

    return matchesSearch && matchesRole && matchesStatus
  })

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("es-ES", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date)
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const isUserRole = (value: string): value is UserRole => {
  return ["admin", "premium", "free"].includes(value)
 }

  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN:
        return "Administrador"
      case UserRole.PREMIUM:
        return "Premium"
      case UserRole.FREE:
        return "Gratuito"
      default:
        return role
    }
  }

  const handleCreateUser = () => {
    setEditingUser(null)
    setIsDialogOpen(true)
  }

  const handleEditUser = (user: User) => {
    setEditingUser(user)
    setIsDialogOpen(true)
  }

  const handleSubmitUser = async (userData: Partial<User>) => {
    setIsLoading(true)

    try {
      // Simular llamada a API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (editingUser) {
        // Actualizar usuario existente
        setUsers((prev) =>
          prev.map((user) => (user.id === editingUser.id ? { ...user, ...userData, updatedAt: new Date() } : user)),
        )
        toast.success("Usuario actualizado correctamente")
      } else {
        // Crear nuevo usuario
        const newUser: User = {
          ...(userData as User),
          status: "active",
          createdAt: new Date().toISOString(),
        }
        setUsers((prev) => [...prev, newUser])
        toast.success("Usuario creado correctamente")
      }

      setIsDialogOpen(false)
    } catch (error) {
      toast.error("Error al guardar el usuario")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteUser = async (userId: string) => {
    try {
      // Simular llamada a API
      await new Promise((resolve) => setTimeout(resolve, 500))

      setUsers((prev) => prev.filter((user) => user.id !== userId))
      toast.success("Usuario eliminado correctamente")
    } catch (error) {
      toast.error("Error al eliminar el usuario")
    }
  }

  const handleToggleUserStatus = async (userId: string, newStatus: "active" | "inactive") => {
    try {
      // Simular llamada a API
      await new Promise((resolve) => setTimeout(resolve, 500))

      setUsers((prev) =>
        prev.map((user) => (user.id === userId ? { ...user, status: newStatus, updatedAt: new Date() } : user)),
      )
      toast.success(`Usuario ${newStatus === "active" ? "activado" : "desactivado"} correctamente`)
    } catch (error) {
      toast.error("Error al cambiar el estado del usuario")
    }
  }

  const handleViewProfile = (userId: string) => {
    // Implementar navegación al perfil del usuario
    toast.info(`Ver perfil del usuario ${userId}`)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setEditingUser(null)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Usuarios</h1>
        <Button onClick={handleCreateUser}>
          <UserPlus className="mr-2 h-4 w-4" />
          Nuevo Usuario
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar usuarios..."
            className="pl-8 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select
            value={roleFilter}
            onValueChange={(value) => {
              if (value === "all") {
                setRoleFilter("all")
              } else if (isUserRole(value)) {
                setRoleFilter(value)
              }
            }}
          >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filtrar por rol" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los roles</SelectItem>
            <SelectItem value={UserRole.ADMIN}>Administrador</SelectItem>
            <SelectItem value={UserRole.PREMIUM}>Premium</SelectItem>
            <SelectItem value={UserRole.FREE}>Gratuito</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value)}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filtrar por estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los estados</SelectItem>
            <SelectItem value="active">Activo</SelectItem>
            <SelectItem value="inactive">Inactivo</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Usuario</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No se encontraron usuarios.
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={user.profileImage || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getRoleLabel(user.role as UserRole)}</TableCell>
                  <TableCell>
                    <div
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        user.status === "active" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                      }`}
                    >
                      {user.status === "active" ? "Activo" : "Inactivo"}
                    </div>
                  </TableCell>
                  <TableCell>
                    <UserActions
                      user={user}
                      onEdit={handleEditUser}
                      onDelete={handleDeleteUser}
                      onToggleStatus={handleToggleUserStatus}
                      onViewProfile={handleViewProfile}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Diálogo para crear/editar usuario */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingUser ? "Editar Usuario" : "Crear Nuevo Usuario"}</DialogTitle>
            <DialogDescription>
              {editingUser
                ? "Modifica los detalles del usuario seleccionado."
                : "Completa los detalles del usuario que deseas añadir al sistema."}
            </DialogDescription>
          </DialogHeader>
          <UserForm
            user={editingUser}
            onSubmit={handleSubmitUser}
            onCancel={handleCloseDialog}
            isLoading={isLoading}
            mode={editingUser ? "edit" : "create"}
          />
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
