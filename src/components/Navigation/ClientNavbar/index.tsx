"use client";
import { usePathname } from 'next/navigation';
import Navbar from '../Navbar/Navbar';




export default function ClientNavbar() {
  const pathname = usePathname();

  
  if (pathname === '/') {
    return null; 
  }

 if (pathname.startsWith('/admin')) {
    return null;
  }

  return <Navbar />;
}