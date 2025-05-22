"use client"

import { Brain } from "lucide-react";
import { Button } from "../ui/button";

export const StripeButton = () => {
  const handleSubscribe = () => {
    window.location.href = "https://buy.stripe.com/test_bJe5kF0CIbyn3Fa3DX2Fa00";
  };

  return (
    <Button
      onClick={handleSubscribe}
      variant="google"
      size="sm"
      className="w-[60%] flex items-center justify-center gap-2 font-bold"
    >
      <Brain className="w-6 h-6 text-primary" /><span>Suscribirme por 1/mes</span>
    </Button>
  );
};


export const StripeButtonThree = () => {
  const handleSubscribe = () => {
    window.location.href = "https://buy.stripe.com/test_9B64gB85afOD7VqeiB2Fa02";
  };

  return (
    <Button
      onClick={handleSubscribe}
      variant="google"
      size="sm"
      className="w-[60%] flex items-center justify-center gap-2 font-bold"
    >
      <Brain className="w-6 h-6 text-primary" /><span>Suscribirme por 3/meses</span>
    </Button>
  );
};


export const StripeButtonPrueba = () => {
  const handleSubscribe = () => {
    window.location.href = "https://buy.stripe.com/test_bJe00ladi0TJdfKa2l2Fa01";
  };

  return (
    <Button
      onClick={handleSubscribe}
      variant="google"
      size="sm"
      className="w-[60%] flex items-center justify-center gap-2 font-bold"
    >
      <Brain className="w-6 h-6 text-primary" /><span>Suscripcion de Prueba</span>
    </Button>
  );
};

