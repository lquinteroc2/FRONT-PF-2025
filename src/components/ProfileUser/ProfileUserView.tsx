"use client";

import React, { useState, ChangeEvent, useRef, useEffect } from "react";
import { User, Mail, MapPin, Camera } from "lucide-react";
import EditableField, { initialUserData, UserData } from "./EditableField";
import { useAuth } from "@/context/Auth";
import ChangePassword from "../Buttons/ChangePassword";
import { Button } from "../ui/button";
import uploadImageToImgBB from "./uploadImageToImgBB"
import { profileEditHelper } from "./profileEditHelper";



export default function ProfileUserView() {
  const fileInputRef = useRef<HTMLInputElement>(null);
const { user, setUser } = useAuth();

const [userData, setUserData] = useState<UserData>({
  name: "",
  email: "",
  address: "",
  profilePicUrl: "",
});

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
  if (!user || !setUser) {
    console.warn("❌ Usuario o setUser no disponible");
    return;
  }

  try {
    console.log(`🔄 Actualizando campo: ${field} con valor:`, newValue);

    // El campo para el backend (profilePicUrl se mapea a profileImage)
    const backendField = field === "profilePicUrl" ? "profileImage" : field;

    const updatedUserFromBackend = await profileEditHelper(
      user.user.id,
      { [backendField]: newValue },
      user.token
    );

    console.log("📦 Respuesta del backend:", updatedUserFromBackend);

    // Actualiza solo el campo modificado en el estado local
    const newUserData = {
      ...userData,
      [field]:
        field === "profilePicUrl"
          ? updatedUserFromBackend.profileImage ?? userData.profilePicUrl
          : updatedUserFromBackend[field] ?? userData[field],
    };

    setUserData(newUserData);

    // Actualiza el contexto con los nuevos datos
    const updatedContextUser = {
      ...user,
      user: {
        ...user.user,
        name: updatedUserFromBackend.name ?? user.user.name,
        address: updatedUserFromBackend.address ?? user.user.address,
        profileImage: updatedUserFromBackend.profileImage ?? user.user.profileImage,
      },
    };

    setUser(updatedContextUser);

    // Guarda el contexto actualizado en localStorage
    localStorage.setItem("loginUser", JSON.stringify(updatedContextUser));
    console.log("💾 Guardado en localStorage:", updatedContextUser);

    console.log(`✅ Campo ${field} actualizado correctamente`);
  } catch (error) {
    console.error(`❌ Error actualizando ${field}:`, error);
    alert(`No se pudo actualizar ${field}. Intenta de nuevo.`);
  }
};

const handleProfilePicChange = async (event: ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (file && user && setUser) {
    try {
      // Mostrar preview rápido (opcional)
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

      // 3. Actualizar el estado local con la URL definitiva del backend
      setUserData((prev) => ({
        ...prev,
        profilePicUrl: updatedUser.profileImage || imageUrl,
      }));

      // 4. Actualizar el contexto con la nueva imagen
      const updatedContextUser = {
        ...user,
        user: {
          ...user.user,
          profileImage: updatedUser.profileImage || imageUrl,
        },
      };

      setUser(updatedContextUser);

      // 5. Guardar en localStorage
      localStorage.setItem("loginUser", JSON.stringify(updatedContextUser));

      console.log("✅ Foto de perfil actualizada correctamente");
    } catch (error) {
      alert("❌ Error al actualizar la foto de perfil. Intenta nuevamente.");
      console.error(error);
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
{user?.user.role === "premium" && (user?.user?.subscription?.length ?? 0) > 0  && (
  <div className="mt-4 px-3 py-1 bg-primary text-white text-sm rounded-full shadow-sm">
    Usuario Premium
  </div>
)}
    <div className="text-xs mt-1">
{user?.user?.subscription?.[0]?.startDate ? (
  <>
    Inicio: {new Date(user.user.subscription[0].startDate).toLocaleDateString("es-ES")}
    {" | "}
  </>
) : null}
{user?.user?.subscription?.[0]?.endDate ? (
  <>
    Fin: {new Date(user.user.subscription[0].endDate).toLocaleDateString("es-ES")}
  </>
) : null}

    </div>
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
