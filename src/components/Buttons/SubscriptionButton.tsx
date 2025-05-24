

"use client"

import { Brain } from "lucide-react";
import { Button } from "../ui/button";
import { subscribeUser, subscribeUserPrueba, subscribeUserThree } from "../Stripe/SubscriptionsHelper";
import { useAuth } from "@/context/Auth"
import { useRouter } from "next/navigation";


export const SubscriptionButton = () => {
const { user , setUser } = useAuth();
const router = useRouter()
  const handleSubscribe = async () => {
      if (!user?.token) {
      console.error("⚠️ Usuario no autenticado.");
      return;
    }

    try {
      // Llamamos a la función que suscribe y retorna el usuario actualizado
      const response = await subscribeUser(user.user.id);

      // Guardamos el nuevo rol en localStorage
      if (response.role) {
        localStorage.setItem("role", response.role);

        setUser({
          ...user,
          user: {
            ...user.user,
            role: response.role,
          },
        });

        // Redirigimos a Stripe
        const stripeUrl = "https://buy.stripe.com/test_bJe5kF0CIbyn3Fa3DX2Fa00";
        const stripeWindow = window.open(stripeUrl, "_blank", "width=500,height=700");

        // Escuchar si la ventana se cierra y entonces redirigir internamente
  const interval = setInterval(() => {
    if (stripeWindow?.closed) {
      clearInterval(interval);
      // Redirigir al home cuando la ventana de Stripe se cierre
      window.location.href = "/home";
    }
  }, 1000);
 }
      
    } catch (error) {
      console.error("❌ Error al suscribirse:", error);
    }
  };


  return (
    <Button
      onClick={handleSubscribe}
      variant="default"
      size="sm"
      className="w-full flex items-center justify-center gap-2 font-bold group"
    >
      <Brain className="w-6 h-6 text-neutro-dark group-hover:text-primary transition-colors duration-200" />
      <span>Elegir Plan Mensual</span>
    </Button>
  );
};

export const SubscriptionButtonThree = () => {
const { user , setUser } = useAuth();
     const handleSubscribe = async () => {
      if (!user?.token) {
      console.error("⚠️ Usuario no autenticado.");
      return;
    }

    try {
      // Llamamos a la función que suscribe y retorna el usuario actualizado
      const response = await subscribeUserThree(user.user.id);

      // Guardamos el nuevo rol en localStorage
      if (response.role) {
        localStorage.setItem("role", response.role);

        setUser({
          ...user,
          user: {
            ...user.user,
            role: response.role,
          },
        });

        // Redirigimos a Stripe
        const stripeUrl = "https://buy.stripe.com/test_9B64gB85afOD7VqeiB2Fa02";
       const stripeWindow = window.open(stripeUrl, "_blank", "width=500,height=700");

        // Escuchar si la ventana se cierra y entonces redirigir internamente
  const interval = setInterval(() => {
    if (stripeWindow?.closed) {
      clearInterval(interval);
      // Redirigir al home cuando la ventana de Stripe se cierre
      window.location.href = "/home";
    }
  }, 1000);
 }
    } catch (error) {
      console.error("❌ Error al suscribirse:", error);
    }
  };

  return (
<Button
  onClick={handleSubscribe}
  variant="default"
  size="sm"
  className="w-full flex items-center justify-center gap-2 font-bold group"
>
  <Brain className="w-6 h-6 text-neutro-dark group-hover:text-primary transition-colors duration-200" />
  <span>Elegir Plan 3 Meses</span>
</Button>
  );
};


export const SubscriptionButtonPrueba = () => {
const { user , setUser } = useAuth();
        const handleSubscribe = async () => {
      if (!user?.token) {
      console.error("⚠️ Usuario no autenticado.");
      return;
    }

    try {
      // Llamamos a la función que suscribe y retorna el usuario actualizado
      const response = await subscribeUserPrueba(user.user.id);

      // Guardamos el nuevo rol en localStorage
      if (response.role) {
        localStorage.setItem("role", response.role);

        setUser({
          ...user,
          user: {
            ...user.user,
            role: response.role,
          },
        });

        // Redirigimos a Stripe
        const stripeUrl = "https://buy.stripe.com/test_bJe00ladi0TJdfKa2l2Fa01";
        const stripeWindow = window.open(stripeUrl, "_blank", "width=500,height=700");

        // Escuchar si la ventana se cierra y entonces redirigir internamente
  const interval = setInterval(() => {
    if (stripeWindow?.closed) {
      clearInterval(interval);
      // Redirigir al home cuando la ventana de Stripe se cierre
      window.location.href = "/home";
    }
  }, 1000);
      }
    } catch (error) {
      console.error("❌ Error al suscribirse:", error);
    }
  };

  return (
<Button
  onClick={handleSubscribe}
  variant="default"
  size="sm"
  className="w-full flex items-center justify-center gap-2 font-bold group"
>
  <Brain className="w-6 h-6 text-neutro-dark group-hover:text-primary transition-colors duration-200" />
  <span>Activar Prueba</span>
</Button>
  );
};

