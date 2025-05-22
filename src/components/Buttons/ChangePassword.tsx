"use client";

import React, { useState, FormEvent } from "react";
import { Lock } from "lucide-react";
import { Button } from "../ui/button";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);
  const [showChangePassword, setShowChangePassword] = useState(false);

  const handleChangePassword = (e: FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(null);

    if (newPassword !== confirmNewPassword) {
      setPasswordError("Las nuevas contraseñas no coinciden.");
      return;
    }
    if (newPassword.length < 8) {
      setPasswordError("La nueva contraseña debe tener al menos 8 caracteres.");
      return;
    }

    // Aquí harías la llamada a la API para cambiar la contraseña
    console.log("Cambiando contraseña", { currentPassword, newPassword });

    setPasswordSuccess("¡Contraseña cambiada exitosamente!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setShowChangePassword(false);

    setTimeout(() => setPasswordSuccess(null), 3000);
  };

  return (
    <div className="flex justify-center my-4">
      {!showChangePassword ? (
        <Button
        variant="default"
          onClick={() => setShowChangePassword(true)}
          className=" text-neutro-dark font-semibold py-2.5 px-4 rounded-md shadow-md transition duration-150 ease-in-out focus:outline-none"
        >
          Cambiar Contraseña
        </Button>
      ) : (
        <form onSubmit={handleChangePassword} className="space-y-4">
          <div>
            <label
              htmlFor="currentPassword"
              className="block text-sm font-medium text-slate-300 mb-1"
            >
              Contraseña Actual
            </label>
            <input
              id="currentPassword"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-slate-100"
              required
            />
          </div>
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-slate-300 mb-1"
            >
              Nueva Contraseña
            </label>
            <input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-slate-100"
              required
            />
          </div>
          <div>
            <label
              htmlFor="confirmNewPassword"
              className="block text-sm font-medium text-slate-300 mb-1"
            >
              Confirmar Nueva Contraseña
            </label>
            <input
              id="confirmNewPassword"
              type="password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-slate-100"
              required
            />
          </div>
          {passwordError && <p className="text-sm text-red-400">{passwordError}</p>}
          {passwordSuccess && <p className="text-sm text-green-400">{passwordSuccess}</p>}
          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2.5 rounded-md shadow-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              Actualizar Contraseña
            </button>
            <button
              type="button"
              onClick={() => setShowChangePassword(false)}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 rounded-md shadow-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ChangePassword;
