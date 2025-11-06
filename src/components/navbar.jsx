'use client'

import { useState, useEffect } from 'react'
import {
  Home,
  ShoppingCart,
  Flame,
  MapPin,
} from 'lucide-react'
import { SiInstagram } from 'react-icons/si'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useStore } from '@/lib/store'
import { useThemeStore } from '@/lib/ui-store'
import { ThemeToggle } from './theme-toggle'
import { CityChangeDialog } from './city-change-dialog'

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeHash, setActiveHash] = useState('')
  const [openCityDialog, setOpenCityDialog] =
    useState(false)
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

  useEffect(() => {
    const handleScroll = () => {
      // The top banner is h-10 (40px). Trigger the scrolled state when scrolling past it.
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    const handleHashChange = () => {
      setActiveHash(window.location.hash)
    }

    // Set initial hash
    handleHashChange()

    window.addEventListener('hashchange', handleHashChange)
    return () =>
      window.removeEventListener(
        'hashchange',
        handleHashChange,
      )
  }, [pathname])

  const inactiveIconClasses =
    theme === 'light-sunset'
      ? 'text-neutral-600 hover:text-black'
      : 'text-gray-4.500 hover:text-white'

  // const activeIconClasses = 'text-white'
  const activeIconClasses =
    theme === 'light-sunset' ? 'text-black' : 'text-white'

  const handleScrollToSection = (sectionId) => {
    if (pathname === '/') {
      // If on the homepage, scroll smoothly to the section.
      const element = document.getElementById(sectionId)
      if (element) {
        const navbarHeight = 80 // Offset in pixels to account for the fixed navbar
        const elementPosition =
          element.getBoundingClientRect().top
        const offsetPosition =
          elementPosition +
          window.pageYOffset -
          navbarHeight
        window.history.pushState(null, '', `#${sectionId}`)
        // Manually trigger a hashchange event since pushState doesn't
        window.dispatchEvent(
          new HashChangeEvent('hashchange'),
        )
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        })
      }
    } else {
      // If on another page, navigate to the homepage with the hash.
      router.push(`/#${sectionId}`)
    }
  }

  return (
    <nav
      className={`fixed left-0 right-0 z-60 p-2 md:py-4.5 glass-effect md:px-6 transition-all duration-300 ease-in-out ${
        isScrolled ? 'top-0' : 'top-8'
      }`}
    >
      <div className='flex items-center justify-between md:mx-6 lg:mx-12 mx-auto'>
        <ThemeToggle />

        <Image
          src={`/imgs/ISOTIPO-${
            theme === 'dark' ? 'BLANCO' : 'ROJO'
          }.png`}
          alt='VAPPEO Logo'
          width={120}
          height={30}
          className='h-6 md:h-8 w-auto'
          priority
        />

        <div className='flex items-center space-x-2 md:space-x-6'>
          <Link
            href='/'
            onClick={() => {
              if (window.location.hash) {
                setActiveHash('')
              }
            }}
            className={`flex flex-col items-center space-y-1 transition-colors ${
              pathname === '/' && activeHash === ''
                ? activeIconClasses
                : inactiveIconClasses
            }`}
          >
            <Home className='h-4.5 md:h-6 w-4.5 md:w-6' />
            <span className='text-xs'>Inicio</span>
          </Link>

          <button
            onClick={() => handleScrollToSection('catalog')}
            className={`flex flex-col items-center cursor-pointer space-y-1 transition-colors ${
              activeHash === '#catalog'
                ? activeIconClasses
                : inactiveIconClasses
            }`}
          >
            <Flame className='h-4.5 md:h-6 w-4.5 md:w-6' />
            <span className='text-xs'>Catálogo</span>
          </button>

          <Link
            href='/carrito'
            onClick={() => {
              if (window.location.hash) {
                setActiveHash('')
              }
            }}
            className={`flex flex-col items-center space-y-1 transition-colors relative ${
              pathname === '/carrito' && activeHash === ''
                ? activeIconClasses
                : inactiveIconClasses
            }`}
          >
            <div className='relative'>
              <ShoppingCart className='h-4.5 md:h-6 w-4.5 md:w-6' />
              {cartItemCount > 0 && (
                <span className='absolute -top-2 -right-2 bg-[#C1121F] text-white text-xs rounded-full h-4.5 w-4.5 flex items-center justify-center'>
                  {cartItemCount}
                </span>
              )}
            </div>
            <span className='text-xs'>Carrito</span>
          </Link>

          <button
            onClick={() => setOpenCityDialog(true)}
            className={`flex flex-col items-center space-y-1 cursor-pointer transition-colors ${inactiveIconClasses}`}
          >
            <MapPin className='h-4.5 md:h-6 w-4.5 md:w-6' />
            <span className='text-xs'>Ciudad</span>
          </button>

          <button
            onClick={() =>
              handleScrollToSection('social-section')
            }
            className={`flex flex-col items-center space-y-1 cursor-pointer transition-colors ${
              activeHash === '#social-section'
                ? activeIconClasses
                : inactiveIconClasses
            }`}
          >
            <SiInstagram className='h-4.5 md:h-6 w-4.5 md:w-6' />
            <span className='text-xs'>Social</span>
          </button>
        </div>
      </div>

      <CityChangeDialog
        open={openCityDialog}
        onOpenChange={setOpenCityDialog}
      />
    </nav>
  )
}
