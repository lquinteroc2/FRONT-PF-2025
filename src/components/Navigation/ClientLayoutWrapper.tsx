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

    <main className={`w-full flex-grow ${shouldCenter ? 'flex justify-center items-center' : ''}`}>

      {children}
    </main>
  );
}
