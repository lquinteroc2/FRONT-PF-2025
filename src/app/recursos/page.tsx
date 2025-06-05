import ResourcesPageView from "@/components/Recursos/resourcesPageView"

export const metadata = {
  title: "Recursos - Séntia",
  description: "Descubre herramientas, contenido y productos para tu bienestar emocional.",
}

export default function RecursosPage() {
  return (
    <div className="min-h-screen">
      <ResourcesPageView />
    </div>
  )
}
