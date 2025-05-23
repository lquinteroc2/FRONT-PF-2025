"use client"; // Esto indica que este componente es del cliente
import { usePathname } from 'next/navigation';
import Footer from '../Footer/Footer';



export default function ClientFooter() {
  const pathname = usePathname();

  
  if (pathname === '/') {
    return null; 
  }

 if (pathname.startsWith('/admin')) {
    return null;
  }

  return <Footer />;
}