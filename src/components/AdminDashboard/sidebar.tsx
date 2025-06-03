"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  // BarChart3,
  // FileAudio,
  // FileText,
  HelpCircle,
  // ImageIcon,
  LayoutDashboard,
  Library,
  // Music,
  // Settings,
  Smile,
  Users,
  // Video,
} from "lucide-react"



export function Sidebar({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const pathname = usePathname()

  return (
    <div className={cn("pb-12 border-r bg-card", className)}>
      <div className="py-4 px-3 flex items-center justify-center border-b">
        <Link href="/" className="flex items-center gap-2">
          <Library className="h-6 w-6" />
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </Link>
      </div>
      <ScrollArea className="h-[calc(100vh-65px)] px-3">
        <div className="py-4">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">General</h2>
          <div className="space-y-1">
            <NavItem href="/profile" icon={<LayoutDashboard className="mr-2 h-4 w-4" />} isActive={pathname === "/"}>
              Volver a <br/>Mi Perfil
            </NavItem>
            <NavItem href="/admin" icon={<LayoutDashboard className="mr-2 h-4 w-4" />} isActive={pathname === "/"}>
              Dashboard
            </NavItem>
            <NavItem href="/admin/users" icon={<Users className="mr-2 h-4 w-4" />} isActive={pathname.startsWith("/users")}>
              Usuarios
            </NavItem>
            {/* <NavItem
              href="/analytics"
              icon={<BarChart3 className="mr-2 h-4 w-4" />}
              isActive={pathname.startsWith("/analytics")}
            >
              Analíticas
            </NavItem>
            <NavItem
              href="/settings"
              icon={<Settings className="mr-2 h-4 w-4" />}
              isActive={pathname.startsWith("/settings")}
            >
              Configuración
            </NavItem> */}
          </div>
        </div>
        <div className="py-4">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Contenido</h2>
          <div className="space-y-1">
            <NavItem
              href="/admin/resources"
              icon={<Library className="mr-2 h-4 w-4" />}
              isActive={pathname.startsWith("/resources")}
            >
              Recursos
            </NavItem>
            {/* <NavItem
              href="/admin/resources/audio"
              icon={<FileAudio className="mr-2 h-4 w-4" />}
              isActive={pathname.startsWith("/resources/audio")}
            >
              Audio
            </NavItem>
            <NavItem
              href="/admin/resources/music"
              icon={<Music className="mr-2 h-4 w-4" />}
              isActive={pathname.startsWith("/resources/music")}
            >
              Música
            </NavItem>
            <NavItem
              href="/admin/resources/videos"
              icon={<Video className="mr-2 h-4 w-4" />}
              isActive={pathname.startsWith("/resources/videos")}
            >
              Videos
            </NavItem>
            <NavItem
              href="/admin/resources/images"
              icon={<ImageIcon className="mr-2 h-4 w-4" />}
              isActive={pathname.startsWith("/resources/images")}
            >
              Imágenes
            </NavItem>
            <NavItem
              href="/admin/resources/documents"
              icon={<FileText className="mr-2 h-4 w-4" />}
              isActive={pathname.startsWith("/resources/documents")}
            >
              Documentos
            </NavItem> */}
          </div>
        </div>
        <div className="py-4">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Otros</h2>
          <div className="space-y-1">
            <NavItem
              href="/admin/help-centers"
              icon={<HelpCircle className="mr-2 h-4 w-4" />}
              isActive={pathname.startsWith("/help-centers")}
            >
              Centros de Ayuda
            </NavItem>
            <NavItem
              href="/admin/emotions"
              icon={<Smile className="mr-2 h-4 w-4" />}
              isActive={pathname.startsWith("/emotions")}
            >
              Emociones
            </NavItem>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}

interface NavItemProps {
  href: string
  icon: React.ReactNode
  children: React.ReactNode
  isActive: boolean
}

function NavItem({ href, icon, children, isActive }: NavItemProps) {
  return (
    <Button asChild variant={isActive ? "secondary" : "ghost"} className="w-full justify-start">
      <Link href={href}>
        {icon}
        {children}
        {isActive && (
          <motion.div
            className="absolute left-0 top-0 h-full w-1 bg-primary rounded-r-md"
            layoutId="sidebar-highlight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </Link>
    </Button>
  )
}
