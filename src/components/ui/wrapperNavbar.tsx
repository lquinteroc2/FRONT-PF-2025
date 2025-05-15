"use client"
import { usePathname } from "next/navigation";
import React from "react";

export default function WrapperNavbar({children,}:{children:React.ReactNode}){
    const Route=usePathname()
    const AuthRoutes=["/home","/abautMe","/centrosApoyo","/contact-us","/misEmociones","/recomendaciones"];
    const dinamicRoute=[].some(path=> Route.startsWith(path))
    if (AuthRoutes.includes(Route) || dinamicRoute){
      console.log(Route);
      
        return children;
      }


    return null
}