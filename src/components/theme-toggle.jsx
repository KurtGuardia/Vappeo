// src/components/theme-toggle.jsx
'use client'

import { useEffect } from 'react'
import { useThemeStore } from '@/lib/ui-store'
import { Button } from './ui/button'
import { GrSun, GrMoon } from 'react-icons/gr'

export function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore()

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      theme,
    )
  }, [theme])

  return (
    <Button
      variant='ghost'
      size='icon'
      className='relative h-9 w-9 px-8 hover:bg-black/10'
      onClick={toggleTheme}
      aria-label='Toggle Theme'
    >
      <GrSun className='theme-toggle-sun absolute h-5 w-5 transition-all duration-300' />
      <GrMoon className='theme-toggle-moon absolute h-5 w-5 transition-all duration-300' />
      <span className='sr-only'>Toggle Theme</span>
    </Button>
  )
}
