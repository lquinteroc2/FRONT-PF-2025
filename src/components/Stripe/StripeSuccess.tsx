"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAuth } from "@/context/Auth"; // si tienes auth

const StripeSuccess = () => {
  const router = useRouter();
  const { user } = useAuth(); // suponiendo que tienes el usuario autenticado

  useEffect(() => {
    const notifyBackend = async () => {
      try {
        await axios.post("https://tubackend.com/api/stripe-success", {
          userId: user?.user.id, // o email, lo que identifique al usuario
          message: "Pago confirmado desde Stripe",
        });

        console.log("Notificado al backend.");
      } catch (error) {
        console.error("Error al notificar al backend:", error);
      }

      setTimeout(() => {
        router.push("/home"); // Redirige al home
      }, 2000);
    };

    notifyBackend();
  }, [router, user]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-lg font-medium">Gracias por tu pago. Redirigiéndote...</p>
    </div>
  );
};

export default StripeSuccess;