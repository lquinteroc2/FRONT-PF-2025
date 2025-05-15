"use client"; // Esto indica que este componente es del cliente
import { usePathname } from 'next/navigation';
import Footer from '../Footer';



export default function ClientFooter() {
  const pathname = usePathname();

  // Renderizar la navbar solo si no estás en la landing page ('/')
  if (pathname === '/') {
    return null; // No mostrar navbar en la ruta de la landing page
  }

  if (pathname === '/admin') {
    return null; // No mostrar navbar en la ruta de la landing page
  }

  return <Footer />;
}