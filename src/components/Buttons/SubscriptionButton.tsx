"use client";

import { Brain } from "lucide-react";
import { Button } from "../ui/button";

export const SubscriptionButton = () => {
  const handleSubscribe = () => {
    const stripeUrl = process.env.NEXT_PUBLIC_STRIPE_PLAN_MENSUAL_URL;
    if (!stripeUrl) {
      console.error("❌ URL de Stripe no configurada en variables de entorno.");
      return;
    }
    localStorage.setItem("subscriptionPlan", "subscription")
    window.location.href = stripeUrl;
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
  const handleSubscribe = () => {
    const stripeUrl = process.env.NEXT_PUBLIC_STRIPE_PLAN_TRIMESTRAL_URL;
    if (!stripeUrl) {
      console.error("❌ URL de Stripe no configurada en variables de entorno.");
      return;
    }
    localStorage.setItem("subscriptionPlan", "extended")
    window.location.href = stripeUrl;
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
  const handleSubscribe = () => {
    const stripeUrl = process.env.NEXT_PUBLIC_STRIPE_PLAN_PRUEBA_URL;
    if (!stripeUrl) {
      console.error("❌ URL de Stripe no configurada en variables de entorno.");
      return;
    }
    localStorage.setItem("subscriptionPlan", "trial")
    window.location.href = stripeUrl;
  };

  return (
    <Button
      onClick={handleSubscribe}
      variant="default"
      size="sm"
      className="w-full flex items-center justify-center gap-2 font-bold group"
    >
      <Brain className="w-6 h-6 text-neutro-dark group-hover:text-primary transition-colors duration-200" />
      <span>Elegir Plan Prueba</span>
    </Button>
  );
};
