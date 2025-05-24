"use client";

import React, { useState, FormEvent } from "react";
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
          onClick={() => setShowChangePassword(true)}
          className="text-neutro-dark bg-primary hover:bg-primary-dark font-semibold py-2.5 px-4 rounded-md shadow-md transition duration-150"
        >
          Cambiar Contraseña
        </Button>
      ) : (
        <form onSubmit={handleChangePassword} className="space-y-4 w-full max-w-md">
          <div>
            <label htmlFor="currentPassword" className="block text-sm text-center font-medium text-neutro-dark mb-1">
              Contraseña Actual
            </label>
            <input
              id="currentPassword"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-3 py-2 bg-neutro-light first-letter:border border-neutro-light rounded-md text-neutro-dark focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              required
            />
          </div>
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-center text-neutro-dark mb-1">
              Nueva Contraseña
            </label>
            <input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 bg-neutro-light border border-neutro-light rounded-md text-neutro-ICE focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              required
            />
          </div>
          <div>
            <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-center text-neutro-dark mb-1">
              Confirmar Nueva Contraseña
            </label>
            <input
              id="confirmNewPassword"
              type="password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              className="w-full px-3 py-2 bg-neutro-light border border-neutro-light rounded-md text-neutro-dark focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              required
            />
          </div>

          {passwordError && <p className="text-sm text-red-500">{passwordError}</p>}
          {passwordSuccess && <p className="text-sm text-green-500">{passwordSuccess}</p>}

          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-primary hover:bg-primary-dark text-white font-semibold py-2.5 rounded-md shadow-md transition duration-150"
            >
              Actualizar Contraseña
            </button>
            <button
              type="button"
              onClick={() => setShowChangePassword(false)}
              className="flex-1 bg-neutro-light hover:bg-neutro text-neutro-dark font-semibold py-2.5 rounded-md shadow-md transition duration-150"
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

