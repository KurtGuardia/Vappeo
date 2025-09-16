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

  // const quoteClasses =
  //   theme === 'dark'
  //     ? 'text-white bg-red-900'
  //     : 'text-neutral-800 bg-white'

  return (
    <div
      className='relative h-80 md:h-96 lg:h-[28rem] flex flex-col items-center justify-start gap-20 md:gap-28 overflow-hidden'
      style={gradientStyle}
    >
      <div
        className={`flex justify-center items-center gap-1 text-center font-semibold text-sm md:text-lg p-1 md:py-3 md:px-6 w-full text-neutral-800 bg-white`}
      >
        <Truck style={{ display: 'inline-block' }} />{' '}
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
      <Image
        src='/imgs/vappeo png.png'
        alt='VAPPEO Logo'
        width={848}
        height={192}
        className='h-24 md:h-36 lg:h-44 w-auto'
        priority
      />
    </div>
  )
}
