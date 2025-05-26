"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import SubscriptionPlansModal, { Plan } from "./SubscriptionPlansModal";


export default function SubscriptionPlans() {
  const [isOpen, setIsOpen] = useState(false);
  const [userCurrentPlan, setUserCurrentPlan] = useState<Plan>("Gratuito");
  const [userHasHadSubscription, setUserHasHadSubscription] = useState(false);

  if (!isOpen) {
    return (
      <div className="container mx-auto py-10 text-center">
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-primary text-white hover:bg-primary-dark"
        >
          Ver planes de suscripción
        </Button>
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
