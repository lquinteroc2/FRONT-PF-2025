"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { PlusCircle, Search, Smile, Frown, Meh, Heart, AlertTriangle, Zap } from "lucide-react"

interface Emotion {
  id: string
  name: string
  description: string
  category: string
  icon: string
  color: string
}

export default function EmotionsPage() {
  const [emotions, setEmotions] = useState<Emotion[]>([
    {
      id: "1",
      name: "Alegría",
      description:
        "Sentimiento de placer producido normalmente por un suceso favorable que suele manifestarse con un buen estado de ánimo, la satisfacción y la tendencia a la risa o la sonrisa.",
      category: "Positiva",
      icon: "Smile",
      color: "bg-green-100 text-green-700",
    },
    {
      id: "2",
      name: "Tristeza",
      description:
        "Sentimiento de dolor anímico producido por un suceso desfavorable que suele manifestarse con un estado de ánimo pesimista, la insatisfacción y la tendencia al llanto.",
      category: "Negativa",
      icon: "Frown",
      color: "bg-blue-100 text-blue-700",
    },
    {
      id: "3",
      name: "Miedo",
      description: "Sensación de angustia provocada por la presencia de un peligro real o imaginario.",
      category: "Negativa",
      icon: "AlertTriangle",
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      id: "4",
      name: "Amor",
      description: "Sentimiento de afecto, inclinación y entrega a alguien o algo.",
      category: "Positiva",
      icon: "Heart",
      color: "bg-red-100 text-red-700",
    },
    {
      id: "5",
      name: "Sorpresa",
      description: "Alteración emocional causada por algo imprevisto o inesperado.",
      category: "Neutra",
      icon: "Zap",
      color: "bg-purple-100 text-purple-700",
    },
    {
      id: "6",
      name: "Indiferencia",
      description:
        "Estado de ánimo en el que no se siente inclinación ni rechazo hacia una persona, objeto o situación.",
      category: "Neutra",
      icon: "Meh",
      color: "bg-gray-100 text-gray-700",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")

  const filteredEmotions = emotions.filter((emotion) => {
    const matchesSearch =
      emotion.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emotion.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = categoryFilter === "all" || emotion.category === categoryFilter

    return matchesSearch && matchesCategory
  })

  const getEmotionIcon = (iconName: string) => {
    switch (iconName) {
      case "Smile":
        return <Smile className="h-6 w-6" />
      case "Frown":
        return <Frown className="h-6 w-6" />
      case "Meh":
        return <Meh className="h-6 w-6" />
      case "Heart":
        return <Heart className="h-6 w-6" />
      case "AlertTriangle":
        return <AlertTriangle className="h-6 w-6" />
      case "Zap":
        return <Zap className="h-6 w-6" />
      default:
        return <Smile className="h-6 w-6" />
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Emociones</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Nueva Emoción
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Crear nueva emoción</DialogTitle>
              <DialogDescription>Completa los detalles de la emoción que deseas añadir al sistema.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nombre
                </Label>
                <Input id="name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="description" className="text-right pt-2">
                  Descripción
                </Label>
                <Textarea id="description" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Categoría
                </Label>
                <select
                  id="category"
                  className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="Positiva">Positiva</option>
                  <option value="Negativa">Negativa</option>
                  <option value="Neutra">Neutra</option>
                </select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="icon" className="text-right">
                  Icono
                </Label>
                <select
                  id="icon"
                  className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="Smile">Sonrisa</option>
                  <option value="Frown">Ceño fruncido</option>
                  <option value="Meh">Indiferente</option>
                  <option value="Heart">Corazón</option>
                  <option value="AlertTriangle">Alerta</option>
                  <option value="Zap">Rayo</option>
                </select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="color" className="text-right">
                  Color
                </Label>
                <select
                  id="color"
                  className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="bg-green-100 text-green-700">Verde</option>
                  <option value="bg-blue-100 text-blue-700">Azul</option>
                  <option value="bg-red-100 text-red-700">Rojo</option>
                  <option value="bg-yellow-100 text-yellow-700">Amarillo</option>
                  <option value="bg-purple-100 text-purple-700">Morado</option>
                  <option value="bg-gray-100 text-gray-700">Gris</option>
                </select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Guardar emoción</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar emociones..."
            className="pl-8 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="w-full sm:w-[180px] h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="all">Todas las categorías</option>
          <option value="Positiva">Positiva</option>
          <option value="Negativa">Negativa</option>
          <option value="Neutra">Neutra</option>
        </select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredEmotions.length === 0 ? (
          <p className="col-span-full text-center text-muted-foreground">No se encontraron emociones.</p>
        ) : (
          filteredEmotions.map((emotion) => (
            <motion.div
              key={emotion.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <div className={`p-2 rounded-full ${emotion.color}`}>{getEmotionIcon(emotion.icon)}</div>
                      {emotion.name}
                    </CardTitle>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${emotion.color}`}>
                      {emotion.category}
                    </span>
                  </div>
                  <CardDescription>Emoción catalogada</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{emotion.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Editar</Button>
                  <Button>Ver recursos</Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  )
}
