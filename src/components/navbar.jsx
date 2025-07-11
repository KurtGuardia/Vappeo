'use client'

import { Home, ShoppingCart, Instagram } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useStore } from '@/lib/store'

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
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
      <div className='flex items-center justify-between max-w-sm mx-auto'>
        <Image
          src='/imgs/vappeo_logo_transparent.png'
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
                : 'text-gray-400 hover:text-white'
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
                : 'text-gray-400 hover:text-white'
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
            className='flex flex-col items-center space-y-1 text-gray-400 hover:text-white transition-colors'
          >
            <Instagram className='h-5 w-5' />
            <span className='text-xs'>Social</span>
          </button>
        </div>
      </div>
    </nav>
  )
}
