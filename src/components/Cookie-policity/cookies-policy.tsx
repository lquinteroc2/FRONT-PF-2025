"use client"

import { motion } from "framer-motion"
import { Calendar, Cookie, Shield, Settings, Info, CheckCircle, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CookiesPolicy() {
  const lastUpdated = "15 de enero de 2024"

  const cookieTypes = [
    {
      name: "Cookies Esenciales",
      description: "Necesarias para el funcionamiento básico del sitio. No pueden ser desactivadas.",
      examples: ["Sesión de usuario", "Seguridad", "Preferencias básicas"],
      required: true,
      icon: Shield,
    },
    {
      name: "Cookies Funcionales",
      description: "Mejoran la experiencia del usuario recordando sus preferencias y configuraciones.",
      examples: ["Idioma seleccionado", "Tema oscuro/claro", "Tamaño de texto"],
      required: false,
      icon: Settings,
    },
    {
      name: "Cookies Analíticas",
      description: "Nos ayudan a entender cómo interactúas con el sitio para mejorar su rendimiento.",
      examples: ["Páginas visitadas", "Tiempo en el sitio", "Errores encontrados"],
      required: false,
      icon: Info,
    },
    {
      name: "Cookies de Marketing",
      description: "Utilizadas para mostrarte contenido relevante y personalizado.",
      examples: ["Recomendaciones personalizadas", "Anuncios relevantes"],
      required: false,
      icon: Cookie,
    },
  ]

  const cookieManagementSteps = [
    {
      browser: "Google Chrome",
      steps: "Menú > Configuración > Privacidad y seguridad > Cookies y otros datos de sitios",
    },
    {
      browser: "Mozilla Firefox",
      steps: "Menú > Opciones > Privacidad & Seguridad > Cookies y datos del sitio",
    },
    {
      browser: "Safari",
      steps: "Preferencias > Privacidad > Cookies y datos del sitio web",
    },
    {
      browser: "Microsoft Edge",
      steps: "Menú > Configuración > Cookies y permisos del sitio",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white font-[family-name:var(--font-geist-sans)]">
      {/* Header */}
      <section className="bg-gradient-to-r from-teal-600 to-blue-600 py-16 text-white md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-4xl text-center"
          >
            <div className="mb-6 flex justify-center">
              <div className="rounded-full bg-white/20 p-4">
                <Cookie className="h-12 w-12" />
              </div>
            </div>
            <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">Política de Cookies</h1>
            <p className="mb-6 text-lg opacity-90 md:text-xl">
              Cómo utilizamos las cookies para mejorar tu experiencia en Séntia
            </p>
            <div className="flex items-center justify-center gap-2 text-sm opacity-80">
              <Calendar className="h-4 w-4" />
              <span>Última actualización: {lastUpdated}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Introducción */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto max-w-4xl"
          >
            <div className="rounded-lg bg-white p-8 shadow-sm">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">¿Qué son las cookies?</h2>
              <p className="mb-4 text-gray-700 leading-relaxed">
                Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo (computadora, teléfono
                móvil o tablet) cuando visitas un sitio web. Estas cookies nos ayudan a hacer que Séntia funcione
                correctamente, hacer que el sitio sea más seguro, brindar una mejor experiencia de usuario, entender
                cómo se utiliza el sitio y mejorar nuestros servicios.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Esta política explica cómo utilizamos las cookies, qué tipos de cookies utilizamos y cómo puedes
                controlar su uso. Nuestra Política de Cookies complementa nuestra{" "}
                <Link href="/privacidad" className="text-teal-600 hover:text-teal-700 underline">
                  Política de Privacidad
                </Link>
                , que explica cómo utilizamos toda tu información personal.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tipos de Cookies */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mx-auto max-w-4xl"
          >
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">Tipos de Cookies que Utilizamos</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {cookieTypes.map((type, index) => (
                <motion.div
                  key={type.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="rounded-lg bg-white p-6 shadow-sm"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div className="rounded-full bg-teal-100 p-2">
                      <type.icon className="h-5 w-5 text-teal-600" />
                    </div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-semibold text-gray-900">{type.name}</h3>
                      {type.required ? (
                        <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">
                          Requeridas
                        </span>
                      ) : (
                        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800">
                          Opcionales
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="mb-3 text-gray-700">{type.description}</p>
                  <div className="mb-2 text-sm font-medium text-gray-700">Ejemplos:</div>
                  <ul className="space-y-1">
                    {type.examples.map((example, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="h-1.5 w-1.5 rounded-full bg-teal-500"></div>
                        {example}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cómo utilizamos las cookies */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mx-auto max-w-4xl"
          >
            <div className="rounded-lg bg-white p-8 shadow-sm">
              <h2 className="mb-6 text-2xl font-bold text-gray-900">Cómo Utilizamos las Cookies</h2>

              <div className="mb-6 space-y-4">
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-800">Mejora de la experiencia del usuario</h3>
                  <p className="text-gray-700">
                    Utilizamos cookies para recordar tus preferencias y proporcionar funciones personalizadas. Por
                    ejemplo, podemos usar cookies para recordar tu idioma preferido, el tema visual que has seleccionado
                    o tus preferencias de notificaciones.
                  </p>
                </div>

                <div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-800">Análisis y rendimiento</h3>
                  <p className="text-gray-700">
                    Utilizamos cookies para recopilar información sobre cómo interactúas con nuestro sitio. Esto nos
                    ayuda a mejorar la forma en que funciona Séntia, por ejemplo, asegurándonos de que los usuarios
                    puedan encontrar fácilmente lo que están buscando.
                  </p>
                </div>

                <div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-800">Seguridad</h3>
                  <p className="text-gray-700">
                    Utilizamos cookies por razones de seguridad, como para identificar y prevenir fraudes o actividades
                    maliciosas, y para proteger los datos de nuestros usuarios.
                  </p>
                </div>

                <div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-800">Contenido personalizado</h3>
                  <p className="text-gray-700">
                    Podemos utilizar cookies para personalizar el contenido que ves en Séntia, como recomendaciones de
                    recursos o ejercicios basados en tus interacciones previas con la plataforma.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gestión de Cookies */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mx-auto max-w-4xl"
          >
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
              Gestión de tus Preferencias de Cookies
            </h2>

            <div className="mb-8 rounded-lg bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-xl font-semibold text-gray-900">Desde tu navegador</h3>
              <p className="mb-4 text-gray-700">
                La mayoría de los navegadores web te permiten controlar las cookies a través de sus opciones de
                configuración. Limitar el uso de cookies puede afectar tu experiencia en nuestro sitio.
              </p>

              <div className="space-y-4">
                {cookieManagementSteps.map((item, index) => (
                  <div key={index} className="rounded-lg border border-gray-200 p-4">
                    <h4 className="mb-2 font-medium text-gray-900">{item.browser}</h4>
                    <p className="text-sm text-gray-700">{item.steps}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-xl font-semibold text-gray-900">Desde nuestro sitio</h3>
              <p className="mb-4 text-gray-700">
                Puedes ajustar tus preferencias de cookies en cualquier momento utilizando nuestro panel de
                configuración:
              </p>

              <div className="mb-6 space-y-4">
                {cookieTypes.map((type, index) => (
                  <div key={index} className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
                    <div className="flex items-center gap-3">
                      <type.icon className="h-5 w-5 text-gray-600" />
                      <div>
                        <h4 className="font-medium text-gray-900">{type.name}</h4>
                        <p className="text-sm text-gray-600">{type.examples[0]}</p>
                      </div>
                    </div>
                    {type.required ? (
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <CheckCircle className="h-4 w-4" />
                        <span>Siempre activas</span>
                      </div>
                    ) : (
                      <Button variant="outline" size="sm" className="min-w-[100px]">
                        Configurar
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Button className="bg-teal-600 hover:bg-teal-700">Aceptar todas</Button>
                <Button variant="outline">Solo esenciales</Button>
                <Button variant="ghost">Personalizar</Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Información adicional */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mx-auto max-w-4xl"
          >
            <div className="rounded-lg bg-white p-8 shadow-sm">
              <h2 className="mb-6 text-2xl font-bold text-gray-900">Información Adicional</h2>

              <div className="mb-6 space-y-6">
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-800">Cookies de terceros</h3>
                  <p className="text-gray-700">
                    Algunos de nuestros socios pueden establecer cookies en tu dispositivo cuando visitas nuestro sitio.
                    Estos socios incluyen proveedores de análisis y redes sociales. No tenemos control sobre estas
                    cookies de terceros, por lo que te recomendamos revisar las políticas de privacidad de estos
                    terceros para obtener más información.
                  </p>
                </div>

                <div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-800">Duración de las cookies</h3>
                  <p className="text-gray-700">
                    Las cookies de sesión son temporales y se eliminan cuando cierras tu navegador. Las cookies
                    persistentes permanecen en tu dispositivo hasta que expiran o las eliminas manualmente. La duración
                    de las cookies persistentes varía según su propósito.
                  </p>
                </div>

                <div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-800">Actualizaciones a esta política</h3>
                  <p className="text-gray-700">
                    Podemos actualizar esta Política de Cookies periódicamente para reflejar cambios en nuestras
                    prácticas o por otros motivos operativos, legales o regulatorios. Te recomendamos revisar esta
                    política regularmente para estar informado sobre cómo utilizamos las cookies.
                  </p>
                </div>
              </div>

              <div className="rounded-lg bg-yellow-50 p-4 border border-yellow-200">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-800 mb-1">Importante</h4>
                    <p className="text-sm text-yellow-700">
                      Bloquear ciertas cookies puede afectar la funcionalidad de nuestro sitio y limitar tu capacidad
                      para utilizar determinadas características. Las cookies esenciales no pueden ser deshabilitadas ya
                      que son necesarias para el funcionamiento básico del sitio.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mx-auto max-w-4xl text-center"
          >
            <div className="rounded-2xl bg-gradient-to-r from-teal-600 to-blue-600 p-8 text-white">
              <h2 className="mb-4 text-2xl font-bold md:text-3xl">¿Tienes preguntas sobre nuestras cookies?</h2>
              <p className="mb-6 opacity-90">
                Si tienes alguna pregunta sobre cómo utilizamos las cookies o sobre esta política, no dudes en
                contactarnos.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Button className="rounded-full bg-white px-6 py-3 font-semibold text-teal-600 transition-all hover:bg-gray-100">
                  Contactar Soporte
                </Button>
                <Link href="/privacidad">
                  <Button
                    variant="outline"
                    className="rounded-full border-2 border-white px-6 py-3 font-semibold text-white transition-all hover:bg-white hover:text-teal-600"
                  >
                    Ver Política de Privacidad
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
