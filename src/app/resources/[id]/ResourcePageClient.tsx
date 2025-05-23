// "use client"

// import dynamic from "next/dynamic"

// const ResourceClient = dynamic(() => import("./ResourceClient"), {
//   ssr: false,
// })

// export default function ResourcePageClient({ id }: { id: string }) {
//   return <ResourceClient id={id} />
// }


"use client"

import dynamic from "next/dynamic"

// Si quieres seguir usando dynamic import aquí, ahora sí está permitido porque es client
const ResourceClient = dynamic(() => import("./ResourceClient"), {
  ssr: false,
})

export default function ResourcePageClient({ id }: { id: string }) {
  return <ResourceClient id={id} />
}