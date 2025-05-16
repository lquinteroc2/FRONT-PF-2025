import { CardList2 } from '@/components/card/CardList2'
import { CardList } from '@/components/card/CardLit'
import Multimedia from '@/components/multimedia/Multimedia'
import React from 'react'

const page = () => {
  return (
    <div className='container h-auto pt-9 md:px-40 justify-center flex flex-col items-center flex-1  overflow-y-auto'>
      <CardList/>
      <div className='py-16 flex justify-evenly'>
     <Multimedia/>
      </div>
      <div className='text-left py-8 flex justify-evenly'>
      <CardList2/>
      </div>
      
    </div> 
  )
}

export default page
