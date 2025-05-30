"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PlusCircle, Search } from "lucide-react";
import { EmotionAdmin, emotionsHelper } from "@/components/Emotion/emotionsHelper"; // Ajusta ruta si es necesario
import { useAuth } from "@/context/Auth";


export default function EmotionsPage() {
  const [emotions, setEmotions] = useState<EmotionAdmin[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useAuth()

  useEffect(() => {
    async function fetchEmotions() {
      setLoading(true);
      setError(null);
      try {
        const token = user?.token;
        if (!token) throw new Error("No se encontró token de autenticación");

        const data = await emotionsHelper(token);
        setEmotions(data);
      } catch (err: any) {
        setError(err.message || "Error al cargar emociones");
      } finally {
        setLoading(false);
      }
    }

    fetchEmotions();
  }, []);

  const filteredEmotions = emotions.filter((emotion) =>
    emotion.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function getCategory(clinicalValue: number) {
  if (clinicalValue >= -3 && clinicalValue <= -1) return "Negativa";
  if (clinicalValue === 0) return "Neutra";
  if (clinicalValue >= 1 && clinicalValue <= 3) return "Positiva";
  return "Indefinida";
}

function getCategoryColor(category: string) {
  switch(category) {
    case "Negativa": return "text-neutro-ice bg-neutro-dark";
    case "Neutra": return "text-neutro-dark bg-neutro";
    case "Positiva": return "text-neutro-ice bg-primary";
    default: return "text-neutro-dark";
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
              <DialogDescription>
                Completa los detalles de la emoción que deseas añadir al sistema.
              </DialogDescription>
            </DialogHeader>
            {/* Aquí va tu formulario para nueva emoción */}
            <DialogFooter>
              <Button type="submit">Guardar emoción</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative w-full max-w-md">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <input
          type="search"
          placeholder="Buscar emociones..."
          className="pl-8 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading && <p>Cargando emociones...</p>}
      {error && <p className="text-red-500">{error}</p>}

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {filteredEmotions.map((emotion) => (
    <motion.div
      key={emotion.id}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <Card className="h-[320px] flex flex-col justify-between p-5 bg-neutro-ice rounded-2xl shadow-lg hover:bg-primary-light hover:shadow-2xl hover:scale-[1.02] transition duration-300 ease-in-out cursor-pointer border border-gray-100">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-3 text-xl font-bold text-neutro-dark">
            <span className="text-3xl">{emotion.emoji}</span>
            <span className="truncate">{emotion.name}</span>
          </CardTitle>
          <p className="mt-2 text-neutro-dark text-sm italic leading-snug">
            {emotion.significado}
          </p>
        </CardHeader>

        <CardContent className="pt-3 flex justify-between items-center mt-auto text-sm">
          <p className="text-gray-600 font-medium">
            <span className="text-gray-500 font-normal">Valor:</span> {emotion.clinicalValue}
          </p>
          <p
            className={`font-semibold px-2 py-1 rounded-md text-white text-xs ${getCategoryColor(
              getCategory(emotion.clinicalValue)
            )}`}
          >
            {getCategory(emotion.clinicalValue)}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  ))}
</div>




    </motion.div>
  );
}
