'use client'
import Image from 'next/image'

export function HeroSection({ quote }) {
  return (
    <div className='relative h-80 bg-gradient-to-br from-[#8B0000] via-[#C1121F] to-[#290000] flex flex-col items-center justify-center overflow-hidden'>
      <Image
        src='/imgs/vappeo_logo.jpg'
        alt='Vappeo Logo'
        layout='fill'
        objectFit='cover'
        priority
      />
      <div className='absolute bottom-8 left-0 right-0 overflow-hidden px-4 w-fit'>
        <div className='marquee whitespace-nowrap text-white font-semibold text-lg bg-black/30 backdrop-blur-sm rounded-full py-3 px-6'>
          🎉 {quote} 🎉
        </div>
      </div>
    </div>
  )
}
