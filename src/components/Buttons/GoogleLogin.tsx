"use client";

import { signIn } from "next-auth/react";

const GoogleLogin = () => {
  const handleSignIn = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      const res = await signIn("google");
      
      if (res?.error) {
        console.error("Error en la autenticación con Google:", res.error);
      } else {
        console.log("Autenticación exitosa");
      }
    } catch (error) {
      console.error("Error al intentar iniciar sesión con Google:", error);
    }
  };

  return (
    <button
      onClick={handleSignIn}
      className="bg-blue-500 text-white px-4 py-2 rounded"
    >
      Iniciar sesión con Google
    </button>
  );
};

export default GoogleLogin;


