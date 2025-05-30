"use client"

import { useEffect, useState } from "react"
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
import { useAuth } from "@/context/Auth"
import { updateUserHelper, UserRequestParams, usersHelper, userStatusHelper } from "@/components/AdminDashboard/users/Users-helper"
import { adminEditUserHelper, AdminUpdateUserData, profileEditHelper, UpdateUserData } from "@/components/ProfileUser/profileEditHelper"
import Cookies from "js-cookie"


export default function UsersPageView() {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState<UserRole | "all">("all")
  const [statusFilter, setStatusFilter] = useState<"all" | "Activo" | "Inactivo">("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const { user } = useAuth()
  const [totalPages, setTotalPages] = useState<number>(1)
  const [currentPage, setCurrentPage] = useState(1)
  const usersPerPage = 999

const mapStatusToAPI = (filter: string ): "Activo" | "Inactivo" | "all" => {
  switch (filter) {
    case "Activo":
      return "Activo";
    case "Inactivo":
      return "Inactivo";
    default:
      return "all";
  }
}

useEffect(() => {
  const fetchUsers = async () => {
    if (!user?.token) return;

    
const params: UserRequestParams = {
  page: currentPage,
  limit: usersPerPage,
  search: searchTerm || undefined,
  role: roleFilter !== "all" ? roleFilter : undefined,
  status: mapStatusToAPI(statusFilter),
};
    try {
      console.log("📦 Pidiendo usuarios. Página:", currentPage, "Params:", params);

      const response = await usersHelper(user.token, params);

      console.log("✅ Respuesta recibida:", response);
      console.log("🧍 Usuarios recibidos:", response.data.length);

      setUsers(response.data);
      console.log(setUsers)
      setTotalPages(response.totalPages || 1);

    } catch (error) {
      console.error("❌ Error al obtener usuarios:", error);
    }
  };

  fetchUsers();
}, [user, currentPage, searchTerm, roleFilter, statusFilter]);



useEffect(() => {

  console.log("🔁 Página actual:", currentPage);
  console.log("📄 Usuarios paginados (estado actualizado):", users);
}, [users, currentPage]);
  
const filteredUsers = users.filter((user) => {
  const matchesSearch =
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase());

  const matchesRole =
    roleFilter === "all" || user.role === roleFilter;

  const mappeStatusFilter = mapStatusToAPI(statusFilter)

  const matchesStatus =
    mappeStatusFilter  === "all" || user.status === mappeStatusFilter;

  return matchesSearch && matchesRole && matchesStatus;
});

useEffect(() => {
  setCurrentPage(1)
}, [searchTerm, roleFilter, statusFilter])

useEffect(() => {
  console.log("Página actual:", currentPage)
  console.log("Usuarios paginados:", filteredUsers)
}, [currentPage, filteredUsers])
  
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
        return "Free"
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

  if (!userData.id || !user?.token) {
    console.error("Datos incompletos para actualizar el usuario");
    toast.error("No se puede actualizar el usuario. Datos incompletos.");
    return;
  }

  setIsLoading(true);

  try {
    const updateData: Partial<User> = {};

    if (userData.name && userData.name.trim() !== "") updateData.name = userData.name;
    if (userData.email && userData.email.trim() !== "") updateData.email = userData.email;
    if (userData.address && userData.address.trim() !== "") updateData.address = userData.address;
    if (userData.profileImage && userData.profileImage.trim() !== "") updateData.profileImage = userData.profileImage;
    if (userData.role && userData.role.trim() !== "") updateData.role = userData.role;
    if (userData.status && userData.status.trim() !== "") updateData.status = userData.status;

    const updatedUser = await updateUserHelper(
      userData.id,
      user.token,
      updateData
    );

    setUsers((prev) =>
      prev.map((u) => (u.id === userData.id ? { ...u, ...updatedUser, updatedAt: new Date().toISOString() } : u))
    );

    alert("Cambios realizados con éxito");
    setTimeout(() => {
    window.location.reload();
   }, 500); 
    setIsDialogOpen(false);
    
  } catch (error: any) {
    console.error("Error al actualizar usuario:", error);
    toast.error("Error al actualizar el usuario");
  } finally {
    setIsLoading(false);
  }
};




  const handleDeleteUser = async (userId: string) => {
      setIsLoading(true)
    try {

      await new Promise((resolve) => setTimeout(resolve, 500))

      setUsers((prev) => prev.filter((user) => user.id !== userId))
      toast.success("Usuario eliminado correctamente")
    } catch (error) {
      toast.error("Error al eliminar el usuario")
    }
  }


const handleToggleUserStatus = async (userId: string, newStatus: "Activo" | "Inactivo") => {
  
  try {
    const cookieValue = Cookies.get("loginUser")
    const parsed = cookieValue ? JSON.parse(cookieValue) : null
    const token = parsed?.token || ""

    if (!token) {
      toast.error("Token no encontrado. Inicia sesión nuevamente.")
      return
    }

    console.log("Datos enviados a userStatusHelper:", {
  id: userId,
  token: token,
  data: newStatus,
});
    await userStatusHelper(userId, newStatus, token)

    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, status: newStatus, updatedAt: new Date() } : user
      )
    )
    toast.success(`Usuario ${newStatus === "Activo" ? "activado" : "desactivado"} correctamente`)
       setTimeout(() => {
    window.location.reload();
   }, 500); 
    setIsDialogOpen(false);

  } catch (error) {
    toast.error("Error al cambiar el estado del usuario")
    console.error(error)
  }
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
            placeholder="Buscar por nombre o email..."
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

        <Select
          value={statusFilter}
          onValueChange={(value) => setStatusFilter(value as "all" | "Activo" | "Inactivo")}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filtrar por estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los estados</SelectItem>
            <SelectItem value="Activo">Activo</SelectItem>
            <SelectItem value="Inactivo">Inactivo</SelectItem>
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
              <TableHead className="w-[50px]">Acciones</TableHead>
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
    user.status === "Activo" ? "bg-primary text-neutro-dark" : "bg-neutro-dark text-neutro-ice"
  }`}
>
  {user.status === "Activo" ? "Activo" : "Inactivo"}
</div>

                  </TableCell>
                  <TableCell>
                    <UserActions
                      user={user}
                      onEdit={handleEditUser}
                      onToggleStatus={handleToggleUserStatus}
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


