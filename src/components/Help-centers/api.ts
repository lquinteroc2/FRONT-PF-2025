

// Mock data for demonstration purposes

import { HelpCenterData } from "@/lib/types"

// In a real application, this would be fetched from an API
const mockHelpCenters: HelpCenterData[] = [
  {
    id: "1",
    name: "Centro de Ayuda Comunitario",
    description:
      "Centro de ayuda para personas en situación de vulnerabilidad. Ofrecemos alimentos, ropa y asistencia médica básica.",
    contact: "+1234567890",
    category: "Asistencia Social",
    address: "Calle Principal 123",
    city: "Madrid",
    country: "España",
    coordinates: {
      type: "Point",
      coordinates: [-3.7038, 40.4168],
    },
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2023-06-20"),
  },
  {
    id: "2",
    name: "Centro Médico San Juan",
    description:
      "Centro médico con servicios gratuitos para personas sin seguro médico. Especialidades: medicina general, pediatría y ginecología.",
    contact: "+1987654321",
    category: "Salud",
    address: "Avenida Salud 456",
    city: "Barcelona",
    country: "España",
    coordinates: {
      type: "Point",
      coordinates: [2.1734, 41.3851],
    },
    createdAt: new Date("2022-11-05"),
    updatedAt: new Date("2023-07-12"),
  },
  {
    id: "3",
    name: "Refugio Esperanza",
    description: "Refugio temporal para personas sin hogar. Ofrecemos cama, comida y servicios de higiene personal.",
    contact: "+1122334455",
    category: "Albergue",
    address: "Calle Refugio 789",
    city: "Valencia",
    country: "España",
    coordinates: {
      type: "Point",
      coordinates: [-0.3763, 39.4699],
    },
    createdAt: new Date("2023-02-28"),
    updatedAt: new Date("2023-05-15"),
  },
  {
    id: "4",
    name: "Centro de Apoyo Psicológico",
    description: "Servicios de apoyo psicológico gratuito para personas en situación de crisis emocional o mental.",
    contact: "+1555666777",
    category: "Salud Mental",
    address: "Avenida Mente 101",
    city: "Sevilla",
    country: "España",
    coordinates: {
      type: "Point",
      coordinates: [-5.9845, 37.3891],
    },
    createdAt: new Date("2022-09-10"),
    updatedAt: new Date("2023-08-01"),
  },
  {
    id: "5",
    name: "Comedor Social Las Flores",
    description: "Comedor social que ofrece desayuno, almuerzo y cena a personas sin recursos económicos.",
    contact: "+1999888777",
    category: "Alimentación",
    address: "Plaza Mayor 22",
    city: "Málaga",
    country: "España",
    coordinates: {
      type: "Point",
      coordinates: [-4.4214, 36.7213],
    },
    createdAt: new Date("2023-03-15"),
    updatedAt: new Date("2023-07-30"),
  },
  {
    id: "6",
    name: "Centro de Formación Laboral",
    description: "Centro que ofrece cursos gratuitos de formación laboral para personas desempleadas.",
    contact: "+1777888999",
    category: "Educación",
    address: "Calle Formación 55",
    city: "Bilbao",
    country: "España",
    coordinates: {
      type: "Point",
      coordinates: [-2.935, 43.263],
    },
    createdAt: new Date("2022-12-01"),
    updatedAt: new Date("2023-06-10"),
  },
  {
    id: "7",
    name: "Asesoría Legal Gratuita",
    description: "Servicio de asesoría legal gratuita para personas con bajos recursos económicos.",
    contact: "+1444555666",
    category: "Legal",
    address: "Avenida Justicia 77",
    city: "Zaragoza",
    country: "España",
    coordinates: {
      type: "Point",
      coordinates: [-0.889, 41.6488],
    },
    createdAt: new Date("2023-01-20"),
    updatedAt: new Date("2023-08-05"),
  },
  {
    id: "8",
    name: "Centro de Ayuda a Migrantes",
    description:
      "Centro especializado en ayuda a personas migrantes y refugiadas. Ofrecemos orientación legal, cursos de idiomas y apoyo en trámites administrativos.",
    contact: "+1333222111",
    category: "Migración",
    address: "Calle Nueva Vida 33",
    city: "Murcia",
    country: "España",
    coordinates: {
      type: "Point",
      coordinates: [-1.1307, 37.9922],
    },
    createdAt: new Date("2022-10-15"),
    updatedAt: new Date("2023-07-25"),
  },
]

// Simulate API call with a delay
// export async function fetchHelpCentersMock(): Promise<HelpCenterData[]> {
 // Simulate network delay
//   await new Promise((resolve) => setTimeout(resolve, 1000))

//   return mockHelpCenters
// }

type FetchOptions = {
  category?: string
  lat?: number
  lng?: number
  radius?: number
}

export async function fetchHelpCenters(options?: FetchOptions): Promise<HelpCenterData[]> {
  try {
    const params = new URLSearchParams();

    if (options?.lat) params.append('lat', options.lat.toString());
    if (options?.lng) params.append('lng', options.lng.toString());
    if (options?.radius) params.append('radius', options.radius.toString());
    if (options?.category) params.append('category', options.category);

    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/helppoints?${params.toString()}`;
    const res = await fetch(endpoint);

    if (!res.ok) throw new Error("Failed to fetch helppoints from backend");

    const data: HelpCenterData[] = await res.json();
    return data;
  } catch (error) {
    console.warn("Falling back to mock help centers:", error);
    return mockHelpCenters;
  }
}
