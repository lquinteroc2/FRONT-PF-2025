"use client";

import { signOut } from "next-auth/react";
import { ButtonHTMLAttributes } from "react";


const GoogleLogout = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
     return (
    <button
      {...props}
      onClick={() => signOut()}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
    >
      Cerrar sesión
    </button>
  );
}

export default GoogleLogout;
