"use client";

import { use, useEffect, useState } from "react";
import SubscriptionConfirmSelector from "@/components/Subscription/SubscriptionConfirmSelector";

export default function ConfirmSubscriptionPage({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  // Desempaquetar params (promesa) con use()
  const { sessionId } = use(params);

  const [planType, setPlanType] = useState<"normal" | "extended" | "trial">("normal");

  useEffect(() => {
    const storedPlan = localStorage.getItem("subscriptionPlan");
    if (storedPlan === "extended" || storedPlan === "trial" || storedPlan === "normal") {
      setPlanType(storedPlan);
    }
  }, []);

  console.log("🔍 sessionId:", sessionId);
  console.log("🔍 planType (desde localStorage):", planType);

  if (!sessionId) {
    return (
      <main>
        <h1>Error: No se encontró sessionId en la URL</h1>
      </main>
    );
  }

  return <SubscriptionConfirmSelector sessionId={sessionId} planType={planType} />;
}
