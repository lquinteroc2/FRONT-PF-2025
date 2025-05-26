"use client"

import { Brain } from "lucide-react";
import { Button } from "../ui/button";
import { useSearchParams } from "next/navigation";


export const SubscriptionButton = () => {

  const searchParams = useSearchParams();
  searchParams.get("session_id");

  const handleSubscribe = async () => {
    try {
      const stripeUrl = process.env.NEXT_PUBLIC_STRIPE_PLAN_MENSUAL_URL;

      if (!stripeUrl) {
        console.error("❌ URL de Stripe no configurada en variables de entorno.");
        return;
      }
      window.location.href = stripeUrl;

    } catch (error) {
      console.error("❌ Error al redirigir a Stripe:", error);
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

 const searchParams = useSearchParams();
  searchParams.get("session_id");

  const handleSubscribe = async () => {
    try {
      const stripeUrl = process.env.NEXT_PUBLIC_STRIPE_PLAN_TRIMESTRAL_URL;

      if (!stripeUrl) {
        console.error("❌ URL de Stripe no configurada en variables de entorno.");
        return;
      }
      window.location.href = stripeUrl;

    } catch (error) {
      console.error("❌ Error al redirigir a Stripe:", error);
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

  const searchParams = useSearchParams();
  searchParams.get("session_id");

  const handleSubscribe = async () => {
    try {
      const stripeUrl = process.env.NEXT_PUBLIC_STRIPE_PLAN_PRUEBA_URL;

      if (!stripeUrl) {
        console.error("❌ URL de Stripe no configurada en variables de entorno.");
        return;
      }
      window.location.href = stripeUrl;

    } catch (error) {
      console.error("❌ Error al redirigir a Stripe:", error);
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

