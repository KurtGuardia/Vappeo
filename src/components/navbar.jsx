'use client'

import { Home, ShoppingCart, Instagram } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useStore } from '@/lib/store'
import { useThemeStore } from '@/lib/ui-store'
import { ThemeToggle } from './theme-toggle'

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { theme } = useThemeStore()
  const { cart } = useStore()
  const cartItemCount = cart.reduce(
    (sum, item) =>
      sum +
      item.flavors.reduce(
        (flavorSum, flavor) => flavorSum + flavor.quantity,
        0,
      ),
    0,
  )

  const inactiveIconClasses =
    theme === 'light-sunset'
      ? 'text-neutral-800 hover:text-black'
      : 'text-gray-400 hover:text-white'

  const logoSrc =
    theme === 'light-sunset'
      ? '/imgs/vappeo_logo_transparent_black.png'
      : '/imgs/vappeo_logo_transparent.png'

  const scrollToSocial = () => {
    if (pathname === '/') {
      // If on the homepage, scroll smoothly to the section.
      document
        .getElementById('social-section')
        ?.scrollIntoView({
          behavior: 'smooth',
        })
    } else {
      // If on another page, navigate to the homepage with the hash.
      // The browser will handle scrolling to the element after navigation.
      router.push('/#social-section')
    }
  }

  return (
    <nav className='fixed top-0 left-0 right-0 z-50 glass-effect px-6 py-4'>
      <div className='flex items-center justify-between md:mx-6 lg:mx-12 mx-auto'>
        <ThemeToggle />

        <Image
          src={logoSrc}
          alt='VAPPEO Logo'
          width={120}
          height={30}
          className='h-8 w-auto'
          priority
        />

        <div className='flex items-center space-x-6'>
          <Link
            href='/'
            className={`flex flex-col items-center space-y-1 transition-colors ${
              pathname === '/'
                ? 'text-[#C1121F]'
                : inactiveIconClasses
            }`}
          >
            <Home className='h-5 w-5' />
            <span className='text-xs'>Inicio</span>
          </Link>

          <Link
            href='/carrito'
            className={`flex flex-col items-center space-y-1 transition-colors relative ${
              pathname === '/carrito'
                ? 'text-[#C1121F]'
                : inactiveIconClasses
            }`}
          >
            <div className='relative'>
              <ShoppingCart className='h-5 w-5' />
              {cartItemCount > 0 && (
                <span className='absolute -top-2 -right-2 bg-[#C1121F] text-white text-xs rounded-full h-4 w-4 flex items-center justify-center'>
                  {cartItemCount}
                </span>
              )}
            </div>
            <span className='text-xs'>Carrito</span>
          </Link>

          <button
            onClick={scrollToSocial}
            className={`flex flex-col items-center space-y-1 transition-colors ${inactiveIconClasses}`}
          >
            <Instagram className='h-5 w-5' />
            <span className='text-xs'>Social</span>
          </button>
        </div>
      </div>
    </nav>
  )
}
