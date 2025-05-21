"use client"

import { Brain } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";


export default function Footer() {
  const pathname = usePathname();
  const hideFullFooterIn = ["/", "/register", "/login", "/contact-us", "/emotions"]; // ← aquí defines dónde NO quieres el footer completo
  const showFullFooter = !hideFullFooterIn.includes(pathname);

  return (
    <footer className="bg-neutro-dark py-6 text-gray-300">
      <div className="container mx-auto px-4"> 
        {showFullFooter ? (
          <>
        <div className="grid gap-8 md:grid-cols-4">
          <div className="container flex flex-col items-center justify-center md:col-span-1 text-center ">
          <Brain className="text-rose-400"/>
            <h3 className="mb-4 text-xl font-bold text-white">  Séntia</h3>
            <p className="mb-4 ">Tu red de bienestar emocional local</p>
            <div className="flex items-center">
              <Brain className="mr-2 h-4 w-4 text-rose-400" />
              <span className="text-sm">Cuidando tu mente desde 2023</span>
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-white">Plataforma</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-primary">
                  Diario emocional
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Mapa de bienestar
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Chatbot
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Recursos
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-white">Compañía</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-primary">
                  Sobre nosotros
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="./contact-us" className="hover:text-primary">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Colabora
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-neutro-light">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-primary">
                  Términos de uso
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Política de privacidad
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Cookies
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Accesibilidad
                </Link>
              </li>
            </ul>
          </div>
        </div>


      <div className="mt-12 border-t border-neutro-dark pt-4 text-center text-sm">
        <p>
      &copy; {new Date().getFullYear()} Séntia. Todos los derechos
      reservados.
        </p>
      </div>
</>
 ) : (
          <div className="text-center text-sm">
            <p>
              &copy; {new Date().getFullYear()} Séntia. Todos los derechos
              reservados.
            </p>
          </div>
        )}
      </div>
    </footer>
  );
}
     