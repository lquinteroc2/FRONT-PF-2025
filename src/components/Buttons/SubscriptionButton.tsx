"use client"

import { Brain } from "lucide-react";
import { Button } from "../ui/button";

export const SubscriptionButton = () => {
  const handleSubscribe = () => {
    window.location.href = "https://buy.stripe.com/test_bJe5kF0CIbyn3Fa3DX2Fa00";
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


export const StripeButtonThree = () => {
  const handleSubscribe = () => {
    window.location.href = "https://buy.stripe.com/test_9B64gB85afOD7VqeiB2Fa02";
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


export const StripeButtonPrueba = () => {
  const handleSubscribe = () => {
    window.location.href = "https://buy.stripe.com/test_bJe00ladi0TJdfKa2l2Fa01";
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

