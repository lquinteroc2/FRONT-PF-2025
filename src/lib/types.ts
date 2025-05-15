export enum FileType {
  DOCUMENT = "document",
  IMAGE = "image",
  AUDIO = "audio",
  VIDEO = "video",
  OTHER = "other",
}

export enum FileExtension {
  JPG = "jpg",
  JPEG = "jpeg",
  PNG = "png",
  WEBP = "webp",
  PDF = "pdf",
  DOCX = "docx",
  MP4 = "mp4",
  MOV = "mov",
  MP3 = "mp3",
  WAV = "wav",
}

// Interfaces
export interface User {
  id: string
  name: string
  email: string
  role: string
  status: "active" | "inactive"
  avatar?: string
  createdAt: string
}

export interface Resource {
  id: string
  name: string
  fileType: FileType
  fileExtension: FileExtension
  cloudinaryUrl: string
  description: string | null
  uploadedBy: {
    id: string
    name: string
  }
  createdAt: string
  updatedAt: string
}

export interface HelpCenter {
  id: string
  name: string
  address: string
  phone: string
  email: string
  description: string
  image?: string
}

export interface Emotion {
  id: string
  name: string
  description: string
  category: string
  icon: string
  color: string
}
