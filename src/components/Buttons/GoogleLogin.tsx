"use client";

import { getSession, signIn } from "next-auth/react";
import { Button } from "../ui/button";
import Image from "next/image";

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

        setTimeout(async () => {
          const session = await getSession();
          console.log("Sesión obtenida desde Google:", session);
        }, 1000);

    } catch (error) {
      console.error("Error al intentar iniciar sesión con Google:", error);
    }
  };

  return (
<Button
  onClick={handleSignIn}
  variant="google"
  size="sm"
  className="w-[40%] flex items-center justify-center gap-2 font-bold"
>
  <Image src="/assets/google.webp" alt="Google" width={20} height={20} />
  Iniciar sesión con Google
</Button>
  );
};

export default GoogleLogin;


