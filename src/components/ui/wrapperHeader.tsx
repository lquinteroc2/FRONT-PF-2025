"use client"
import React from "react";
import { usePathname } from "next/navigation";

export default function WrapperHeader({children}:{children:React.ReactNode}){

    const Route=usePathname()
    const AuthRoutes=[ "/home","/recomendaciones","/misEmociones","/centrosApoyo","/aboutUs"];
    const dinamicRoute=[ "/admin/"].some(path => Route.startsWith(path))
    
    if (AuthRoutes.includes(Route)){
      return children ;
    }

    if (dinamicRoute)return null


}