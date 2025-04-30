import { Heart } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-900 py-12 text-gray-300">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <h3 className="mb-4 text-xl font-bold text-white">MindMap</h3>
            <p className="mb-4">Tu red de bienestar emocional local</p>
            <div className="flex items-center">
              <Heart className="mr-2 h-4 w-4 text-teal-400" />
              <span className="text-sm">Cuidando tu mente desde 2023</span>
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-white">Plataforma</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-teal-400">
                  Diario emocional
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-teal-400">
                  Mapa de bienestar
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-teal-400">
                  Chatbot
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-teal-400">
                  Recursos
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-white">Compañía</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-teal-400">
                  Sobre nosotros
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-teal-400">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-teal-400">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-teal-400">
                  Colabora
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-white">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-teal-400">
                  Términos de uso
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-teal-400">
                  Política de privacidad
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-teal-400">
                  Cookies
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-teal-400">
                  Accesibilidad
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} MindMap. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
