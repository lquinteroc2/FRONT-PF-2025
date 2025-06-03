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
  const [loggingOut, setLoggingOut] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const navLinks = [
    { name: "Contáctanos", href: "/contact-us", showWhen: "always" },
    { name: "Acerca de Nosotros", href: "/aboutUs", showWhen: "always" },
    { name: "Recomendaciones", href: "/recursos", hidden: false, showWhen: "auth" },
    { name: "Centros de Apoyo", href: "/help-centers", hidden: false, showWhen: "auth" },
    { name: "Registro", href: "/register", hidden: false, showWhen: "noAuth" },
    { name: "Iniciar Sesión", href: "/login", hidden: false, showWhen: "noAuth" },
    {
      name: "Mis Emociones",
      hidden: false,
      showWhen: "auth",
      submenu: [
        { name: "Historial Emocional", href: "/emotions/myHistory" },
        { name: "Bitacora Emocional", href: "/emotions/myEmotionalLog" }
      ]
    },
  ]

  const filteredLinks = navLinks.filter((link) => {
    if (link.href === pathname) return false;
    if (link.showWhen === "noAuth") return !user;
    if (link.showWhen === "auth") return !!user;
    if (link.showWhen === "always") return true;
    return false;
  });

const handleLogout = () => {
  setLoggingOut(true);

  setTimeout(() => {
    setUser(null);
    localStorage.removeItem("loginUser");
    Cookies.remove("loginUser");

    router.push("/");
  }, 1000);
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
            {filteredLinks.filter(link => !link.hidden).map((link) => {
              if (link.submenu) {
                // Render dropdown menu with submenu items, filtering out current path
                return (
                  <li key={link.name}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="text-sm font-medium text-neutro-dark transition-colors hover:text-primary-dark hover:font-semibold">
                          {link.name}
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {link.submenu
                          .filter(subItem => subItem.href !== pathname)
                          .map(subItem => (
                            <DropdownMenuItem asChild key={subItem.href}>
                              <Link href={subItem.href}>{subItem.name}</Link>
                            </DropdownMenuItem>
                          ))
                        }
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </li>
                )
              }
              // Normal link
              return (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-neutro-dark transition-colors hover:text-primary-dark hover:font-semibold"
                  >
                    {link.name}
                  </Link>
                </li>
              )
            })}
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
                {user?.user?.role === "admin" && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin" className="cursor-pointer">
                      Admin
                    </Link>
                  </DropdownMenuItem>
                )}
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
                <ul className="flex flex-col gap-2">
                  {filteredLinks.filter(link => !link.hidden).map((link) => {
                    if (link.submenu) {
                      return (
                        <li key={link.name}>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button className="text-sm font-medium text-neutro-dark transition-colors hover:text-primary-dark hover:font-semibold">
                                {link.name}
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              {link.submenu
                                .filter(subItem => subItem.href !== pathname)
                                .map(subItem => (
                                  <DropdownMenuItem asChild key={subItem.href}>
                                    <Link href={subItem.href}>{subItem.name}</Link>
                                  </DropdownMenuItem>
                                ))
                              }
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </li>
                      )
                    }
                    return (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-sm font-medium text-neutro-dark transition-colors hover:text-primary-dark hover:font-semibold"
                        >
                          {link.name}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </nav>
   {loggingOut ? (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-xl font-semibold z-50">
        Cerrando sesión...
      </div>
    ) : (
      user && (
        <div className="mt-auto px-4 py-4 border-t">
          <Button
            onClick={handleLogout}
            className="w-full justify-start text-base text-neutro-dark hover:bg-primary-100 hover:text-neutro-dark"
            variant="ghost"
          >
            Cerrar sesión
          </Button>
        </div>
      )
    )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
