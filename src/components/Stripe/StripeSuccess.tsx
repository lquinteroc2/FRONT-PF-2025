"use client";
import { useEffect } from "react";

const StripeSuccess = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.close();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center flex-col">
      <p className="text-lg font-medium">Gracias por tu pago...</p>
      <p className="text-lg font-medium">Suscripción exitosa.</p>
    </div>
  );
};

export default StripeSuccess;
