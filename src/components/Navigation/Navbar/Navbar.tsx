
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
import  Cookies  from "js-cookie"
import { useRouter } from "next/navigation"
import { usePathname } from "next/navigation";


export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { user, setUser } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const navLinks = [
    { name: "Contactanos", href: "/contact-us" , showWhen: "always"   },
    { name: "Acerca de Nosotros", href: "/abautMe" , showWhen: "always"  },
    { name: "Recomendaciones", href: "/recomendaciones",hidden:false , showWhen: "auth" },
    { name: "Mis Emociones", href: "/emotions",hidden:false , showWhen: "auth" },
    { name: "Centros de Apoyo", href: "/centrosApoyo",hidden:false , showWhen: "auth" },
    { name: "Registro", href: "/register",hidden:false , showWhen: "noAuth"  },
    { name: "Iniciar Sesión", href: "/login" ,hidden: false , showWhen: "noAuth"  },
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
    <nav className="overflow-hidden min-w-[100vw] border-b bg-neutro-light fixed top-0 w-full z-50">
      <div className="relative overflow-hidden container flex justify-between h-16 items-center px-7 md:flex md:justify-evenly md:px-40"> 
        {/* Logo */}
        <Link href="/home" className="flex items-center gap-2 lg:pt-2">
          <span className=" text-xl font-bold text-primary"><Brain className="absolute ml-5 -mt-3 w-5"/>Séntia</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:flex-1 md:justify-end">
          <ul className="flex gap-6">
            {
            filteredLinks.filter(link=>!link.hidden).map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-neutro-dark transition-colors hover:text-primary"
                >
                  {link.name}
                </Link>
              </li>
            ))
            
            }
          </ul>
        </div>

        {/* User Menu */}
        <div className="flex items-center gap-4">
          {user && (
          <DropdownMenu >
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full pointer-events-none md:pointer-events-auto md:px-6">
                <Avatar className="hidden md:block h-8 w-8">
                  <AvatarImage src={user.user.profileImage} alt="Avatar" />
                  <AvatarFallback className="bg-primary-light text-primary-dark">US</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-36">
                <DropdownMenuItem asChild>
                <Link href="/admin" className="cursor-pointer">
                  Admin
                </Link>
              </DropdownMenuItem >
              <DropdownMenuItem asChild>
                <Link href="/perfil" className="cursor-pointer">
                  Perfil
                </Link>
              </DropdownMenuItem >
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}
              className="cursor-pointer text-red-600">Cerrar sesión</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>)}

          {/* Mobile Menu Button */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className=" h-5 w-5" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[240px] sm:w-[300px]">
              <div className="flex flex-col gap-6 py-6">
                <Link href="/" className="flex items-center gap-2 px-2" onClick={() => setOpen(false)}>
                  <span className="text-xl font-bold text-primary">Séntia</span>
                </Link>
                <nav className="flex flex-col gap-4">
                  {navLinks.filter(link=>!link.hidden).map((link) => (
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



