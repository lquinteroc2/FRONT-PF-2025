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
import { useAuth } from "@/context/Auth"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
import { usePathname } from "next/navigation";


export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { user, setUser } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const navLinks = [
    { name: "Contactanos", href: "/contact-us", showWhen: "always" },
    { name: "Acerca de Nosotros", href: "/abautMe", showWhen: "always" },
    { name: "Recomendaciones", href: "/recomendaciones", hidden: false, showWhen: "auth" },
    { name: "Mis Emociones", href: "/emotions", hidden: false, showWhen: "auth" },
    { name: "Centros de Apoyo", href: "/centrosApoyo", hidden: false, showWhen: "auth" },
    { name: "Registro", href: "/register", hidden: false, showWhen: "noAuth" },
    { name: "Iniciar Sesión", href: "/login", hidden: false, showWhen: "noAuth" },
  ]
  const filteredLinks = navLinks.filter((link) => {
    if (link.href === pathname) return false;
    if (link.showWhen === "noAuth") return !user;
    if (link.showWhen === "auth") return !!user;
    if (link.showWhen === "always") return true;
    return false;
  });
  const handleLogout = () => {
    setUser(null);

    localStorage.removeItem("loginUser");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    Cookies.remove("loginUser");

    router.push("/home");
  };

  return (
    <nav className="overflow-hidden min-w-[100vw] border-b bg-neutro fixed top-0 w-full z-50 shadow-sm">
      <div className="relative overflow-hidden container flex justify-between h-16 items-center px-4 md:flex md:justify-between md:px-8">
        {/* Logo */}
        <Link href="/home" className="flex items-center gap-2">
          <Brain className="w-6 h-6 text-primary" />
          <span className="text-xl font-bold text-primary">Séntia</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:flex-1 md:justify-center">
          <ul className="flex gap-8">
            {
              filteredLinks.filter(link => !link.hidden).map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-neutro-dark transition-colors hover:text-primary-dark hover:font-semibold"
                  >
                    {link.name}
                  </Link>
                </li>
              ))
            }
          </ul>
        </div>

        {/* User Menu and Mobile Menu Button */}
        <div className="flex items-center gap-4">
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 rounded-full flex items-center gap-2 cursor-pointer pr-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.user.profileImage} alt="Avatar" />
                    <AvatarFallback className="bg-primary-light text-primary-dark font-medium">
                      {user.user.name ? user.user.name.charAt(0).toUpperCase() : 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden md:block text-sm font-medium text-neutro-dark">
                    {user.user.name || "Usuario"}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/admin" className="cursor-pointer">
                    Admin
                  </Link>
                </DropdownMenuItem >
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="cursor-pointer">
                    Perfil
                  </Link>
                </DropdownMenuItem >
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}
                  className="cursor-pointer text-neutro-dark hover:bg-red-100 hover:text-red-700">Cerrar sesión</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Mobile Menu Button */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5 text-neutro-dark" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[260px] sm:w-[320px] flex flex-col">
              <div className="flex items-center gap-2 px-4 py-4 border-b">
                <Brain className="w-6 h-6 text-primary" />
                <span className="text-xl font-bold text-primary">Séntia</span>
              </div>
              <nav className="flex flex-col gap-2 py-4 flex-grow">
                {filteredLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="px-4 py-2 text-base font-medium text-neutro-dark transition-colors hover:bg-primary-light hover:text-primary rounded-md"
                    onClick={() => setOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
              {user && (
                <div className="mt-auto px-4 py-4 border-t">
                  <Button
                    onClick={handleLogout}
                    className="w-full justify-start text-base text-neutro-dark hover:bg-red-100 hover:text-red-700"
                    variant="ghost"
                  >
                    Cerrar sesión
                  </Button>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}