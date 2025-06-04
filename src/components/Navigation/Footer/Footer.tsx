"use client"

import { Brain } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";


export default function Footer() {
  const pathname = usePathname();
  const hideFullFooterIn = ["/", "/register", "/login", "/contact-us", "/help-centers", "/emotions","/profile", "/emotions/myEmotionalLog", "/emotions/myHistory"]; // ← aquí defines dónde NO quieres el footer completo
const showFullFooter = !(
  hideFullFooterIn.includes(pathname) || pathname.startsWith("/subscription-confirm/")
);


  return (
    <footer className="bg-neutro-dark py-6 mt-0 text-neutro-ice">
      <div className="container mx-auto px-4"> 
        {showFullFooter ? (
          <>
        <div className="flex flex-col gap-10 md:flex-row md:justify-between max-w-6xl mx-auto md:px-8 py-4">
  {/* Columna Izquierda */}
  <div className="flex flex-col items-center md:items-start text-center md:text-left md:w-1/3 gap-2">
    <Brain className="text-green-400 h-6 w-6" />
    <h3 className="text-xl font-bold text-neutro-ice">Séntia</h3>
    <p className="text-sm text-neutro-ice">Tu red de bienestar emocional local</p>
    <div className="flex items-center mt-2">
      <Brain className="mr-2 h-4 w-4 text-green-400" />
      <span className="text-sm text-neutro-ice-400">Cuidando tu mente desde 2023</span>
    </div>
  </div>

  {/* Columna Centro */}
  <div className="flex flex-col items-center text-center md:w-1/3 gap-2">
    <h4 className="text-lg font-semibold text-neutro-ice">Compañía</h4>
    <ul className="space-y-2 text-sm">
      <li>
        <Link href="/aboutUs" className="hover:text-primary transition-colors">
          Sobre nosotros
        </Link>
      </li>
      <li>
        <Link href="/contact-us" className="hover:text-primary transition-colors">
          Contacto
        </Link>
      </li>
    </ul>
  </div>

  {/* Columna Derecha */}
  <div className="flex flex-col items-center md:items-end text-center md:text-right md:w-1/3 gap-2">
    <h4 className="text-lg font-semibold text-neutro-light">Legal</h4>
    <ul className="space-y-2 text-sm">
      <li>
        <Link href="/terms-of-service" className="hover:text-primary transition-colors">
          Términos de uso
        </Link>
      </li>
      <li>
        <Link href="/politicas" className="hover:text-primary transition-colors">
          Política de privacidad
        </Link>
      </li>
      <li>
        <Link href="#" className="hover:text-primary transition-colors">
          Cookies
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
     