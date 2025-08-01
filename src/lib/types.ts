import { FormEvent } from "react"

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

export enum UserRole {
  FREE = "free",
  PREMIUM = "premium",
  ADMIN = "admin",
}

// Interfaces
export interface Subscription {
  active: boolean;
  isTrial: boolean;
  startDate: string;
  endDate: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  profileImage?: string | File;
  address?: string;
  role: string;
  status: "Activo" | "Inactivo";
  createdAt?: string;
  subscriptions?: Subscription[];  
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
  thumbnailUrl?: string;
  thumbnailPublicId?: string;
  showInCardList: boolean;
  showInSection: boolean;
  section: FileType;
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

export interface ILoginFormData {
    email: string;
    password: string;
};

export interface ILoginFormDto {
    token: string;
    user: User;
};


export interface IUserDto {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    address?: string;
    profileImage?: string;
}

export type ResourceFormData = {
  name: string
  fileType: string
  fileExtension: string
  description: string
  files?: File | null
  thumbnailFile?: File | null
}

export type ResourceFormProps = {
  data: ResourceFormData
  onChange: (field: keyof ResourceFormData, value: string | File | null) => void
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
  isSubmitting?: boolean
}


export type Props = {
  resource: Resource
  onClose: () => void
}


export interface HelpCenterData {
  id: string
  name: string
  description: string
  contact: string
  category: string
  address: string
  city: string
  country: string
  coordinates: {
    type: "Point"
    coordinates: [number, number] // [longitude, latitude]
  }
  createdAt: Date
  updatedAt: Date
}
