'use client'
import Image from 'next/image'
import { useThemeStore } from '@/lib/ui-store'

export function HeroSection({ quote }) {
  const { theme } = useThemeStore()

  const gradientStyle = {
    background:
      theme === 'dark'
        ? 'linear-gradient(315deg, #000 20%, #b30000 100%)'
        : 'linear-gradient(135deg, #ffffff -20%, #6c081e 50%)',
  }

  const quoteClasses =
    theme === 'dark'
      ? 'text-white bg-black/30'
      : 'text-neutral-800 bg-white/30'

  return (
    <div
      className='relative h-80 md:h-96 lg:h-[28rem] flex flex-col items-center justify-end gap-20 md:gap-28 overflow-hidden'
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
      <div
        className={`text-center font-semibold text-lg backdrop-blur-sm py-3 px-6 mb-5 w-full ${quoteClasses}`}
      >
        {quote}
      </div>
    </div>
  )
}
