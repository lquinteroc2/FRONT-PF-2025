"use client"

import dynamic from "next/dynamic"

const ResourceClient = dynamic(() => import("./ResourceClient"), {
  ssr: false,
})

export default function ResourcePageClient({ id }: { id: string }) {
  return <ResourceClient id={id} />
}