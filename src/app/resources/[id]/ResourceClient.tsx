"use client"

import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

import { useEffect, useState } from "react"
import Image from "next/image"
import { notFound } from "next/navigation"
import { motion } from "framer-motion"
import { ChevronLeft, Clock, Eye, Tag, Calendar } from "lucide-react"
import Link from "next/link"
import type { Resource } from "@/lib/types"
import { fetchResourceById } from "@/services/resources"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import CardHome from "@/components/Resources/home/Card"

const cardsData = [
  {
    id: "card1",
    title: "Socializar",
    description: "Hablar con familiares, amigos o grupos de apoyo puede ayudar a compartir las preocupaciones y recibir apoyo emocional. ",
    imageSrc: "https://res.cloudinary.com/dv8q9lnuf/image/upload/v1747960116/familia_qmtvvd.jpg",
    imageAlt: "Image 1",
    category: "Bienestar",
    readTime: "5 min",
    date: "15 Mayo, 2023",
  },
  {
    id: "card2",
    title: "terapia cognitivo conductual",
    description: "La TCC es una terapia eficaz para abordar los patrones negativos y distorsiones de pensamiento que contribuyen a la ansiedad.  ",
    imageSrc: "https://res.cloudinary.com/dv8q9lnuf/image/upload/v1747960117/rugbi_frlosd.jpg",
    imageAlt: "Image 3",
    category: "Social",
    readTime: "8 min",
    date: "22 Abril, 2023",
  },
  {
    id: "card3",
    title: "Ritinas relajantes",
    description: "Dar un baño caliente, leer un libro, practicar aromaterapia o cocinar pueden crear un ambiente relajante que ayuda a reducir la ansiedad. ",
    imageSrc: "https://res.cloudinary.com/dv8q9lnuf/image/upload/v1747960119/leer_kyttfv.jpg",
    imageAlt: "Image 4",
    category: "Ejercicio",
    readTime: "12 min",
    date: "10 Junio, 2023",
  },
  {
    id: "card4",
    title: "Socializar",
    description: "Hablar con familiares, amigos o grupos de apoyo puede ayudar a compartir las preocupaciones y recibir apoyo emocional. ",
    imageSrc: "https://res.cloudinary.com/dv8q9lnuf/image/upload/v1747960116/familia_qmtvvd.jpg",
    imageAlt: "Image 1",
    category: "Mindfulness",
    readTime: "10 min",
    date: "5 Marzo, 2023",
  },
    {
    id: "card5",
    title: "terapia cognitivo conductual",
    description: "La TCC es una terapia eficaz para abordar los patrones negativos y distorsiones de pensamiento que contribuyen a la ansiedad.  ",
    imageSrc: "https://res.cloudinary.com/dv8q9lnuf/image/upload/v1747960117/rugbi_frlosd.jpg",
    imageAlt: "Image 3",
    category: "Bienestar",
    readTime: "5 min",
    date: "15 Mayo, 2023",
  },
  {
    id: "card6",
    title: "Ritinas relajantes",
    description: "Dar un baño caliente, leer un libro, practicar aromaterapia o cocinar pueden crear un ambiente relajante que ayuda a reducir la ansiedad. ",
    imageSrc: "https://res.cloudinary.com/dv8q9lnuf/image/upload/v1747960119/leer_kyttfv.jpg",
    imageAlt: "Image 4",
    category: "Social",
    readTime: "8 min",
    date: "22 Abril, 2023",
  },
  {
    id: "card10",
    title: "Ejercicios de respiración al aire libre",
    description: "Description for card 1",
    imageSrc: "https://res.cloudinary.com/dv8q9lnuf/image/upload/v1747960117/ejerciciosderespiraci%C3%B3nalairelibre_fgtste.jpg",
    imageAlt: "Image 1",
    category: "Social",
    readTime: "8 min",
    date: "22 Abril, 2023",
  },
  {
    id: "card11",
    title: "hablar con personas",
    description: "Description for card 3",
    imageSrc: "https://res.cloudinary.com/dv8q9lnuf/image/upload/v1747960116/hablarconpersonas_e25pf1.jpg",
    imageAlt: "Image 3",
    category: "Ejercicio",
    readTime: "12 min",
    date: "10 Junio, 2023",
  },
  {
    id: "card12",
    title: "Joga",
    description: "Description for card 4",
    imageSrc: "https://res.cloudinary.com/dv8q9lnuf/image/upload/v1747960119/Joga_q93kis.jpg",
    imageAlt: "Image 4",
    category: "Mindfulness",
    readTime: "10 min",
    date: "5 Marzo, 2023",
  },
    {
    id: "card13",
    title: "Meditación",
    description: "Description for card 4",
    imageSrc: "https://res.cloudinary.com/dv8q9lnuf/image/upload/v1747960119/meditaci%C3%B3n_yjjllb.jpg",
    imageAlt: "Image 5",
    category: "Mindfulness",
    readTime: "10 min",
    date: "5 Marzo, 2023",
  },
]

