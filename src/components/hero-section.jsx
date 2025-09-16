'use client'
import Image from 'next/image'
import { useThemeStore } from '@/lib/ui-store'
import { Truck } from 'lucide-react'

export function HeroSection() {
  const { theme } = useThemeStore()

  const gradientStyle = {
    background:
      theme === 'dark'
        ? 'linear-gradient(315deg, #000 20%, #b30000 100%)'
        : 'linear-gradient(135deg, #ffffff -20%, #6c081e 50%)',
  }

  const quoteClasses =
    theme === 'dark'
      ? 'text-white bg-red-900'
      : 'text-neutral-800 bg-white'

  return (
    <div
      className='relative h-80 md:h-96 lg:h-[28rem] flex flex-col items-center justify-end gap-20 md:gap-28 overflow-hidden'
      style={gradientStyle}
    >
      <Image
        src='/imgs/vappeo png.png'
        alt='VAPPEO Logo'
        width={848}
        height={192}
        className='h-24 md:h-36 lg:h-44 w-auto -mt-10'
        priority
      />
      <div
        className={`text-center font-semibold text-sm md:text-lg py-1 md:py-3 px-2 md:px-6 w-full ${quoteClasses}`}
      >
        <Truck
          style={{ display: 'inline-block', margin: '5px' }}
        />{' '}
        <b>ENVÍOS GRATIS</b> en pedidos arriba de{' '}
        <span
          className={`${
            theme === 'dark'
              ? 'text-amber-600'
              : 'text-red-900'
          }`}
        >
          249 bs.
        </span>
      </div>
    </div>
  )
}
