'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { MapPin, Save, Info } from 'lucide-react'
import 'leaflet/dist/leaflet.css'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useToast } from '@/components/ui/use-toast'
import { useRouter, useSearchParams } from 'next/navigation'

const Map = dynamic(() => import('./MapSelector'), { ssr: false })

const categories = [
  { value: 'Salud Mental', label: 'Salud Mental' },
  { value: 'Grupo de Apoyo', label: 'Grupo de Apoyo' },
  { value: 'Terapia', label: 'Terapia' },
  { value: 'Bienestar', label: 'Bienestar' },
  { value: 'Meditación', label: 'Meditación' },
  { value: 'Yoga', label: 'Yoga' },
]



export default function AdminHelppointsComponent() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const editId = searchParams.get("edit")
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    contact: '',
    category: '',
    address: '',
    city: '',
    country: '',
    coordinates: null as { type: 'Point'; coordinates: [number, number] } | null,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleCategoryChange = (value: string) => {
    setFormData({ ...formData, category: value })
  }

  const handleMapSelect = (lat: number, lng: number) => {
    setFormData({
      ...formData,
      coordinates: {
        type: 'Point',
        coordinates: [lng, lat],
      },
    })
  }

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  if (!formData.coordinates) {
    toast({
      title: "Ubicación requerida",
      description: "Por favor selecciona una ubicación en el mapa",
      variant: "destructive"
    })
    return
  }

  setIsSubmitting(true)

  try {
    const url = editId
      ? `${process.env.NEXT_PUBLIC_API_URL}/helppoints/${editId}`
      : `${process.env.NEXT_PUBLIC_API_URL}/helppoints`

    const method = editId ? 'PATCH' : 'POST'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })

    if (!res.ok) throw new Error('Error al guardar')

    toast({
      title: "¡Éxito!",
      description: editId ? "Punto de ayuda actualizado" : "Punto de ayuda creado",
    })

    if (!editId) {
      setFormData({
        name: '',
        description: '',
        contact: '',
        category: '',
        address: '',
        city: '',
        country: '',
        coordinates: null,
      })
    }
    router.push("/admin/help-centers")
  } catch (err) {
    console.error(err)
    toast({
      title: "Error",
      description: "Hubo un problema al guardar",
      variant: "destructive"
    })
  } finally {
    setIsSubmitting(false)
  }
}


  useEffect(() => {
  if (!editId) return

  const fetchHelpPoint = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/helppoints/${editId}`)
      const data = await res.json()

      if (!res.ok) throw new Error("No se pudo cargar el punto")

      setFormData({
        name: data.name || '',
        description: data.description || '',
        contact: data.contact || '',
        category: data.category || '',
        address: data.address || '',
        city: data.city || '',
        country: data.country || '',
        coordinates: data.coordinates || null,
      })
    } catch (err) {
      console.error(err)
      toast({
        title: "Error",
        description: "No se pudo cargar el punto de ayuda",
        variant: "destructive"
      })
    }
  }

  fetchHelpPoint()
}, [editId])

  return (
    <div className="container mx-auto py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="max-w-3xl mx-auto border-none shadow-lg">
          <CardHeader className="bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-t-lg">
            <CardTitle className="text-2xl flex items-center gap-2">
              <MapPin className="h-6 w-6" />
              {editId ? "Editar Punto de Ayuda" : "Crear Punto de Ayuda"}
            </CardTitle>
            <CardDescription className="text-teal-50">
              Añade un nuevo recurso de bienestar a nuestro mapa
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <Alert className="bg-teal-50 border-teal-200">
                <Info className="h-4 w-4 text-primary" />
                <AlertTitle className="text-teal-700">Información importante</AlertTitle>
                <AlertDescription className="text-primary">
                  Todos los puntos de ayuda son revisados antes de ser publicados. Asegúrate de proporcionar información precisa.
                </AlertDescription>
              </Alert>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-gray-700">Nombre</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Centro de bienestar emocional"
                    className="mt-1"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="description" className="text-gray-700">Descripción</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe los servicios que ofrece este lugar..."
                    className="mt-1 min-h-[100px]"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contact" className="text-gray-700">Contacto</Label>
                    <Input
                      id="contact"
                      name="contact"
                      value={formData.contact}
                      onChange={handleChange}
                      placeholder="Teléfono o email"
                      className="mt-1"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="category" className="text-gray-700">Categoría</Label>
                    <Select 
                      value={formData.category} 
                      onValueChange={handleCategoryChange}
                      required
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Selecciona una categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.value} value={category.value}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="address" className="text-gray-700">Dirección</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Calle, número, etc."
                    className="mt-1"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city" className="text-gray-700">Ciudad</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Ciudad"
                      className="mt-1"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="country" className="text-gray-700">País</Label>
                    <Input
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      placeholder="País"
                      className="mt-1"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label className="text-gray-700 block mb-2">Ubicación en el mapa</Label>
                  <p className="text-sm text-gray-500 mb-2">Haz clic en el mapa para seleccionar la ubicación exacta</p>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="rounded-lg overflow-hidden border border-gray-200"
                  >
                    <Map onSelect={handleMapSelect} selectedPosition={formData.coordinates?.coordinates} />
                  </motion.div>
                  {formData.coordinates && (
                    <p className="text-sm text-primary mt-2 flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      Ubicación seleccionada: {formData.coordinates.coordinates[1].toFixed(6)}, {formData.coordinates.coordinates[0].toFixed(6)}
                    </p>
                  )}
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-end border-t pt-6">
            <Button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-teal-600 hover:bg-teal-700 text-white"
            >
              {isSubmitting ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Guardando...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  {editId ? "Guardar Cambios" : "Crear Punto de Ayuda"}
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}