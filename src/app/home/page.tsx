'use client'

import Header from '@/components/Header/Header'
import { AudioList } from '@/components/Resources/home/AudioList'
import { DocumentList } from '@/components/Resources/home/DocumentList'
import { ImageList } from '@/components/Resources/home/ImageList'
import { MostViewedResources } from '@/components/Resources/home/MostViewedResources'
import VideoList from '@/components/Resources/home/VideoList'
import React from 'react'

export default function Page() {
  const userHasHadSubscription = false; // o tu lógica real

  return (
    <div>
    <Header />
    <div className='container h-auto pt-9 md:px-40 justify-center flex flex-col items-center flex-1'>
      <MostViewedResources />
        <div className='text-left py-8 flex justify-evenly'>
      <AudioList />
      </div>
      <div className='py-16 flex justify-evenly'>
     <VideoList />
      </div>
      <div className='text-left py-8 flex justify-evenly'>
      <ImageList />
      </div>
      <div className='text-left py-8 flex justify-evenly'>
      <DocumentList />
      </div>
    </div> 
    </div>
  );
}

