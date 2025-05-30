"use client"

import { useEffect } from "react";
import { useAuth } from "@/context/Auth";
import { useRouter } from "next/navigation";

export default function AdminProtected({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) return; // o mostrar loader
    if (user.user.role !== "admin") {
      router.replace("/"); // o a donde quieras redirigir si no es admin
    }
  }, [user, router]);

  if (!user || user.user.role !== "admin") {
    return null; // o un loader, hasta que se decida
  }

  return <>{children}</>;
}
