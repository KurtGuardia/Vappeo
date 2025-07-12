'use client'
import Image from 'next/image'

export function HeroSection({ quote }) {
  const gradientStyle = {
    background:
      'linear-gradient(315deg, #000 20%, #b30000 100%)',
  }

  return (
    <div
      className='relative h-80 md:h-96 lg:h-[28rem] bg-gradient-to-br from-[#8B0000] via-[#C1121F] to-[#290000] flex flex-col items-center justify-center overflow-hidden'
      style={gradientStyle}
    >
      <Image
        src='/imgs/vappeo_logo_transparent.png'
        alt='VAPPEO Logo'
        width={600}
        height={149}
        className='h-24 md:h-36 lg:h-44 w-auto -mt-10'
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
