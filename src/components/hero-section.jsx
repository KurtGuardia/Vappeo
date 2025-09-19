'use client'
import Image from 'next/image'
import { useThemeStore } from '@/lib/ui-store'
import { Truck } from 'lucide-react'

export function HeroSection() {
  const { theme } = useThemeStore()

  const gradientBg =
    theme === 'dark'
      ? 'bg-gradient-to-bl from-black from-20%, to-[#b30000] to-100%'
      : 'bg-white'

  const bannerClasses =
    theme === 'dark'
      ? 'bg-gradient-to-bl from-white from-20% to-[#eee] to-100% text-neutral-800'
      : 'bg-gradient-to-br from-white from-[-20%] to-[#6c081e] to-50% text-white'

  return (
    <div
      className={`relative h-55 md:h-96 lg:h-[28rem] flex flex-col items-center justify-start gap-12 md:gap-28 overflow-hidden ${gradientBg}`}
    >
      <div
        className={`flex justify-center items-center gap-1 text-center font-semibold text-sm md:text-lg p-1 md:py-3 md:px-6 w-full ${bannerClasses}`}
      >
        <Truck
          className={`inline-block ${
            theme === 'dark' ? 'text-red-900' : 'text-white'
          }`}
        />
        <b>ENVÍOS GRATIS</b> en pedidos arriba de
        <b>249 bs.</b>
      </div>
      <Image
        src={`/imgs/VAPPEO-LOGO-${
          theme === 'dark' ? 'BLANCO' : 'ROJO'
        }.png`}
        alt='VAPPEO Logo'
        width={848}
        height={192}
        className='h-18 md:h-36 lg:h-44 w-auto'
        priority
      />
    </div>
  )
}
