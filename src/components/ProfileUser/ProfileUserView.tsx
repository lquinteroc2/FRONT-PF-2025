"use client";

import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import { User, Mail, MapPin, Camera } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/Auth";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "../ui/button";
import ChangePassword from "../Buttons/ChangePassword";
import EditableField, { UserData } from "./EditableField";
import uploadImageToImgBB from "./uploadImageToImgBB";
import { profileEditHelper } from "./profileEditHelper";
import { AnimatedArrow } from "../Emotion/EmotionalLogView";

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

/** Devuelve dd/mm/yyyy exactamente como aparece en el string ISO, sin ajuste de zona */
const formatDate = (iso: string): string => {
  const [y, m, d] = iso.substring(0, 10).split("-");
  return `${d}/${m}/${y}`;
};

const ProfileUserView: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user, setUser } = useAuth();
  const { toast } = useToast();

  const [userData, setUserData] = useState<UserData>({
    name: "",
    email: "",
    address: "",
    profilePicUrl: "",
  });

  /* ─────────────── CARGA INICIAL DE DATOS ─────────────── */
  useEffect(() => {
    if (user) {
      setUserData({
        name: user.user.name || "",
        email: user.user.email || "",
        address: user.user.address || "",
        profilePicUrl:
          typeof user.user.profileImage === "string" ? user.user.profileImage : "",
      });
    }
  }, [user]);

  /* ─────────────── GUARDAR CAMPOS EDITABLES ─────────────── */
  const handleSaveField =
    (field: keyof UserData) => async (newValue: string) => {
      if (!user || !setUser) return;

      try {
        const backendField = field === "profilePicUrl" ? "profileImage" : field;
        const updatedUser = await profileEditHelper(
          user.user.id,
          { [backendField]: newValue },
          user.token
        );

        setUserData((prev) => ({
          ...prev,
          [field]:
            field === "profilePicUrl"
              ? updatedUser.profileImage ?? prev.profilePicUrl
              : updatedUser[field] ?? prev[field],
        }));

        const updatedContextUser = {
          ...user,
          user: {
            ...user.user,
            name: updatedUser.name ?? user.user.name,
            address: updatedUser.address ?? user.user.address,
            profileImage: updatedUser.profileImage ?? user.user.profileImage,
          },
        };

        setUser(updatedContextUser);
        localStorage.setItem("loginUser", JSON.stringify(updatedContextUser));

        toast({
          title: "Cambio realizado con éxito",
          description: "¡Se ha actualizado la información correctamente!",
        });
      } catch {
        toast({
          title: "Error al guardar",
          description: `No se pudo actualizar ${field}. Intenta de nuevo.`,
          variant: "destructive",
        });
      }
    };

  /* ─────────────── CAMBIO DE FOTO ─────────────── */
  const handleProfilePicChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user || !setUser) return;

    try {
      // Vista previa inmediata
      const reader = new FileReader();
      reader.onloadend = () =>
        setUserData((prev) => ({ ...prev, profilePicUrl: reader.result as string }));
      reader.readAsDataURL(file);

      // Subida a ImgBB y backend
      const imageUrl = await uploadImageToImgBB(file);
      const updatedUser = await profileEditHelper(
        user.user.id,
        { profileImage: imageUrl },
        user.token
      );

      setUserData((prev) => ({
        ...prev,
        profilePicUrl: updatedUser.profileImage || imageUrl,
      }));

      const updatedContextUser = {
        ...user,
        user: { ...user.user, profileImage: updatedUser.profileImage || imageUrl },
      };

      setUser(updatedContextUser);
      localStorage.setItem("loginUser", JSON.stringify(updatedContextUser));

      toast({
        title: "Cambio realizado con éxito",
        description: "¡Se ha actualizado la foto correctamente!",
      });
    } catch (err: any) {
      toast({
        title: "Error al actualizar la foto",
        description:
          err?.response?.data?.message ||
          err?.message ||
          "No se pudo subir la nueva foto de perfil.",
        variant: "destructive",
      });
    }
  };

  /* ─────────────── FLAGS AUXILIARES ─────────────── */
  const role = user?.user.role;
  const hasSubscription = (user?.user?.subscriptions?.length ?? 0) > 0;

  /* ─────────────── RENDER ─────────────── */
  return (
    <>
      {/* -------- HERO ---------- */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
        className="w-full max-w-6xl mx-auto text-center mt-72 px-4"
      >
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-6xl font-extrabold text-primary mb-4 leading-tight drop-shadow-[0_0_15px_rgba(109,40,217,0.4)]"
        >
          👤 Tu Perfil Séntia
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
          className="text-base md:text-lg text-neutro-dark font-medium max-w-2xl mx-auto"
        >
          Administra tu información personal, preferencias y mantén el control
          de tu experiencia emocional ✨
        </motion.p>

        <AnimatedArrow />
      </motion.div>

      {/* -------- PERFIL -------- */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
        className="min-h-screen p-4 md:p-8 flex items-start justify-center"
      >
        <div
          id="emotion-list"
          className="bg-opacity-80 backdrop-blur-md shadow-2xl mt-48 rounded-xl w-full max-w-2xl p-6 md:p-10"
        >
          <div className="md:flex md:gap-x-8">
            {/* ---- Columna Izquierda ---- */}
            <div className="md:w-3/8 w-full flex flex-col items-center">
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
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-sm text-neutro-dark hover:text-primary-dark transition-colors mt-3 mx-auto block"
                >
                  Cambiar foto
                </button>
              </div>

              {role === "premium" && hasSubscription && (
                <div className="mt-4 px-3 py-1 bg-primary text-neutro-ice text-sm rounded-full shadow-sm">
                  Usuario Premium
                </div>
              )}

              {role === "admin" &&  (
  <div className="mt-2 px-3 py-1 bg-neutro text-neutro-dark text-sm rounded-full shadow-sm">
    Usuario Administrador
  </div>
)}

<motion.div
  className="text-xs mt-1 text-center text-neutro-dark"
  initial={{ opacity: 0, y: 10 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.5 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
>
  {user?.user?.subscriptions?.[0]?.startDate &&  role === "premium" && hasSubscription &&  (
    <motion.span
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="inline-block"
    >
      Inicio:{" "}
      <span className="font-semibold text-primary">
        {formatDate(user.user.subscriptions[0].startDate)}
      </span>
      {" | "}
    </motion.span>
  )}

  {user?.user?.subscriptions?.[0]?.endDate &&  role === "premium" && hasSubscription &&  (
    <motion.span
      initial={{ opacity: 0, x: 10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="inline-block"
    >
      Fin:{" "}
      <span className="font-semibold text-primary">
        {formatDate(user.user.subscriptions[0].endDate)}
      </span>
    </motion.span>
  )}
</motion.div>


            </div>

            {/* ---- Columna Derecha ---- */}
            <div className="md:w-5/8 w-full mt-10 md:mt-0 space-y-6">
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

          <div className="mt-10 flex justify-center">
            <ChangePassword />
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default ProfileUserView;
