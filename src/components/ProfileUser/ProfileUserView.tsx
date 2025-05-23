"use client";

import React, { useState, ChangeEvent, useRef, useEffect } from "react";
import { User, Mail, MapPin, Camera } from "lucide-react";
import EditableField, { initialUserData, UserData } from "./EditableField";
import { useAuth } from "@/context/Auth";
import ChangePassword from "../Buttons/ChangePassword";
import { Button } from "../ui/button";

export default function ProfileUserView() {
  const { user } = useAuth();

  const [userData, setUserData] = useState<UserData>(initialUserData);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Cuando el user del contexto cambia o se monta el componente,
  // actualizar el estado local con los datos del user
useEffect(() => {
  if (user) {
    setUserData({
      name: user.user.name || "",
      email: user.user.email || "",
      address: user.user.address || "",
      profilePicUrl: user.user.profileImage || "", // según tu estructura user.user.profileImage
    });
  }
}, [user]);


  // ... el resto del código igual

  const handleSaveField = (field: keyof UserData) => (newValue: string) => {
    setUserData((prev) => ({ ...prev, [field]: newValue }));
    console.log(`Campo ${field} guardado:`, newValue);
  };

  const handleProfilePicChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData((prev) => ({ ...prev, profilePicUrl: reader.result as string }));
        console.log("Nueva foto de perfil seleccionada:", file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
  <div className="w-full text-center mt-20">
  <h1 className="text-3xl md:text-4xl font-bold text-neutro-dark">
    Tu Perfil <span className="text-primary-dark text-4xl">Séntia</span>
  </h1>
</div>

{/* CONTENEDOR DEL FORMULARIO */}
<div className="min-h-screen p-4 md:p-8 flex items-start justify-center">
  <div className="bg-opacity-80 backdrop-blur-md shadow-2xl rounded-xl w-full max-w-2xl p-6 md:p-10 transform transition-all duration-500 hover:shadow-primary">
    <p className="text-center font-semibold text-neutro-dark mb-6">
      Administra tu información personal y preferencias.
    </p>

      {/* Contenedor Flex para el layout de dos columnas en MD y superior */}
      <div className="md:flex md:gap-x-8"> {/* Aumentado el gap para más espacio */}

        {/* --- Columna Izquierda: Foto de Perfil --- */}
        {/* En pantallas pequeñas (móvil): w-full */}
        {/* En pantallas medianas y grandes (md+): w-3/8 (aprox 37.5%, cercano a tu 30%) */}
        <div className="md:w-3/8 w-full">
          <div className="flex flex-col items-center"> {/* Mantenemos centrado el contenido de esta columna */}
            <div className="relative group">
              <img
                src={
                  userData.profilePicUrl ||
                  "https://via.placeholder.com/150/4A5568/E2E8F0?text=User"
                }
                alt="Foto de perfil"
                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-primary shadow-lg group-hover:opacity-80 transition-opacity"
              />
              <Button
                variant="google" // Asumo que tienes este componente Button y su variante
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 m-auto w-16 h-16 bg-primary bg-opacity-70 rounded-full flex items-center justify-center text-neutro-dark opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-label="Cambiar foto de perfil"
              >
                <Camera size={24} />
              </Button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleProfilePicChange}
              accept="image/*"
              className="hidden"
            />
          <div className="flex justify-center mt-3">
       <button
    onClick={() => fileInputRef.current?.click()}
    className="text-sm text-neutro-dark hover:text-primary-dark transition-colors">
    Cambiar foto
       </button>
         </div>
          </div>
            </div>
          <div> 
          </div>
        </div>

        {/* --- Columna Derecha: Datos del Usuario y Cambiar Contraseña --- */}
        {/* En pantallas pequeñas (móvil): w-full, con margen superior */}
        {/* En pantallas medianas y grandes (md+): w-5/8 (aprox 62.5%, cercano a tu 50% y llenando el resto) */}
        <div className="md:w-5/8 w-full mt-10 md:mt-0"> {/* Margen superior solo en móvil */}
          <div className="space-y-6">
            <EditableField
              id="name"
              label="Nombre Completo"
              value={userData.name}
              Icon={User} // Asumo que User, Mail, MapPin son componentes de icono
              onSave={handleSaveField("name")}
            />
            <EditableField
              id="email"
              label="Correo Electrónico"
              value={userData.email}
              type="email"
              Icon={Mail}
              onSave={handleSaveField("email")}
              isDisabled
            />
            <EditableField
              id="address"
              label="Dirección"
              value={userData.address}
              Icon={MapPin}
              onSave={handleSaveField("address")}
            />
          </div>
          
          {/* Componente para cambiar contraseña */}
        </div>
        
      </div> {/* Fin del contenedor Flex md:flex */}
      <div className="mt-10 flex justify-center">
  <ChangePassword />
</div>
  </div>

    </div> 
</div>
  );
}
