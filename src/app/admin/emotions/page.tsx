"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PlusCircle, Search } from "lucide-react";
import { EmotionAdmin, emotionsHelper, emotionsHelperAdmin } from "@/components/Emotion/emotionsHelper"; // Ajusta ruta si es necesario
import { useAuth } from "@/context/Auth";
import EmotionFormAdmin from "@/components/Emotion/EmotionsFormAdmin";
import { useToast } from "@/components/ui/use-toast";

export default function EmotionsPage() {
  const [emotions, setEmotions] = useState<EmotionAdmin[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const { user } = useAuth()
  const [isOpen, setIsOpen] = useState(false);
  
  const closeDialog = () => setIsOpen(false);
  const { toast } = useToast();

 const handleCreateEmotion = async (
  emotion: Omit<EmotionAdmin, "id">,
  token: string | undefined,
  onClose: () => void
) => {
  if (!user?.token) {
    toast({
      title: "Error al crear emoción",
      description: "No tienes autorización para crear una emoción.",
      variant: "destructive",
    });
    return;
  }

 try {
  const createdEmotion = await emotionsHelperAdmin(user.token, emotion);
  console.log("Resultado de creación de emoción:", createdEmotion);
  
  toast({
    title: "Emoción creada",
    description: `La emoción "${createdEmotion.name}" fue añadida correctamente.`,
    variant: "default",
  });
  window.location.reload();
  onClose();
  } catch (error) {
    console.error("Error al crear la emoción:", error);
    toast({
      title: "Error al crear emoción",
      description: "Ocurrió un error al intentar crear la emoción.",
      variant: "destructive",
    });
  }
};

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

  const filteredEmotions = emotions.filter((emotion) => {
  const matchesSearch = emotion.name.toLowerCase().includes(searchTerm.toLowerCase());
  const category = getCategory(emotion.clinicalValue);
  const matchesCategory = selectedCategory === "" || category === selectedCategory;
  return matchesSearch && matchesCategory;
});



  function getCategory(clinicalValue: number) {
  if (clinicalValue >= -3 && clinicalValue <= -2) return "Negativa";
  if (clinicalValue >= -1 && clinicalValue <= 1)  return "Neutra";
  if (clinicalValue >= 2 && clinicalValue <= 3) return "Positiva";
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
            <EmotionFormAdmin onSubmit={(emotion) => handleCreateEmotion(emotion, user?.token, closeDialog)} />
            <DialogFooter>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

<div className="flex flex-col sm:flex-row gap-4 items-end sm:items-center">
  <div className="w-full sm:max-w-xs">
    <label className="text-sm font-medium block mb-1 invisible">Búsqueda</label>
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <input
        type="search"
        placeholder="Buscar emociones..."
        className="pl-9 h-10 w-full rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        value={searchTerm}
        maxLength={100}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  </div>

  <div className="w-full sm:max-w-xs">
    <label className="text-sm font-medium block mb-1 text-neutro-dark">Filtrar por categoría</label>
    <select
      value={selectedCategory}
      onChange={(e) => setSelectedCategory(e.target.value)}
      className="h-10 w-full border border-input bg-background px-3 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
    >
      <option value="">Todas</option>
      <option value="Positiva">Positiva</option>
      <option value="Negativa">Negativa</option>
      <option value="Neutra">Neutra</option>
    </select>
  </div>
</div>



      {loading && <p>Cargando emociones...</p>}
      {error && <p className="text-neutro-dark">{error}</p>}

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
           {emotion.clinicalValue}
          </p>
          <p
            className={`font-semibold px-2 py-1 rounded-md text-xs ${getCategoryColor(
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
