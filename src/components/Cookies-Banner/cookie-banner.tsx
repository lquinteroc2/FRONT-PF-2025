"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Cookie, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [userActivity, setUserActivity] = useState(0)

  // Comprobar si el usuario ya ha tomado una decisión sobre las cookies
  useEffect(() => {
    const cookiesDecision = localStorage.getItem("cookies-decision")

    if (!cookiesDecision) {
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [])

  // Función para aceptar cookies implícitamente
  const acceptCookiesImplicitly = useCallback(() => {
    localStorage.setItem("cookies-decision", "accepted-implicitly")
    localStorage.setItem("cookies-accepted", "true")
    setIsVisible(false)
  }, [])

  // Detectar actividad del usuario para aceptación implícita
  useEffect(() => {
    if (!isVisible) return

    let activityCount = 0
    let timeOnPage = 0

    // Incrementar contador cada 5 segundos que el usuario esté en la página
    const timeInterval = setInterval(() => {
      timeOnPage += 5
      // Después de 30 segundos, considerar como aceptación implícita
      if (timeOnPage >= 30) {
        acceptCookiesImplicitly()
      }
    }, 5000)

    // Detectar interacciones del usuario
    const handleUserActivity = () => {
      activityCount++
      setUserActivity(activityCount)

      // Después de 3 interacciones (scroll, click, etc.), aceptar implícitamente
      if (activityCount >= 6) {
        acceptCookiesImplicitly()
      }
    }

    // Detectar scroll
    const handleScroll = () => {
      if (window.scrollY > 100) {
        // Solo contar si hace scroll significativo
        handleUserActivity()
      }
    }

    // Detectar clics en cualquier parte de la página (excepto el banner)
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const banner = document.getElementById("cookie-banner")

      // Solo contar clics fuera del banner de cookies
      if (banner && !banner.contains(target)) {
        handleUserActivity()
      }
    }

    // Detectar navegación a otras páginas
    const handleBeforeUnload = () => {
      handleUserActivity()
    }

    // Agregar event listeners
    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("click", handleClick)
    window.addEventListener("beforeunload", handleBeforeUnload)

    return () => {
      clearInterval(timeInterval)
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("click", handleClick)
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [isVisible, acceptCookiesImplicitly])

  const acceptCookies = () => {
    localStorage.setItem("cookies-decision", "accepted-explicitly")
    localStorage.setItem("cookies-accepted", "true")
    setIsVisible(false)
  }

  const declineCookies = () => {
    localStorage.setItem("cookies-decision", "declined")
    localStorage.setItem("cookies-accepted", "essential-only")
    setIsVisible(false)
  }

  const dismissBanner = () => {
    // Cerrar temporalmente, pero la navegación continuada seguirá siendo detectada
    setIsVisible(false)

    // Volver a mostrar después de 2 minutos si no hay actividad que indique aceptación
    setTimeout(
      () => {
        const cookiesDecision = localStorage.getItem("cookies-decision")
        if (!cookiesDecision) {
          setIsVisible(true)
        }
      },
      2 * 60 * 1000,
    ) // 2 minutos
  }

  if (!isVisible) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          id="cookie-banner"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-lg border-t border-gray-200"
        >
          <div className="container mx-auto px-4 py-4 md:py-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-teal-100 p-2 flex-shrink-0 mt-1">
                  <Cookie className="h-5 w-5 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Utilizamos cookies</h3>
                  <p className="text-sm text-gray-600 mt-1 max-w-2xl">
                    Utilizamos cookies para mejorar tu experiencia, analizar el tráfico y personalizar el contenido.
                    <strong className="text-gray-800">
                      {" "}
                      Si continúas navegando por nuestra página, entenderemos que aceptas el uso de todas las cookies.
                    </strong>
                  </p>
                  <div className="mt-2 flex flex-wrap gap-4">
                    <Link href="/cookies" className="text-sm text-teal-600 hover:text-teal-700 font-medium">
                      Más información
                    </Link>
                    {userActivity > 0 && (
                      <span className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
                        Actividad detectada ({userActivity}/3)
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 md:flex-nowrap">
                <Button onClick={acceptCookies} className="bg-teal-600 hover:bg-teal-700 min-w-[120px]">
                  Aceptar todas
                </Button>
                <Button onClick={declineCookies} variant="outline" className="min-w-[120px]">
                  Solo esenciales
                </Button>
                <Button
                  onClick={dismissBanner}
                  variant="ghost"
                  size="icon"
                  className="flex-shrink-0"
                  title="Cerrar temporalmente"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
