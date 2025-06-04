import CookiesPolicy from "@/components/Cookie-policity/cookies-policy"

export const metadata = {
  title: "Política de Cookies - Séntia",
  description: "Información sobre cómo utilizamos las cookies en la plataforma Séntia para mejorar tu experiencia.",
}

export default function CookiesPage() {
  return (
    <div className="min-h-screen">
      <CookiesPolicy />
    </div>
  )
}
