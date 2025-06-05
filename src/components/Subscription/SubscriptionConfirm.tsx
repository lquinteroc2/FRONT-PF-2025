"use client";

import { useAuth } from "@/context/Auth";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Brain, CheckCircle } from "lucide-react";

interface Props {
  sessionId: string;
  subscribeFn: (params: { userId: string; sessionId: string }) => Promise<any>;
}

interface SubscriptionData {
  name: string;
  email: string;
  role: string;
  startDate: string;
  endDate: string;
}

const SubscriptionConfirm = ({ sessionId, subscribeFn }: Props) => {
  const router = useRouter();
  const { user, setUser } = useAuth();
  const hasSubscribed = useRef(false);
  const [isLoading, setIsLoading] = useState(true);
  const [subscriptionInfo, setSubscriptionInfo] = useState<SubscriptionData | null>(null);
  

  useEffect(() => {
    if (!user) {
      return;
    }
    if (hasSubscribed.current) {
      return;
    }

    const handleSubscribe = async () => {
      hasSubscribed.current = true;

      if (!sessionId) {

        setIsLoading(false);
        return;
      }

      try {
        const response = await subscribeFn({ userId: user.user.id, sessionId });


        let nextRole = user.user.role;
        if (response.role) {
          nextRole = response.role;
          localStorage.setItem("role", response.role);

        }

        const prevSubs = user.user.subscriptions ?? [];
        const updatedSubs =
          prevSubs.length === 0
            ? [response]
            : prevSubs.map((sub, idx) =>
                idx === 0 ? { ...sub, ...response } : sub
              );

        const updatedContextUser = {
          ...user,
          user: {
            ...user.user,
            role: nextRole,
            subscriptions: updatedSubs,
          },
        };

        setUser(updatedContextUser);
        localStorage.setItem("loginUser", JSON.stringify(updatedContextUser));


        setSubscriptionInfo({
          name: response.name,
          email: response.email,
          role: response.role,
          startDate: response.startDate,
          endDate: response.endDate,
        });


      } catch (error) {
        console.error("❌ Error al suscribirse:", error);
      } finally {
        setIsLoading(false);

      }
    };

    handleSubscribe();
  }, [user, setUser, sessionId, subscribeFn]);



  if (isLoading) {
    return (
      <main className="p-8 text-center mt-20">
        <h1 className="text-xl font-semibold">Procesando tu suscripción...</h1>
        <p>Por favor espera un momento.</p>
      </main>
    );
  }

  if (subscriptionInfo) {
    return (
      <main className="min-h-[60vh] flex items-center justify-center px-4 mt-20 py-6">
        <div className="bg-neutro rounded-xl shadow-lg max-w-md w-full px-6 py-6 text-center animate-fade-in-up">
          <CheckCircle className="w-12 h-12 text-primary mx-auto mb-3 animate-bounce" />
          <h1 className="text-2xl font-extrabold text-primary mb-1">¡Suscripción exitosa!</h1>
          <p className="text-neutro-dark text-base">
            Gracias por suscribirte, <span className="font-semibold">{subscriptionInfo.name}</span> 🎉
          </p>

          <div className="flex flex-col items-center mt-4 text-left text-sm text-neutro-dark space-y-1 bg-primary-light rounded-lg p-3 shadow-inner">
            <p><span className="font-semibold">📧 Email:</span> {subscriptionInfo.email}</p>
            <p className="flex items-center gap-1 font-semibold text-neutro-dark">
              <Brain className="w-5 h-5" />
              Plan: <span className="font-normal ml-1">{subscriptionInfo.role}</span>
            </p>
            <p><span className="font-semibold">🟢 Inicio:</span> {subscriptionInfo.startDate}</p>
            <p><span className="font-semibold">🔚 Fin:</span> {subscriptionInfo.endDate}</p>
          </div>

          <button
            onClick={() => router.push("/home")}
            className="mt-6 inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full font-semibold hover:bg-primary/90 transition duration-200 shadow-md"
          >
            Ir al inicio <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </main>
    );
  }

  return null;
};

export default SubscriptionConfirm;
