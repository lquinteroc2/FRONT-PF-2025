"use client";

import { signIn } from "next-auth/react";
import { Button } from "../ui/button";

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
    <Button
      onClick={handleSignIn}
      variant="google" size="sm" className="w-[40%]"
    >
      Iniciar sesión con Google
    </Button>
  );
};

export default GoogleLogin;


