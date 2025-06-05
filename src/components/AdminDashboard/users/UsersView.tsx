"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search } from "lucide-react"
import { User, UserRole } from "@/lib/types"
import UserFormEdit from "./User-form"
import UserActions from "@/components/AdminDashboard/users/User-actions"
import { useAuth } from "@/context/Auth"
import { usersHelper, updateUserHelper, userStatusHelper, UserRequestParams } from "@/components/AdminDashboard/users/Users-helper"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

export default function UsersPageView() {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState<UserRole | "all">("all")
  const [statusFilter, setStatusFilter] = useState<"all" | "Activo" | "Inactivo">("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<Partial<User> | null>(null)
  const { user } = useAuth()
  const [totalPages, setTotalPages] = useState<number>(1)
  const [currentPage, setCurrentPage] = useState(1)
  const usersPerPage = 999
  const { toast } = useToast()
  const router = useRouter()

  if (!user?.token) {
    console.error("Token no definido")
    return null
  }

  const handleEditUser = (u: Partial<User>) => {
    setEditingUser(u)
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setEditingUser(null)
  }

  const mapStatusToAPI = (filter: string): "Activo" | "Inactivo" | "all" => {
    if (filter === "Activo") return "Activo"
    if (filter === "Inactivo") return "Inactivo"
    return "all"
  }

  useEffect(() => {
    const fetchUsers = async () => {
      if (!user?.token) return

      const params: UserRequestParams = {
        page: currentPage,
        limit: usersPerPage,
        search: searchTerm || undefined,
        role: roleFilter !== "all" ? roleFilter : undefined,
        status: mapStatusToAPI(statusFilter),
      }

      try {
        const response = await usersHelper(user.token, params)
        setUsers(response.data)
        setTotalPages(response.totalPages || 1)
      } catch (error) {
        console.error("Error al obtener usuarios:", error)
      }
    }

    fetchUsers()
  }, [user, currentPage, searchTerm, roleFilter, statusFilter])

  const filteredUsers = users.filter(user => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRole = roleFilter === "all" || user.role === roleFilter

    const mappedStatusFilter = mapStatusToAPI(statusFilter)
    const matchesStatus = mappedStatusFilter === "all" || user.status === mappedStatusFilter

    return matchesSearch && matchesRole && matchesStatus
  })

  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, roleFilter, statusFilter])

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
  }

  const isUserRole = (value: string): value is UserRole => {
    return ["admin", "premium", "free"].includes(value)
  }

  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN:
        return "Admin"
      case UserRole.PREMIUM:
        return "Premium"
      case UserRole.FREE:
        return "Free"
      default:
        return role
    }
  }
  

  const handleSubmitUser = async (userData: Partial<User>): Promise<void> => {
    if (!userData.id || !user?.token) {
      toast({
        title: "Error",
        description: "No se puede actualizar el usuario. Datos incompletos.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const updateData: Partial<User> = {}

      if (userData.name?.trim()) updateData.name = userData.name.trim()
      if (userData.email?.trim()) updateData.email = userData.email.trim()
      if (userData.address?.trim()) updateData.address = userData.address.trim()
      if (
        userData.profileImage &&
        (typeof userData.profileImage === "string"
          ? userData.profileImage.trim() !== ""
          : true)
      ) {
        updateData.profileImage = userData.profileImage
      }
      if (userData.role?.trim()) updateData.role = userData.role.trim() as UserRole
      if (userData.status?.trim()) updateData.status = userData.status.trim() as "Activo" | "Inactivo"

      const updatedUser = await updateUserHelper(userData.id, user.token, updateData)

      setUsers(prev =>
        prev.map(u => (u.id === userData.id ? { ...u, ...updatedUser, updatedAt: new Date().toISOString() } : u))
      )

      toast({
        title: "Éxito",
        description: "Usuario actualizado con éxito",
      })

      // Cerrar diálogo sin recargar la página
      setIsDialogOpen(false)
      setEditingUser(null)

    } catch (error) {
      console.error("Error al actualizar usuario:", error)
      toast({
        title: "Error",
        description: "Error al actualizar el usuario",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

   const handleChangeRole = (userId: string, newRole: UserRole) => {
  handleSubmitUser({ id: userId, role: newRole })
}
   
  const handleToggleUserStatus = async (userId: string, newStatus: "Activo" | "Inactivo") => {
    try {
      if (!user?.token) {
        toast({
          title: "Error",
          description: "Token no encontrado. Inicia sesión nuevamente.",
          variant: "destructive",
        })
        return
      }

      await userStatusHelper(userId, newStatus, user.token)

      setUsers(prev =>
        prev.map(user => (user.id === userId ? { ...user, status: newStatus, updatedAt: new Date().toISOString() } : user))
      )
      toast({
        title: `Usuario ${newStatus === "Activo" ? "activado" : "desactivado"}`,
        description: `Usuario ${newStatus === "Activo" ? "activado" : "desactivado"} correctamente`,
      })

      setIsDialogOpen(false)
      setEditingUser(null)
    } catch (error) {
      toast({
        title: "Error",
        description: "Error al cambiar el estado del usuario",
        variant: "destructive",
      })
      console.error(error)
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Usuarios</h1>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex items-center space-x-2 flex-1 max-w-sm">
          <Search className="h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Buscar usuario por nombre o email"
            value={searchTerm}
            maxLength={100}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        <Select value={roleFilter} onValueChange={value => setRoleFilter(value as UserRole | "all")}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por rol" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="premium">Premium</SelectItem>
            <SelectItem value="free">Free</SelectItem>
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={value => setStatusFilter(value as "all" | "Activo" | "Inactivo")}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="Activo">Activo</SelectItem>
            <SelectItem value="Inactivo">Inactivo</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableHeader>
  <TableRow>
    <TableHead>Usuario</TableHead>
    <TableHead>Email</TableHead>
    <TableHead>Rol</TableHead>
    <TableHead>Estado</TableHead>
    <TableHead className="text-center">Acciones</TableHead>{/* Una sola columna */}
  </TableRow>
</TableHeader>

<TableBody>
  {filteredUsers.map(u => (
    <TableRow key={u.id}>
      <TableCell>
        <div className="flex items-center space-x-2">
          <Avatar>
            {u.profileImage ? (
              <AvatarImage src={u.profileImage} alt={`Avatar de ${u.name}`} />
            ) : (
              <AvatarFallback>{getInitials(u.name)}</AvatarFallback>
            )}
          </Avatar>
          <div className="font-medium">{u.name}</div>
        </div>
      </TableCell>

      <TableCell>{u.email}</TableCell>

      <TableCell>{getRoleLabel(u.role as UserRole)}</TableCell>

      <TableCell>{u.status}</TableCell>

      {/* Columna Acciones con select y botón lado a lado */}
      <TableCell>
        <div className="flex items-center gap-3 justify-center">
          {/* Select para cambiar rol */}
          <Select
            value="select"
            onValueChange={(newRole) => {
              if (isUserRole(newRole)) {
                handleChangeRole(u.id, newRole);
              }
            }}
          >
            <SelectTrigger className="w-[120px] text-center">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="select" disabled>
                Cambiar rol
              </SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="premium">Premium</SelectItem>
              <SelectItem value="free">Free</SelectItem>
            </SelectContent>
          </Select>

          {/* Botón activar / desactivar */}
          {u.status === "Activo" ? (
            <Button
              variant="google"
              size="sm"
              onClick={() => handleToggleUserStatus(u.id, "Inactivo")}
              className="whitespace-nowrap"
            >
              Desactivar
            </Button>
          ) : (
            <Button
              variant="default"
              size="sm"
              onClick={() => handleToggleUserStatus(u.id, "Activo")}
              className="whitespace-nowrap"
            >
              Activar
            </Button>
          )}
        </div>
      </TableCell>
    </TableRow>
  ))}
</TableBody>

      </Table>
    </motion.div>
  )
}
