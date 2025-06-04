"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Info } from "lucide-react"
import { useState } from "react"
import HelpCenterDetail from "./help-center-detail"
import { HelpCenterData } from "@/lib/types"

interface HelpCentersListProps {
  centers: HelpCenterData[]
}

export default function HelpCentersList({ centers }: HelpCentersListProps) {
  const [selectedCenter, setSelectedCenter] = useState<HelpCenterData | null>(null)

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <>
      {centers.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">No se encontraron centros de ayuda</h3>
          <p className="text-muted-foreground mt-2">Intenta con otra búsqueda</p>
        </div>
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {centers.map((center) => (
            <motion.div key={center.id} variants={item}>
              <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{center.name}</CardTitle>
                    <Badge>{center.category}</Badge>
                  </div>
                  <CardDescription className="flex items-center gap-1 mt-1">
                    <MapPin className="h-3 w-3" />
                    <span>
                      {center.city}, {center.country}
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground line-clamp-3">{center.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" onClick={() => setSelectedCenter(center)}>
                    <Info className="h-4 w-4 mr-2" />
                    Detalles
                  </Button>
                  {/* <Button variant="ghost" size="sm" asChild>
                    <a href={`tel:${center.contact}`}>
                      <Phone className="h-4 w-4 mr-2" />
                      Contactar
                    </a>
                  </Button> */}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}

      <HelpCenterDetail center={selectedCenter} isOpen={!!selectedCenter} onClose={() => setSelectedCenter(null)} />
    </>
  )
}
