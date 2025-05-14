"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FileAudio, FileText, ImageIcon, Video } from "lucide-react"

export function RecentResources() {
  const resources = [
    {
      id: "1",
      name: "Meditación guiada",
      fileType: "AUDIO",
      fileExtension: "MP3",
      uploadedBy: {
        name: "Carlos Mendez",
        email: "carlos@example.com",
        avatar: "/placeholder-user.jpg",
        initials: "CM",
      },
      createdAt: "2023-05-12T10:00:00Z",
    },
    {
      id: "2",
      name: "Guía de ejercicios",
      fileType: "DOCUMENT",
      fileExtension: "PDF",
      uploadedBy: {
        name: "Ana López",
        email: "ana@example.com",
        avatar: "/placeholder-user.jpg",
        initials: "AL",
      },
      createdAt: "2023-05-11T14:30:00Z",
    },
    {
      id: "3",
      name: "Tutorial de respiración",
      fileType: "VIDEO",
      fileExtension: "MP4",
      uploadedBy: {
        name: "Miguel Torres",
        email: "miguel@example.com",
        avatar: "/placeholder-user.jpg",
        initials: "MT",
      },
      createdAt: "2023-05-10T09:15:00Z",
    },
    {
      id: "4",
      name: "Música relajante",
      fileType: "AUDIO",
      fileExtension: "MP3",
      uploadedBy: {
        name: "Laura Sánchez",
        email: "laura@example.com",
        avatar: "/placeholder-user.jpg",
        initials: "LS",
      },
      createdAt: "2023-05-09T16:45:00Z",
    },
    {
      id: "5",
      name: "Infografía de emociones",
      fileType: "IMAGE",
      fileExtension: "PNG",
      uploadedBy: {
        name: "David Ruiz",
        email: "david@example.com",
        avatar: "/placeholder-user.jpg",
        initials: "DR",
      },
      createdAt: "2023-05-08T11:20:00Z",
    },
  ]

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
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

  return (
    <div className="space-y-8">
      {resources.map((resource) => (
        <div key={resource.id} className="flex items-center">
          <Avatar className="h-9 w-9 mr-3">
            <AvatarImage src={resource.uploadedBy.avatar || "/placeholder.svg"} alt={resource.uploadedBy.name} />
            <AvatarFallback>{resource.uploadedBy.initials}</AvatarFallback>
          </Avatar>
          <div className="space-y-1 flex-1 min-w-0">
            <p className="text-sm font-medium leading-none truncate">{resource.name}</p>
            <p className="text-sm text-muted-foreground flex items-center">
              {getFileIcon(resource.fileType)}
              <span className="ml-1">{resource.fileExtension.toLowerCase()}</span>
            </p>
          </div>
          <div className="ml-auto text-xs text-muted-foreground">{formatDate(resource.createdAt)}</div>
        </div>
      ))}
    </div>
  )
}
