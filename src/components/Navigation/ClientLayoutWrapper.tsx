"use client";

import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";

const centeredRoutes = ["/login", "/register"];

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  // Mientras no estamos hidratados, renderiza sin clases condicionales
  if (!hydrated) {
    return <main className="w-full flex-grow">{children}</main>;
  }

  const shouldCenter = centeredRoutes.includes(pathname);

  return (
    <main
  className={
    `w-full flex-grow` +
    (shouldCenter ? " flex justify-center items-center" : "")
  }
>
  {children}
</main>
  );
}
