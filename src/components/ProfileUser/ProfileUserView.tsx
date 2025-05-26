"use client";

import React, { useState, ChangeEvent, useRef, useEffect } from "react";
import { User, Mail, MapPin, Camera } from "lucide-react";
import EditableField, { initialUserData, UserData } from "./EditableField";
import { useAuth } from "@/context/Auth";
import ChangePassword from "../Buttons/ChangePassword";
import { Button } from "../ui/button";
import uploadImageToImgBB from "./fsg"
import axios from "axios";

interface UpdateUserData {
  name?: string;
  address?: string;
  profileImage?: string;
}
export async function profileEditHelper(userId: string, data: UpdateUserData, token: string) {
  try {
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("❌ Error en la respuesta del servidor:");
    } else if (error.request) {
      console.error(error.request);
    } else {
      console.error("❌ Error al configurar la petición:");
    }
    throw error;
  }
};





export default function ProfileUserView() {
  const { user } = useAuth();

  const [userData, setUserData] = useState<UserData>(initialUserData);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user) {
      setUserData({
        name: user.user.name || "",
        email: user.user.email || "",
        address: user.user.address || "",
        profilePicUrl: user.user.profileImage || "",
      });
    }
  }, [user]);

const handleSaveField = (field: keyof UserData) => async (newValue: string) => {
  if (!user) return;

  try {
    const updatedUser = await profileEditHelper(
      user.user.id,
      { [field]: newValue }, // sólo el campo que cambió
      user.token
    );

    setUserData((prev) => ({
      ...prev,
      ...updatedUser,
    }));

    console.log(`Campo ${field} guardado correctamente:`, newValue);
  } catch (error) {
    console.error(`Error guardando el campo ${field}:`, error);
    alert(`No se pudo actualizar ${field}. Intenta de nuevo.`);
  }
};



const handleProfilePicChange = async (event: ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (file && user) {
    try {
      // Opcional: mostrar preview rápido
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData((prev) => ({
          ...prev,
          profilePicUrl: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);

      // 1. Subir la imagen a ImgBB y obtener el URL público
      const imageUrl = await uploadImageToImgBB(file);

      // 2. Enviar sólo el link al backend para actualizar el perfil
      const updatedUser = await profileEditHelper(
        user.user.id,
        { profileImage: imageUrl },
        user.token
      );

      // 3. Actualizar el estado con la URL definitiva que viene del backend
      setUserData((prev) => ({
        ...prev,
        profilePicUrl: updatedUser.profileImage || imageUrl,
      }));

      console.log("Foto de perfil actualizada correctamente");
    } catch (error) {
      alert("Error al actualizar la foto de perfil. Intenta nuevamente.");
    }
  }
};


  return (
    <div>
      <div className="w-full text-center mt-20">
        <h1 className="text-3xl md:text-4xl font-bold text-neutro-dark">
          Tu Perfil <span className="text-primary-dark text-4xl">Séntia</span>
        </h1>
      </div>

      <div className="min-h-screen p-4 md:p-8 flex items-start justify-center">
        <div className="bg-opacity-80 backdrop-blur-md shadow-2xl rounded-xl w-full max-w-2xl p-6 md:p-10 transform transition-all duration-500 hover:shadow-primary">
          <p className="text-center font-semibold text-neutro-dark mb-6">
            Administra tu información personal y preferencias.
          </p>

          <div className="md:flex md:gap-x-8">
            <div className="md:w-3/8 w-full">
              <div className="flex flex-col items-center">
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
                    variant="google"
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
                      className="text-sm text-neutro-dark hover:text-primary-dark transition-colors"
                    >
                      Cambiar foto
                    </button>
                  </div>
                </div>

                {/* Badge premium */}
                {user?.user.role === "premium" && (
                  <div className="mt-4 px-3 py-1 bg-primary text-white text-sm rounded-full shadow-sm">
                    Usuario Premium
                  </div>
                )}
              </div>
            </div>

            <div className="md:w-5/8 w-full mt-10 md:mt-0">
              <div className="space-y-6">
                <EditableField
                  id="name"
                  label="Nombre Completo"
                  value={userData.name}
                  Icon={User}
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
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <ChangePassword />
          </div>
        </div>
      </div>
    </div>
  );
}
