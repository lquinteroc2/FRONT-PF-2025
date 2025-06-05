"use client";

import { use, useEffect, useState } from "react";
import SubscriptionConfirmSelector from "@/components/Subscription/SubscriptionConfirmSelector";
import { useAuth } from "@/context/Auth";

export default function ConfirmSubscriptionPage({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  const resolvedParams = use(params);
  const sessionId = resolvedParams.sessionId;

  const { user } = useAuth();
  const token = user?.token;

  const [planType, setPlanType] = useState<"normal" | "extended" | "trial">("normal");

  useEffect(() => {
    const storedPlan = localStorage.getItem("subscriptionPlan");
    if (storedPlan === "extended" || storedPlan === "trial" || storedPlan === "normal") {
      setPlanType(storedPlan);
    }
  }, []);

  if (!user?.user.id || !token) {
    return <p>Cargando datos del usuario...</p>;
  }

  if (!sessionId) {
    return (
      <main>
        <h1>Error: No se encontró sessionId en la URL</h1>
      </main>
    );
  }


  return (
    <SubscriptionConfirmSelector
      sessionId={sessionId}
      planType={planType}
      userId={user.user.id}
      token={token}
    />
  );
}
