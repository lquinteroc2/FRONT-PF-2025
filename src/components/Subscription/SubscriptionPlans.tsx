"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import SubscriptionPlansModal, { Plan } from "./SubscriptionPlansModal";
import { useAuth } from "@/context/Auth";

export default function SubscriptionPlans() {
  const [isOpen, setIsOpen] = useState(false);
  const [userCurrentPlan, setUserCurrentPlan] = useState<Plan>("Gratuito");
  const [userHasHadSubscription, setUserHasHadSubscription] = useState(false);
  const { user } = useAuth();

  if (!isOpen) {
    return (
      <div className="w-full">
        {/* Mensaje para administradores */}
        {user?.user.role === "admin" && (
          <div className="w-full flex justify-center text-center text-sm text-green-800 bg-green-100 border border-green-300 rounded-lg p-3 mx-auto max-w-md mb-4">
            Los usuarios administradores cuentan con acceso permanente a todo el contenido premium.
          </div>
        )}

        {/* Botón de abrir planes */}
        <div className="w-full flex justify-center my-6">
          <Button
            onClick={() => setIsOpen(true)}
            className="bg-primary text-white hover:bg-primary-dark"
          >
            Ver planes de suscripción
          </Button>
        </div>
      </div>
    );
  }

  return (
    <SubscriptionPlansModal
      onClose={() => setIsOpen(false)}
      userCurrentPlan={userCurrentPlan}
      setUserCurrentPlan={setUserCurrentPlan}
      userHasHadSubscription={userHasHadSubscription}
      setUserHasHadSubscription={setUserHasHadSubscription}
    />
  );
}
