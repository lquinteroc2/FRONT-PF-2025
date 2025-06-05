'use client';

import React, { useState } from 'react';
import { EmotionAdmin } from './emotionsHelper';
import { Button } from '../ui/button';

interface Props {
  onSubmit: (emotion: Omit<EmotionAdmin, 'id'>) => void;
}

const EmotionFormAdmin: React.FC<Props> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<Omit<EmotionAdmin, 'id'>>({
    name: '',
    emoji: '',
    clinicalValue: 0,
    reflexion: '',
    significado: '',
  });
  const [error, setError] = React.useState({
  name: '',
  emoji: '',
  clinicalValue: '',
  significado: '',
  reflexion: '',
});
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

      let errorMsg = '';

  switch (name) {
    case 'name':
      if (value.trim() === '') {
        errorMsg = 'El nombre es obligatorio';
      }
      break;

    case 'emoji':
      if (value.trim() === '') {
        errorMsg = 'El emoji es obligatorio';
      } else if (!emojiRegex.test(value)) {
        errorMsg = 'Por favor ingresa un emoji válido';
      }
      break;

    case 'clinicalValue':
      const numValue = Number(value);
      if (value.trim() === '') {
        errorMsg = 'El valor clínico es obligatorio';
      } else if (isNaN(numValue)) {
        errorMsg = 'Debe ser un número';
      } else if (numValue < -3 || numValue > 3) {
        errorMsg = 'Debe estar entre -3 y 3';
      }
      break;

    case 'significado':
      if (value.trim() === '') {
        errorMsg = 'El significado es obligatorio';
      }
      break;

    case 'reflexion':
      if (value.trim() === '') {
        errorMsg = 'La reflexión es obligatoria';
      }
      break;

    default:
      break;
  }

  setError((prev) => ({ ...prev, [name]: errorMsg }));
    
    setFormData(prev => ({
      ...prev,
      [name]: name === 'clinicalValue' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      onSubmit(formData);
      setFormData({
        name: '',
        emoji: '',
        clinicalValue: 0,
        reflexion: '',
        significado: '',
      });
    }
  };

const emojiRegex = /\p{Extended_Pictographic}/u;

const isFormValid = () => {
  const { name, emoji, clinicalValue, reflexion, significado } = formData;
  return (
    name.trim() !== '' &&
    emojiRegex.test(emoji) && 
    !isNaN(clinicalValue) &&
    reflexion.trim() !== '' &&
    significado.trim() !== ''
  );
};
  return (
    <form onSubmit={handleSubmit} className="space-y-4 ">
      <div className="flex flex-col items-center">
        <label className="block text-sm font-medium text-gray-700">Nombre</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ej: Nostalgia"
          maxLength={20}
          required
        />{error && (
    <p className="mt-1 text-sm text-primary-dark font-bold">{error.name}</p>
  )}
      </div>

      <div className="flex flex-col items-center">
        <label className="block text-sm font-medium text-gray-700">Emoji</label>
        <input
          type="text"
          name="emoji"
          value={formData.emoji}
          onChange={handleChange}
          className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ej: 😌"
          maxLength={20}
          required
        />{error && (
    <p className="mt-1 text-sm text-primary-dark font-bold">{error.emoji}</p>
  )}
      </div>

    <div className="flex flex-col items-center">
      <label className="block text-sm font-medium text-gray-700">
        Valor clínico
      </label>
        <span className="text-xs text-gray-500 mb-1">
        Usa las flechas para ajustar el valor clínico entre -3 (muy bajo) y 3 (muy alto).
      </span>
      <input
        type="number"
        name="clinicalValue"
        value={formData.clinicalValue}
        onChange={handleChange}
        min={-3}
        max={3}
        step={1}
        onKeyDown={(e) => e.preventDefault()} // bloquea escritura manual
        className="w-20 text-center border rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-default"
        required
      />
      {error?.clinicalValue && (
        <p className="mt-1 text-sm text-primary-dark font-bold">{error.clinicalValue}</p>
      )}
    </div>

      <div className="flex flex-col items-center">
        <label className="block text-sm font-medium text-gray-700">Significado</label>
        <textarea
          name="significado"
          value={formData.significado}
          onChange={handleChange}
          rows={3}
          className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="¿Qué representa esta emoción?"
          maxLength={200}
          required
        />{error && (
    <p className="mt-1 text-sm text-primary-dark font-bold">{error.significado}</p>
  )}
      </div>
      
      <div className="flex flex-col items-center">
        <label className="block text-sm font-medium text-gray-700">Reflexión</label>
        <textarea
          name="reflexion"
          value={formData.reflexion}
          onChange={handleChange}
          rows={3}
          className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Mensaje de apoyo personalizado"
          maxLength={300}
          required
        />{error && (
    <p className="mt-1 text-sm text-primary-dark font-bold">{error.reflexion}</p>
  )}
      </div>

      <Button
        type="submit"
        className="block mx-auto"
        disabled={!isFormValid()}
      >
        Registrar Emoción
      </Button>
    </form>
  );
};

export default EmotionFormAdmin;
