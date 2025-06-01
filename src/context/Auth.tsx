"use client"

import { ILoginFormDto, } from "@/lib/types";  
// import { cookies } from "next/headers";
import React, { createContext, useContext, useEffect, useState } from "react";
import  Cookies  from "js-cookie"

// Definir el tipo del contexto
export interface IAuthDto {
    user: ILoginFormDto | null;  
    setUser: (userData: ILoginFormDto | null) => void; 
}



export const AuthContext = createContext<IAuthDto>({
    user: null,
    setUser: () => {}  
});

export interface IAuthProvider {
    children: React.ReactNode;  
}

// Implementación del AuthProvider
export const AuthProvider: React.FC<IAuthProvider> = ({ children }) => {
    const [user, setUser] = useState<ILoginFormDto | null>(null);

useEffect(() => {
  const storedUser = localStorage.getItem("loginUser");
  if (storedUser) {
    setUser(JSON.parse(storedUser));
  }
}, []);
    
    useEffect(() => {
        if (user) {
        localStorage.setItem("loginUser", JSON.stringify(user));
        Cookies.set( "loginUser", JSON.stringify(user), { expires: 1 }); // Guardar en cookies por 1 día
    }
    }, [user]);


    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = () => useContext(AuthContext);
