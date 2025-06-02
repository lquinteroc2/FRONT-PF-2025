"use client"

import { motion } from "framer-motion"
import { Calendar, Shield, Lock, Eye, Database, UserCheck, Globe, Mail } from "lucide-react"

export default function PrivacyPolicy() {
  const lastUpdated = "15 de enero de 2024"

  const sections = [
    {
      id: "introduction",
      title: "1. Introducción",
      icon: Shield,
      content: `En Séntia, valoramos profundamente su privacidad y nos comprometemos a proteger su información personal. Esta Política de Privacidad explica cómo recopilamos, utilizamos, almacenamos y protegemos su información cuando utiliza nuestra plataforma de bienestar emocional.`,
    },
    {
      id: "information-collected",
      title: "2. Información que Recopilamos",
      icon: Database,
      content: `Recopilamos diferentes tipos de información para brindarle nuestros servicios:

**Información Personal:**
• Nombre, dirección de correo electrónico, fecha de nacimiento
• Información de contacto y ubicación general
• Fotografía de perfil (opcional)

**Información de Salud Mental:**
• Registros de estado emocional y humor
• Respuestas a cuestionarios de bienestar
• Notas personales y reflexiones
• Patrones de uso de la aplicación

**Información Técnica:**
• Dirección IP, tipo de navegador, sistema operativo
• Datos de uso y navegación en la plataforma
• Cookies y tecnologías similares
• Logs de actividad y errores`,
    },
    {
      id: "how-we-use",
      title: "3. Cómo Utilizamos su Información",
      icon: UserCheck,
      content: `Utilizamos su información para los siguientes propósitos:

**Prestación de Servicios:**
• Proporcionar herramientas de seguimiento emocional
• Conectarle con recursos y grupos de apoyo apropiados
• Personalizar su experiencia en la plataforma
• Generar insights sobre su bienestar emocional

**Mejora del Servicio:**
• Analizar patrones de uso para mejorar funcionalidades
• Desarrollar nuevas características basadas en necesidades
• Realizar investigación agregada y anónima

**Comunicación:**
• Enviar notificaciones importantes sobre su cuenta
• Proporcionar actualizaciones sobre nuevas funciones
• Responder a sus consultas y solicitudes de soporte

**Cumplimiento Legal:**
• Cumplir con obligaciones legales y regulatorias
• Proteger nuestros derechos y los de nuestros usuarios`,
    },
    {
      id: "data-sharing",
      title: "4. Compartir Información",
      icon: Globe,
      content: `Séntia NO vende su información personal. Podemos compartir información limitada en las siguientes circunstancias:

**Proveedores de Servicios:**
• Empresas que nos ayudan a operar la plataforma (hosting, análisis)
• Todos los proveedores firman acuerdos de confidencialidad estrictos

**Profesionales de Salud Mental:**
• Solo con su consentimiento explícito
• Para facilitar conexiones con terapeutas o consejeros

**Requerimientos Legales:**
• Cuando sea requerido por ley o proceso legal
• Para proteger la seguridad de usuarios en riesgo inmediato

**Datos Agregados y Anónimos:**
• Información estadística que no puede identificarle personalmente
• Para investigación en salud mental y mejora de servicios`,
    },
    {
      id: "data-security",
      title: "5. Seguridad de Datos",
      icon: Lock,
      content: `Implementamos múltiples capas de seguridad para proteger su información:

**Encriptación:**
• Todos los datos se encriptan en tránsito y en reposo
• Utilizamos protocolos de seguridad estándar de la industria

**Control de Acceso:**
• Acceso limitado solo a personal autorizado
• Autenticación de múltiples factores para cuentas administrativas
• Auditorías regulares de acceso y permisos

**Infraestructura Segura:**
• Servidores en centros de datos certificados
• Monitoreo continuo de seguridad 24/7
• Copias de seguridad encriptadas y redundantes

**Capacitación del Personal:**
• Todo el personal recibe capacitación en privacidad y seguridad
• Políticas estrictas de manejo de información confidencial`,
    },
    {
      id: "your-rights",
      title: "6. Sus Derechos de Privacidad",
      icon: Eye,
      content: `Usted tiene los siguientes derechos sobre su información personal:

**Acceso y Portabilidad:**
• Solicitar una copia de toda su información personal
• Exportar sus datos en formato legible por máquina

**Rectificación:**
• Corregir información inexacta o incompleta
• Actualizar sus datos personales en cualquier momento

**Eliminación:**
• Solicitar la eliminación de su cuenta y datos asociados
• Derecho al "olvido" bajo ciertas circunstancias

**Restricción y Oposición:**
• Limitar el procesamiento de sus datos
• Oponerse a ciertos usos de su información

**Retirada de Consentimiento:**
• Retirar su consentimiento en cualquier momento
• Esto puede afectar la funcionalidad de algunos servicios

Para ejercer estos derechos, contáctenos en: privacy@sentia.com`,
    },
    {
      id: "data-retention",
      title: "7. Retención de Datos",
      icon: Database,
      content: `Conservamos su información durante diferentes períodos según el tipo de datos:

**Datos de Cuenta:**
• Mientras su cuenta esté activa
• 30 días después de la eliminación de cuenta para recuperación

**Datos de Salud Mental:**
• Hasta 7 años después de la última actividad
• Puede solicitar eliminación anticipada en cualquier momento

**Datos de Comunicación:**
• Correos electrónicos y mensajes: 3 años
• Logs de soporte: 2 años

**Datos Técnicos:**
• Logs de servidor: 1 año
• Datos analíticos agregados: indefinidamente (anónimos)

Todos los datos se eliminan de forma segura e irreversible al final de estos períodos.`,
    },
    {
      id: "cookies",
      title: "8. Cookies y Tecnologías de Seguimiento",
      icon: Globe,
      content: `Utilizamos cookies y tecnologías similares para mejorar su experiencia:

**Cookies Esenciales:**
• Necesarias para el funcionamiento básico de la plataforma
• Gestión de sesiones y autenticación
• No se pueden desactivar

**Cookies de Funcionalidad:**
• Recordar sus preferencias y configuraciones
• Personalizar la interfaz según sus necesidades

**Cookies Analíticas:**
• Entender cómo utiliza la plataforma
• Mejorar el rendimiento y la usabilidad
• Datos agregados y anónimos

**Cookies de Marketing:**
• Solo con su consentimiento explícito
• Personalizar contenido y recomendaciones

Puede gestionar sus preferencias de cookies en la configuración de su cuenta.`,
    },
    {
      id: "international-transfers",
      title: "9. Transferencias Internacionales",
      icon: Globe,
      content: `Sus datos pueden ser procesados en países fuera de su residencia:

**Salvaguardas Implementadas:**
• Cláusulas contractuales estándar aprobadas
• Certificaciones de adecuación de protección de datos
• Medidas técnicas y organizativas adicionales

**Países de Procesamiento:**
• Estados Unidos (servidores principales)
• Unión Europea (respaldo y análisis)
• Todos con niveles adecuados de protección

**Sus Derechos:**
• Puede solicitar información sobre transferencias específicas
• Derecho a oponerse a transferencias bajo ciertas circunstancias`,
    },
    {
      id: "minors",
      title: "10. Protección de Menores",
      icon: Shield,
      content: `Séntia está comprometida con la protección de la privacidad de los menores:

**Edad Mínima:**
• Usuarios deben tener al menos 16 años
• Menores de 16 años requieren consentimiento parental verificable

**Protecciones Especiales:**
• Procesamiento limitado de datos de menores
• Controles parentales disponibles
• Eliminación prioritaria de datos al solicitar

**Verificación de Edad:**
• Procesos de verificación durante el registro
• Monitoreo continuo para detectar cuentas de menores no autorizadas

Si descubrimos que hemos recopilado datos de un menor sin consentimiento apropiado, eliminaremos esa información inmediatamente.`,
    },
    {
      id: "changes",
      title: "11. Cambios a esta Política",
      icon: Calendar,
      content: `Podemos actualizar esta Política de Privacidad periódicamente:

**Notificación de Cambios:**
• Le notificaremos por correo electrónico sobre cambios significativos
• Publicaremos la versión actualizada en nuestra plataforma
• Cambios menores se indicarán con la fecha de "última actualización"

**Su Consentimiento:**
• El uso continuado después de los cambios constituye aceptación
• Para cambios significativos, solicitaremos consentimiento explícito
• Siempre puede revisar la versión más reciente en nuestro sitio web

**Historial de Versiones:**
• Mantenemos un registro de versiones anteriores
• Disponible bajo solicitud para transparencia`,
    },
    {
      id: "contact",
      title: "12. Contacto y Quejas",
      icon: Mail,
      content: `Para cualquier consulta sobre privacidad o para ejercer sus derechos:

**Oficial de Protección de Datos:**
• Email: privacy@sentia.com
• Teléfono: +1 (555) 123-4567
• Dirección: 123 Privacy Street, Data City, DC 12345

**Autoridades de Supervisión:**
• Tiene derecho a presentar quejas ante autoridades de protección de datos
• Proporcionaremos información de contacto de autoridades relevantes
• Trabajaremos con autoridades para resolver cualquier inquietud

**Tiempo de Respuesta:**
• Responderemos a consultas dentro de 72 horas
• Solicitudes complejas pueden tomar hasta 30 días
• Le mantendremos informado sobre el progreso de su solicitud`,
    },
  ]

  const dataTypes = [
    { type: "Información Personal", sensitivity: "Media", retention: "Mientras la cuenta esté activa" },
    { type: "Datos de Salud Mental", sensitivity: "Alta", retention: "Hasta 7 años" },
    { type: "Datos de Comunicación", sensitivity: "Media", retention: "3 años" },
    { type: "Datos Técnicos", sensitivity: "Baja", retention: "1 año" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white font-[family-name:var(--font-geist-sans)]">
      {/* Header */}
      <section className="bg-gradient-to-r from-neutro to-teal-600 py-16 text-white md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-4xl text-center"
          >
            <div className="mb-6 flex justify-center">
              <div className="rounded-full bg-white/20 p-4">
                <Shield className="h-12 w-12" />
              </div>
            </div>
            <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">Política de Privacidad</h1>
            <p className="mb-6 text-lg opacity-90 md:text-xl">
              Cómo protegemos y manejamos su información personal en Séntia
            </p>
            <div className="flex items-center justify-center gap-2 text-sm opacity-80">
              <Calendar className="h-4 w-4" />
              <span>Última actualización: {lastUpdated}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Privacy Commitment */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto max-w-4xl"
          >
            <div className="rounded-lg bg-gradient-to-r from-blue-50 to-teal-50 p-8 border border-blue-200">
              <div className="text-center">
                <h2 className="mb-4 text-2xl font-bold text-gray-900">Nuestro Compromiso con su Privacidad</h2>
                <p className="text-gray-700 leading-relaxed">
                  En Séntia, entendemos que la información sobre su salud mental es extremadamente sensible y personal.
                  Nos comprometemos a mantener los más altos estándares de privacidad y seguridad, tratando sus datos
                  con el respeto y la protección que merecen.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Data Overview Table */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto max-w-4xl"
          >
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-xl font-semibold text-gray-900">Resumen de Tipos de Datos</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="pb-3 text-left font-semibold text-gray-900">Tipo de Información</th>
                      <th className="pb-3 text-left font-semibold text-gray-900">Sensibilidad</th>
                      <th className="pb-3 text-left font-semibold text-gray-900">Período de Retención</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataTypes.map((item, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-3 text-gray-700">{item.type}</td>
                        <td className="py-3">
                          <span
                            className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                              item.sensitivity === "Alta"
                                ? "bg-red-100 text-red-800"
                                : item.sensitivity === "Media"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-green-100 text-green-800"
                            }`}
                          >
                            {item.sensitivity}
                          </span>
                        </td>
                        <td className="py-3 text-gray-600">{item.retention}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mx-auto max-w-4xl"
          >
            <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-100">
              <h2 className="mb-4 text-xl font-semibold text-gray-900">Índice de Contenidos</h2>
              <div className="grid gap-2 md:grid-cols-2">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-blue-50 hover:text-blue-700"
                  >
                    <section.icon className="h-4 w-4 flex-shrink-0" />
                    {section.title}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                id={section.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="mb-12 scroll-mt-24"
              >
                <div className="rounded-lg bg-white p-8 shadow-sm border border-gray-100">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="rounded-full bg-blue-100 p-2">
                      <section.icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
                  </div>
                  <div className="prose prose-gray max-w-none">
                    <div className="whitespace-pre-line leading-relaxed text-gray-700">{section.content}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="bg-blue-50 py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mx-auto max-w-4xl"
          >
            <div className="text-center mb-8">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">Gestione su Privacidad</h2>
              <p className="text-gray-600">Acciones rápidas para controlar su información personal</p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-lg bg-white p-6 text-center shadow-sm">
                <Eye className="mx-auto mb-3 h-8 w-8 text-blue-600" />
                <h3 className="mb-2 font-semibold text-gray-900">Ver mis Datos</h3>
                <p className="mb-4 text-sm text-gray-600">Solicite una copia de toda su información personal</p>
                <button className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                  Solicitar Datos
                </button>
              </div>
              <div className="rounded-lg bg-white p-6 text-center shadow-sm">
                <Lock className="mx-auto mb-3 h-8 w-8 text-green-600" />
                <h3 className="mb-2 font-semibold text-gray-900">Configurar Privacidad</h3>
                <p className="mb-4 text-sm text-gray-600">Ajuste sus preferencias de privacidad y cookies</p>
                <button className="w-full rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700">
                  Configurar
                </button>
              </div>
              <div className="rounded-lg bg-white p-6 text-center shadow-sm">
                <Mail className="mx-auto mb-3 h-8 w-8 text-purple-600" />
                <h3 className="mb-2 font-semibold text-gray-900">Contactar Soporte</h3>
                <p className="mb-4 text-sm text-gray-600">¿Preguntas sobre privacidad? Estamos aquí para ayudar</p>
                <button className="w-full rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700">
                  Contactar
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mx-auto max-w-4xl text-center"
          >
            <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-teal-600 p-8 text-white">
              <h2 className="mb-4 text-2xl font-bold md:text-3xl">Su privacidad es nuestra prioridad</h2>
              <p className="mb-6 opacity-90">
                Estamos comprometidos con la transparencia y la protección de sus datos. Si tiene alguna pregunta, no
                dude en contactarnos.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <button className="rounded-full bg-white px-6 py-3 font-semibold text-blue-600 transition-all hover:bg-gray-100">
                  Contactar Privacidad
                </button>
                <button className="rounded-full border-2 border-white px-6 py-3 font-semibold text-white transition-all hover:bg-white hover:text-blue-600">
                  Ver Términos de Uso
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
