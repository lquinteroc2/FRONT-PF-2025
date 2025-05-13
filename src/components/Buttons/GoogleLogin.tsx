"use client";

import { signIn } from "next-auth/react";

const GoogleLogin = () => {
  const handleSignIn = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // Prevenir la recarga de la página
    signIn("google");
  };

  return (
    <button
      onClick={handleSignIn}
      className="bg-blue-500 text-white px-4 py-2 rounded"
    >
      Iniciar sesión con Google
    </button>
  );
};

export default GoogleLogin;
