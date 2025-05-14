
    "use client"

import { useState } from "react"
import Link from "next/link"
import { Brain, Menu } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const navLinks = [
    { name: "Acerca de Nosotros", href: "/abautMe" },
    { name: "Recomendaciones", href: "/recomendaciones",hidden:true },
    { name: "Mis Emociones", href: "/emociones",hidden:true },
    { name: "Centros de Apoyo", href: "/centros",hidden:true },
    { name: "Registro", href: "/registro" },
    { name: "Inicio de sección", href: "/login" },
  ]

  return (
    <nav className="border-b bg-white">
      <div className="relative container flex h-16 items-center  px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className=" text-xl font-bold text-primary"><Brain className="absolute ml-5 -mt-3 w-5"/>Séntia</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:flex-1 md:justify-end">
          <ul className="flex gap-6">
            {
            navLinks.filter(link=>!link.hidden).map((link) => (
              
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-gray-700 transition-colors hover:text-primary"
                >
                  {link.name}
                </Link>
              </li>
            ))
            
            }
          </ul>
        </div>

        {/* User Menu */}
        <div className="flex md:hidden items-center gap-4">
          <DropdownMenu >
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
                  <AvatarFallback className="bg-teal-100 text-teal-800">US</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem asChild>
                <Link href="/perfil" className="cursor-pointer">
                  Perfil
                </Link>
              </DropdownMenuItem >
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer text-red-600">Cerrar sesión</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu Button */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[240px] sm:w-[300px]">
              <div className="flex flex-col gap-6 py-6">
                <Link href="/" className="flex items-center gap-2 px-2" onClick={() => setOpen(false)}>
                  <span className="text-xl font-bold text-primary">Séntia</span>
                </Link>
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="px-2 py-1 text-sm font-medium text-gray-700 transition-colors hover:text-primary"
                      onClick={() => setOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}



