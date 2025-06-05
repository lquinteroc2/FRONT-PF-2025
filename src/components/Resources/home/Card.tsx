'use client'

import Image from "next/image"
import Link from "next/link"

interface CardProps {
  title: string
  description?: string
  imageSrc: string
  imageAlt: string
  href?: string
}

export default function CardHome({ title, description, imageSrc, imageAlt, href }: CardProps) {
  
  const CardContent = () => (
    <div className="group flex flex-col h-full overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl">
      {/* Imagen */}
      <div className="relative h-40 w-full">
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt={imageAlt}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Contenido */}
      <div className="flex flex-col flex-grow p-5 justify-between">
        <div>
          <h3 className="mb-2 text-lg font-semibold text-gray-800 line-clamp-2">{title}</h3>
          <p className="text-sm text-gray-600 line-clamp-3">{description}</p>
        </div>

        {href && (
          <div className="mt-4 pt-2">
            <span className="inline-flex items-center text-sm font-medium text-secondary hover:text-secondary-dark">
              Aprender más
              <svg
                className="ml-1 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </span>
          </div>
        )}
      </div>
    </div>
  )

  return href ? (
    <Link href={href} className="block h-full">
      <CardContent />
    </Link>
  ) : (
    <CardContent />
  )
}