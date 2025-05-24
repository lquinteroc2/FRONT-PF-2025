'use client'

import Header from '@/components/Header/Header'
import { AudioList } from '@/components/Resources/home/AudioList'
import { DocumentList } from '@/components/Resources/home/DocumentList'
import { ImageList } from '@/components/Resources/home/ImageList'
import { MostViewedResources } from '@/components/Resources/home/MostViewedResources'
import VideoList from '@/components/Resources/home/VideoList'
import React from 'react'

export default function HomePage() {
  return (
    <div>
      <Header />
      
      {/* Most viewed resources */}
      <section className="w-full bg-white py-16">
        <div className="mx-auto max-w-6xl px-4">
          <MostViewedResources />
        </div>
      </section>

      {/* Audio list */}
      <section className="w-full bg-neutral-100 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <AudioList />
        </div>
      </section>

      {/* Video list */}
      <section className="w-full bg-white py-16">
        <div className="mx-auto max-w-6xl px-4">
          <VideoList />
        </div>
      </section>

      {/* Image list */}
      <section className="w-full bg-neutral-100 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <ImageList />
        </div>
      </section>

      {/* Document list */}
      <section className="w-full bg-white py-16">
        <div className="mx-auto max-w-6xl px-4">
          <DocumentList />
        </div>
      </section>
    </div>
  )
}

