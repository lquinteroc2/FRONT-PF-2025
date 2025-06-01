"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FileAudio, FileText, ImageIcon, Video } from "lucide-react"
import { useEffect, useState } from "react"
import { getLast5Resource } from "./resources-helper"
import { Resource } from "@/lib/types"

export function RecentResources() {
  const [resources, setResources] =  useState<Partial<Resource>[]>([])

const getFileIcon = (fileType: string) => {
  switch (fileType.toUpperCase()) {
    case "AUDIO":
      return <FileAudio className="h-4 w-4" />
    case "DOCUMENT":
      return <FileText className="h-4 w-4" />
    case "VIDEO":
      return <Video className="h-4 w-4" />
    case "IMAGE":
      return <ImageIcon className="h-4 w-4" />
    default:
      return <FileText className="h-4 w-4" />
  }
}


  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("es-ES", {
      day: "numeric",
      month: "short",
    }).format(date)
  }
   
  useEffect(() => {
  const fetchResources = async () => {
    try {
      const data = await getLast5Resource()
      console.log("📦 Recursos obtenidos:", data) // <- log del cliente
      setResources(data)
    } catch (error) {
      console.error("❌ Error fetching resources:", error)
    }
  }

  fetchResources()
}, [])


  return (
    <div className="space-y-8">
{resources.map((resource) => (
  <div key={resource.id} className="flex items-center">
    <Avatar className="h-9 w-9 mr-3">
      <AvatarImage
        src={resource.thumbnailUrl || "/placeholder.svg"}
        alt={resource.name}
      />
     <AvatarFallback>{resource.name ? resource.name.charAt(0) : "S"}</AvatarFallback>
    </Avatar>
    <div className="space-y-1 flex-1 min-w-0">
      <p className="text-sm font-medium leading-none truncate">
        {resource.name}
      </p>
      <p className="text-sm text-muted-foreground flex items-center">
        {getFileIcon(resource.fileType ?? "document")}  
        <span className="ml-1">{(resource.fileType ?? "document").toLowerCase()}</span> 
      </p>
    </div>
    <div className="ml-auto text-xs text-muted-foreground">
      {resource.createdAt ? formatDate(resource.createdAt) : "fecha no disponible"}
    </div>
  </div>
))}

    </div>
  )
}
