'use client'

import React, { useState, useEffect } from 'react'
import { User } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'

const roles = ['admin', 'premium', 'free']

// ---------- Props ----------
interface Props {
  user: Partial<User>           
  token: string          
  onSaved: (changes: Partial<User>) => void 
  onCancel: () => void
  isLoading: boolean
}

// ---------- Componente ----------
const UserFormEdit: React.FC<Props> = ({ user, onSaved, onCancel }) => {
  // estado del formulario
  const [formData, setFormData] = useState<Partial<User>>({
    name: '',
    email: '',
    role: 'free',
    address: '',
    status: 'Activo',
  })

  // errores por campo
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    role: '',
  })

  // cargar datos del usuario cuando cambie
  useEffect(() => {
  setFormData({
    name: user.name ?? '',
    email: user.email ?? '',
    role: user.role ?? 'free',
    address: user.address ?? '',
    status: user.status ?? 'Activo',
  })
  setErrors({ name: '', email: '', role: '' })
}, [user])

  // ---------- Validación por campo ----------
  const validateField = (name: string, value: string) => {
    let msg = ''
    if (name === 'name' && !value.trim()) msg = 'El nombre es obligatorio'
    if (name === 'email') {
      if (!value.trim()) msg = 'El email es obligatorio'
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) msg = 'Email inválido'
    }
    if (name === 'role' && !roles.includes(value)) msg = 'Rol inválido'
    setErrors((p) => ({ ...p, [name]: msg }))
    return msg === ''
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((p) => ({ ...p, [name]: value }))
    validateField(name, value)
  }

  const isFormValid = () =>
    formData.name?.trim() &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email || '') &&
    roles.includes(formData.role || '') &&
    !Object.values(errors).some((m) => m)

  // ---------- Submit ----------
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // valida todo
    if (
      !validateField('name', formData.name || '') ||
      !validateField('email', formData.email || '') ||
      !validateField('role', formData.role || '')
    )
      return

    // arma sólo los cambios
    const changes: Partial<User> = {}
    if (formData.name !== user.name) changes.name = formData.name
    if (formData.email !== user.email) changes.email = formData.email
    if (formData.address !== user.address) changes.address = formData.address
    if (formData.role !== user.role) changes.role = formData.role
    if (formData.status !== user.status) changes.status = formData.status

    if (Object.keys(changes).length === 0) {
      toast({ title: 'Sin cambios', description: 'No modificaste nada.' })
      onCancel()
      return
    }

    // delega al padre
    onSaved({ id: user.id, ...changes })
  }

  // ---------- UI ----------
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">Cambiar Rol</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Rol */}
        <div>
          <label className="block font-medium">Rol</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border p-2 rounded"
           disabled={!isFormValid()}
          >
            <option value="">Selecciona un rol</option>
            {roles.map((r) => (
              <option key={r} value={r}>
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </option>
            ))}
          </select>
          {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
        </div>

        <Button
  type="submit"
 disabled={!isFormValid()}
  className="w-full bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
>
  Guardar cambios
</Button>
      </form>
    </div>
  )
}

export default UserFormEdit
