"use client";

import { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "../ui/button";
import Image from "next/image";
import googleHelper from "../Login/GoogleHelper";
import { useAuth } from "@/context/Auth";

const GoogleLogin = () => {
  const { data: session } = useSession();
  const [sent, setSent] = useState(false); // Para evitar múltiples envíos
    const { setUser } = useAuth();

  const handleSignIn = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      await signIn("google"); // Redirección automática
    } catch (error) {
      console.error("❌ Error al iniciar sesión con Google:", error);
    }
  };

   useEffect(() => {
    const sendDataToBackend = async () => {
      if (session?.user && session.user.sub && !sent) {
        const { name, email, image, sub } = session.user;

      try {
        const data = await googleHelper({ name, email, image, sub });

      
      setUser(data);

      await signOut({ redirect: false });

      console.log("📤 Datos enviados:", { name, email, image, sub });
      setSent(true);

      } catch (err) {
      console.error("❌ Error al enviar datos a backend:", err);
      }
      }
    };

    sendDataToBackend();
  }, [session, sent, setUser]);


  return (
    <Button
      onClick={handleSignIn}
      variant="google"
      size="sm"
      className="w-[60%] flex items-center justify-center gap-2 font-bold"
    >
      <Image src="/assets/google.webp" alt="Google" width={20} height={20} />
      Iniciar sesión con Google
    </Button>
  );
};

export default GoogleLogin;
