"use client";

import { motion } from "framer-motion";
import { Calendar, Shield, FileText, AlertTriangle } from "lucide-react";

export default function TermsOfService() {
  const lastUpdated = "15 de enero de 2024";

  const sections = [
    {
      id: "acceptance",
      title: "1. Aceptación de los Términos",
      content: `Al acceder y utilizar Séntia, usted acepta estar sujeto a estos Términos de Uso y todas las leyes y regulaciones aplicables. Si no está de acuerdo con alguno de estos términos, no debe utilizar este servicio.`,
    },
    {
      id: "service-description",
      title: "2. Descripción del Servicio",
      content: `Séntia es una plataforma digital que proporciona herramientas para el registro del estado emocional, recursos de salud mental y conexión con grupos de apoyo. Nuestro servicio NO constituye asesoramiento médico, psicológico o terapéutico profesional.`,
    },
    {
      id: "user-accounts",
      title: "3. Cuentas de Usuario",
      content: `Para utilizar ciertas funciones de Séntia, debe crear una cuenta proporcionando información precisa y completa. Usted es responsable de mantener la confidencialidad de su cuenta y contraseña, y de todas las actividades que ocurran bajo su cuenta.`,
    },
    {
      id: "acceptable-use",
      title: "4. Uso Aceptable",
      content: `Usted se compromete a utilizar Séntia únicamente para fines legales y de acuerdo con estos términos. Está prohibido: (a) usar el servicio para cualquier propósito ilegal, (b) intentar obtener acceso no autorizado a nuestros sistemas, (c) interferir con el funcionamiento del servicio, (d) compartir contenido ofensivo, discriminatorio o dañino.`,
    },
    {
      id: "health-disclaimer",
      title: "5. Descargo de Responsabilidad Médica",
      content: `IMPORTANTE: Séntia NO es un sustituto de la atención médica profesional. Si experimenta una crisis de salud mental o pensamientos de autolesión, busque ayuda profesional inmediatamente. En caso de emergencia, contacte los servicios de emergencia locales o líneas de crisis.`,
    },
    {
      id: "privacy",
      title: "6. Privacidad y Protección de Datos",
      content: `Su privacidad es fundamental para nosotros. El tratamiento de sus datos personales se rige por nuestra Política de Privacidad, que forma parte integral de estos términos. Implementamos medidas de seguridad técnicas y organizativas para proteger su información.`,
    },
    {
      id: "intellectual-property",
      title: "7. Propiedad Intelectual",
      content: `Todo el contenido de Séntia, incluyendo textos, gráficos, logotipos, iconos, imágenes, clips de audio, descargas digitales y software, es propiedad de Séntia o sus proveedores de contenido y está protegido por las leyes de derechos de autor.`,
    },
    {
      id: "limitation-liability",
      title: "8. Limitación de Responsabilidad",
      content: `Séntia se proporciona "tal como está" sin garantías de ningún tipo. No seremos responsables de daños directos, indirectos, incidentales, especiales o consecuentes que resulten del uso o la imposibilidad de usar nuestro servicio.`,
    },
    {
      id: "modifications",
      title: "9. Modificaciones de los Términos",
      content: `Nos reservamos el derecho de modificar estos términos en cualquier momento. Las modificaciones entrarán en vigor inmediatamente después de su publicación en la plataforma. Su uso continuado del servicio constituye la aceptación de los términos modificados.`,
    },
    {
      id: "termination",
      title: "10. Terminación",
      content: `Podemos suspender o terminar su acceso a Séntia en cualquier momento, con o sin causa, con o sin previo aviso. Usted puede terminar su cuenta en cualquier momento contactándonos o utilizando las opciones disponibles en su perfil.`,
    },
    {
      id: "governing-law",
      title: "11. Ley Aplicable",
      content: `Estos términos se rigen por las leyes del país donde opera Séntia. Cualquier disputa relacionada con estos términos será resuelta en los tribunales competentes de dicha jurisdicción.`,
    },
    {
      id: "contact",
      title: "12. Contacto",
      content: `Si tiene preguntas sobre estos Términos de Uso, puede contactarnos en: legal@sentia.com o a través de nuestro formulario de contacto en la plataforma.`,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white font-[family-name:var(--font-geist-sans)]">
      {/* Header */}
      <section className="bg-gradient-to-r from-teal-600 to-secondary py-16 text-white md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-4xl text-center"
          >
            <div className="mb-6 flex justify-center">
              <div className="rounded-full bg-white/20 p-4">
                <FileText className="h-12 w-12" />
              </div>
            </div>
            <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">
              Términos de Uso
            </h1>
            <p className="mb-6 text-lg opacity-90 md:text-xl">
              Condiciones que rigen el uso de la plataforma Séntia
            </p>
            <div className="flex items-center justify-center gap-2 text-sm opacity-80">
              <Calendar className="h-4 w-4" />
              <span>Última actualización: {lastUpdated}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto max-w-4xl"
          >
            <div className="rounded-lg border-l-4 border-amber-500 bg-amber-50 p-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-amber-800 mb-2">
                    Aviso Importante
                  </h3>
                  <p className="text-amber-700 text-sm leading-relaxed">
                    Séntia es una herramienta de apoyo y no reemplaza la
                    atención médica profesional. Si está experimentando una
                    crisis de salud mental, busque ayuda profesional
                    inmediatamente.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto max-w-4xl"
          >
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-semibold text-gray-900">
                Índice de Contenidos
              </h2>
              <div className="grid gap-2 md:grid-cols-2">
                {sections.map((section, index) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="block rounded-md px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-teal-50 hover:text-teal-700"
                  >
                    {section.title}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                id={section.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="mb-12 scroll-mt-24"
              >
                <div className="rounded-lg bg-white p-8 shadow-sm border border-gray-100">
                  <h2 className="mb-4 text-2xl font-bold text-gray-900">
                    {section.title}
                  </h2>
                  <div className="prose prose-gray max-w-none">
                    <p className="leading-relaxed text-gray-700">
                      {section.content}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Resources */}
      <section className="bg-red-50 py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mx-auto max-w-4xl"
          >
            <div className="rounded-lg bg-white p-8 shadow-sm border border-red-200">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-red-100 p-3 flex-shrink-0">
                  <Shield className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h2 className="mb-4 text-2xl font-bold text-red-900">
                    Recursos de Emergencia
                  </h2>
                  <div className="space-y-3 text-gray-700">
                    <p>
                      <strong>En caso de emergencia psiquiátrica:</strong>{" "}
                      Contacte inmediatamente al 911 o acuda al servicio de
                      urgencias más cercano.
                    </p>
                    <p>
                      <strong>
                        Línea Nacional de Prevención del Suicidio:
                      </strong>{" "}
                    </p>
                    <p>
                      <strong>Crisis Text Line:</strong> Envía un mensaje de
                      texto
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4"></div>
      </section>
    </div>
  );
}