// Variantes de animación para Framer Motion
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 },
  },
}

const imageVariants = {
  hidden: { scale: 1.1, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5 },
  },
}

export default function ResourceClient({ id }: { id: string }) {
  const [resource, setResource] = useState<Resource | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("detalles")

  const staticCard = cardsData.find((card) => card.id === id)

  useEffect(() => {
    if (staticCard) {
      setLoading(false)
      return
    }

    const loadResource = async () => {
      try {
        const data = await fetchResourceById(id)
        setResource(data)
      } catch (err) {
        setError("No pudimos cargar este recurso. Por favor, intenta de nuevo más tarde.")
      } finally {
        setLoading(false)
      }
    }

    loadResource()
  }, [id, staticCard])

  if (loading) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-12">
        <div className="space-y-6">
          <Skeleton className="h-[400px] w-full rounded-xl" />
          <div className="space-y-3">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <div className="flex gap-2 pt-2">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-24" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error && !staticCard) {
    return (
      <motion.div
        className="container mx-auto max-w-4xl px-4 py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Alert variant="destructive" className="mb-6">
          <AlertTitle className="text-xl font-bold">Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>

        <div className="flex justify-center">
          <Button asChild>
            <Link href="/home">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Volver a recursos
            </Link>
          </Button>
        </div>
      </motion.div>
    )
  }

  if (!resource && !staticCard) return notFound()

  const renderStatic = () => {
    const card = staticCard!

    return (
      <motion.div
        className="container mx-auto pt-20 max-w-4xl px-4 py-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <Link href="/home" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Volver a recursos
          </Link>
        </motion.div>

        <Card className="overflow-hidden border-none shadow-xl">
          <motion.div className="relative h-[400px] w-full overflow-hidden" variants={imageVariants}>
            <Image
              src={card.imageSrc || "/placeholder.svg"}
              alt={card.imageAlt}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
              <Badge className="mb-3" variant="secondary">
                {card.category}
              </Badge>
              <h1 className="text-4xl font-bold text-white">{card.title}</h1>
            </div>
          </motion.div>

          <CardContent className="p-6 pt-6">
            <motion.div
              className="mb-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground"
              variants={itemVariants}
            >
              <div className="flex items-center">
                <Clock className="mr-1 h-4 w-4" />
                {card.readTime} de lectura
              </div>
              <div className="flex items-center">
                <Calendar className="mr-1 h-4 w-4" />
                {card.date}
              </div>
            </motion.div>

            <Tabs defaultValue="detalles" className="mt-6" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4 grid w-full grid-cols-2">
                <TabsTrigger value="detalles">Detalles</TabsTrigger>
                <TabsTrigger value="recursos">Recursos relacionados</TabsTrigger>
              </TabsList>

              <TabsContent value="detalles" className="space-y-4">
                <motion.p className="text-lg leading-relaxed text-muted-foreground" variants={itemVariants}>
                  {card.description}
                </motion.p>

                <motion.div variants={itemVariants} className="mt-6 space-y-4">
                  <h2 className="text-2xl font-semibold">Beneficios</h2>
                  <p className="text-muted-foreground">
                    Este recurso te ayudará a mejorar tu bienestar mental y físico a través de técnicas probadas y
                    respaldadas por expertos.
                  </p>
                </motion.div>
              </TabsContent>

              <TabsContent value="recursos" className="space-y-4">
                <p className="text-muted-foreground">Otros recursos que podrían interesarte:</p>
                <div className="grid gap-4 sm:grid-cols-2">
                  {cardsData
                    .filter((c) => c.id !== card.id)
                    .slice(0, 2)
                    .map((relatedCard) => (
                      <motion.div
                        key={relatedCard.id}
                        whileHover={{ y: -5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <CardHome
                        key={relatedCard.id}
                        title={relatedCard.title}
                        description={relatedCard.description}
                        imageSrc={relatedCard.imageSrc}
                        imageAlt={relatedCard.imageAlt}
                        href={`/resources/${relatedCard.id}`}
                      />
                      </motion.div>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>

          <CardFooter className="flex justify-between border-t p-6">
            <Button variant="outline" asChild>
              <Link href="/home">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Volver
              </Link>
            </Button>
            {/* <Button>Guardar recurso</Button> */}
          </CardFooter>
        </Card>
      </motion.div>
    )
  }

  const renderResource = () => {
    const res = resource!

    return (
      <motion.div
        className="container mx-auto pt-20 max-w-4xl px-4 py-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <Link href="/home" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Volver a recursos
          </Link>
        </motion.div>

        <Card className="overflow-hidden border-none shadow-xl">
          <motion.div className="relative h-[400px] w-full overflow-hidden" variants={imageVariants}>
            <Image
              src={res.thumbnailUrl || res.cloudinaryUrl || "/placeholder.svg"}
              alt={res.name || "Recurso"}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
              {/* {res.category && (
                <Badge className="mb-3" variant="secondary">
                  {res.category}
                </Badge>
              )} */}
              <h1 className="text-4xl font-bold text-white">{res.name}</h1>
            </div>
          </motion.div>

          <CardContent className="p-6 pt-6">
            <CardContent className="p-6 pt-6">
            {/* <motion.div
              className="mb-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground"
              variants={itemVariants}
            >
              <div className="flex items-center">
                <Clock className="mr-1 h-4 w-4" />
                {res.readTime} de lectura
              </div>
              <div className="flex items-center">
                <Calendar className="mr-1 h-4 w-4" />
                {res.date}
              </div>
            </motion.div> */}

            <Tabs defaultValue="detalles" className="mt-6" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4 grid w-full grid-cols-2">
                <TabsTrigger value="detalles">Detalles</TabsTrigger>
                <TabsTrigger value="recursos">Recursos relacionados</TabsTrigger>
              </TabsList>

              <TabsContent value="detalles" className="space-y-4">
                <motion.p className="text-lg leading-relaxed text-muted-foreground" variants={itemVariants}>
                  {res.description}
                </motion.p>

                <motion.div variants={itemVariants} className="mt-6 space-y-4">
                  <h2 className="text-2xl font-semibold">Beneficios</h2>
                  <p className="text-muted-foreground">
                    Este recurso te ayudará a mejorar tu bienestar mental y físico a través de técnicas probadas y
                    respaldadas por expertos.
                  </p>
                </motion.div>
              </TabsContent>

              <TabsContent value="recursos" className="space-y-4">
                <p className="text-muted-foreground">Otros recursos que podrían interesarte:</p>
                <div className="grid gap-4 sm:grid-cols-2">
                  {cardsData
                    .filter((c) => c.id !== res.id)
                    .slice(0, 2)
                    .map((relatedCard) => (
                      <motion.div
                        key={relatedCard.id}
                        whileHover={{ y: -5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <CardHome
                        key={relatedCard.id}
                        title={relatedCard.title}
                        imageSrc={relatedCard.imageSrc}
                        imageAlt={relatedCard.imageAlt}
                        href={`/resources/${relatedCard.id}`}
                      />
                      </motion.div>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
            {/* <motion.div
              className="mb-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground"
              variants={itemVariants}
            >
              {res.author && (
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback>{res.author.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  {res.author}
                </div>
              )}
              {res.readTime && (
                <div className="flex items-center">
                  <Clock className="mr-1 h-4 w-4" />
                  {res.readTime}
                </div>
              )}
              {res.views && (
                <div className="flex items-center">
                  <Eye className="mr-1 h-4 w-4" />
                  {res.views} vistas
                </div>
              )}
              {res.tags && res.tags.length > 0 && (
                <div className="flex items-center">
                  <Tag className="mr-1 h-4 w-4" />
                  {res.tags.join(", ")}
                </div>
              )}
            </motion.div> */}

            {resource?.cloudinaryUrl && (
            <div className="mt-6">
              {resource.fileType === "image" && (
                <Image src={resource.cloudinaryUrl} alt={resource.name} width={600} height={400} />
              )}
              {resource.fileType === "audio" && (
                <audio controls className="w-full">
                  <source src={resource.cloudinaryUrl} type="audio/mpeg" />
                  Tu navegador no soporta el elemento de audio.
                </audio>
              )}
              {resource.fileType === "video" && (
                <video controls className="w-full">
                  <source src={resource.cloudinaryUrl} type="video/mp4" />
                  Tu navegador no soporta el video.
                </video>
              )}
              {resource.fileType === 'document' && (
                <div className="w-full flex justify-center">
                  <Document
                    file={resource.cloudinaryUrl}
                    onLoadError={(error) => console.error('Error al cargar PDF:', error)}
                    loading={<p>Cargando documento...</p>}
                    error={<p>No se pudo cargar el PDF.</p>}
                  >
                    <Page pageNumber={1} />
                  </Document>
                </div>
              )}
            </div>
          )}

            <motion.p className="text-lg leading-relaxed text-muted-foreground" variants={itemVariants}>
              {res.description || "Sin descripción disponible"}
            </motion.p>

            {/* {res.content && (
              <motion.div
                className="prose mt-6 max-w-none dark:prose-invert"
                variants={itemVariants}
                dangerouslySetInnerHTML={{ __html: res.content }}
              />
            )} */}
          </CardContent>

          <CardFooter className="flex justify-between border-t p-6">
            <Button variant="outline" asChild>
              <Link href="/home">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Volver
              </Link>
            </Button>
            {/* <Button>Guardar recurso</Button> */}
          </CardFooter>
        </Card>
      </motion.div>
    )
  }

  return staticCard ? renderStatic() : renderResource()
}
