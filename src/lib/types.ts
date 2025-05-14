export enum FileType {
  DOCUMENT = "DOCUMENT",
  IMAGE = "IMAGE",
  AUDIO = "AUDIO",
  VIDEO = "VIDEO",
  OTHER = "OTHER",
}

export enum FileExtension {
  JPG = "JPG",
  JPEG = "JPEG",
  PNG = "PNG",
  WEBP = "WEBP",
  PDF = "PDF",
  DOCX = "DOCX",
  MP4 = "MP4",
  MOV = "MOV",
  MP3 = "MP3",
  WAV = "WAV",
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
