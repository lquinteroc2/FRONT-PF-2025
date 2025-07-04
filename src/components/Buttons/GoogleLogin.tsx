"use client";

import { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "../ui/button";
import Image from "next/image";
import googleHelper from "../Login/GoogleHelper";
import { useAuth } from "@/context/Auth";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

const GoogleLogin = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [sent, setSent] = useState(false); // Para evitar múltiples envíos
  const { setUser } = useAuth();
  const { toast } = useToast();

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

      // Renombrar antes de enviar
      const profileImage = image;

      try {
        const data = await googleHelper({ name, email, profileImage, sub });
        setUser(data);
        await signOut({ redirect: false });
      toast({
        title: "¡Bienvenido!",
        description: "Logueado exitosamente.",
      });
      setTimeout(() => {
          router.push("/home");
      }, 1000);
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
      className="w-[60%] mb-4 flex items-center justify-center gap-2 font-bold"
    >
      <Image src="https://res.cloudinary.com/dv8q9lnuf/image/upload/v1747960113/google_zas5vr.png" alt="Google" width={20} height={20} />
      Iniciar sesión con Google
    </Button>
  );
};

export default GoogleLogin;
