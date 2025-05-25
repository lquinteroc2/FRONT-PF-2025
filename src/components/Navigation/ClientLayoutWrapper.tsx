"use client";

import { usePathname } from "next/navigation";
import React from "react";

const centeredRoutes = ["/login", "/register"];

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const shouldCenter = centeredRoutes.includes(pathname);

  return (
  <main
      className={`flex flex-col flex-grow ${shouldCenter ? 'justify-center items-center' : ''} px-4`}
      style={{ minHeight: 0 }} 
    >
      {children}
    </main>
  );
}
