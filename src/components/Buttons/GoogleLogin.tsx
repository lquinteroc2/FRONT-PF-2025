"use client";

import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { Button } from "../ui/button";
import Image from "next/image";
import googleHelper from "../Login/GoogleHelper";

const GoogleLogin = () => {
  const { data: session, status } = useSession();
  const [sent, setSent] = useState(false); // Para evitar múltiples envíos

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
    if (session?.user && session.user.sub && !sent) {
      const { name, email, image, sub } = session.user;

      googleHelper({ name, email, image, sub })
        .then(() => {
          console.log("📤 Datos enviados:", { name, email, image, sub });
          console.log("✅ Datos enviados al backend y guardados en localStorage");
          setSent(true);
        })
        .catch((err) => {
          console.error("❌ Error al enviar datos a backend:", err);
        });
    }
  }, [session, sent]);

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
