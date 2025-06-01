import { useState } from "react";
import { Eye, EyeOff, Save, XCircle, Edit3 } from 'lucide-react'
import { Button } from "../ui/button";

export interface UserData {
  name: string;
  email: string;
  address: string;
  profilePicUrl: string;
}

// Datos iniciales del usuario (simulados)
export const initialUserData: UserData = {
  name: "",
  email: "",
  address: "",
  profilePicUrl: "",
};

// Componente para un campo editable
interface EditableFieldProps {
  id: keyof UserData | 'currentPassword' | 'newPassword' | 'confirmNewPassword';
  label: string;
  value: string;
  type?: string;
  Icon: React.ElementType;
  onSave: (newValue: string) => void;
  isSensitive?: boolean; // Para campos como la contraseña
  isDisabled?: boolean; // Para deshabilitar la edición, como el email
}

const EditableField: React.FC<EditableFieldProps> = ({
  id,
  label,
  value,
  type = "text",
  Icon,
  onSave,
  isSensitive = false,
  isDisabled = false,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);
  const [showPassword, setShowPassword] = useState(false);

  const handleSave = () => {
    onSave(currentValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setCurrentValue(value); // Resetea al valor original
    setIsEditing(false);
  };

  return (
    <div className="mb-6">
      <label htmlFor={id as string} className="block text-sm font-medium text-neutro-dark mb-1">
        {label}
      </label>
      <div className="flex items-center space-x-3">
        <Icon className="w-5 h-5 text-neutro-dark" />
        {isEditing ? (
          <>
            <div className="relative flex-grow">
              <input
                id={id as string}
                type={isSensitive ? (showPassword ? "text" : "password") : type}
                value={currentValue}
                onChange={(e) => setCurrentValue(e.target.value)}
                className="w-full px-3 py-2 bg-primary-light border border-neutrp-dark rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-neutro focus:border-neutro text-neutro-dark"
              />
              {isSensitive && (
                <Button
                  variant="google"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 px-3 flex items-center text-neutro hover:text-primary-light"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </Button>
              )}
            </div>
            <Button
            variant="google"
              onClick={handleSave}
              className="p-2 text-green-400 hover:text-green-300 transition-colors"
              aria-label="Guardar"
            >
              <Save size={20} />
            </Button>
            <Button
               variant="google"
              onClick={handleCancel}
              className="p-2 text-neutro-dark hover:text-neutro transition-colors"
              aria-label="Cancelar"
            >
              <XCircle size={20} />
            </Button>
          </>
        ) : (
          <>
            <p className={`flex-grow py-2 text-neutro-dark ${isSensitive ? 'italic' : ''}`}>
              {isSensitive ? "••••••••" : value}
            </p>
            {!isDisabled && (
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 text-primary-light hover:text-primary transition-colors"
                aria-label={`Editar ${label}`}
              >
                <Edit3 size={18} />
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default EditableField;