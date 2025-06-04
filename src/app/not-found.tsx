'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function NotFound() {
  const router=useRouter()
  return (
    <div className='flex flex-col justify-center items-center border-[black] border text-center h-screen w-[100%]'>
      <h1 className='text-7xl text-center font-bold text-blue-400'>404</h1>
      <h2 className='text-center'>Not Found</h2>
      <Image
      src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/404/404-computer.svg"
      alt="Image-not-Found"
      width={300}
      height={300} // altura estimada; podés ajustarla o usar layout "responsive"
      unoptimized // necesario si usás imágenes remotas y no están en next.config.js
    />
      <p>Could not find requested resource</p>
       <button
        onClick={() => router.back()}
        className='py-3'
      >
        <span className='text-4xl font-bold text-blue-400 animate-pulse duration-1000'>Back ⬅️</span>
      </button>
    </div>
  )
}
