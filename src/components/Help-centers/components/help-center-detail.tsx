"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Calendar } from "lucide-react"
import dynamic from "next/dynamic"
import { HelpCenterData } from "@/lib/types"

// Dynamically import the map component to avoid SSR issues
const DetailMap = dynamic(() => import("./detail-map"), { ssr: false })

interface HelpCenterDetailProps {
  center: HelpCenterData | null
  isOpen: boolean
  onClose: () => void
}

export default function HelpCenterDetail({ center, isOpen, onClose }: HelpCenterDetailProps) {
  if (!center) return null

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("es", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(date))
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto z-[9999]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>{center.name}</DialogTitle>
            <Badge>{center.category}</Badge>
          </div>
          <DialogDescription className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            <span>
              {center.address}, {center.city}, {center.country}
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="h-[200px] w-full rounded-md overflow-hidden mb-4">
          <DetailMap center={center} />
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-1">Descripción</h4>
            <p className="text-sm text-muted-foreground">{center.description}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Contacto</p>
                <p className="text-sm text-muted-foreground">{center.contact}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Registrado</p>
                <p className="text-sm text-muted-foreground">{formatDate(center.createdAt)}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cerrar
            </Button>
            <Button asChild>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${center.coordinates.coordinates[1]},${center.coordinates.coordinates[0]}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Cómo llegar
              </a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
