// src/components/theme-toggle.jsx
'use client'

import { useEffect } from 'react'
import { useThemeStore } from '@/lib/ui-store' // Note: I'm using ui-store.js as per your file structure
import { Button } from './ui/button'
import { Sun, Moon } from 'lucide-react'

export function ThemeToggle() {
  // 1. Get the current theme and the toggle action from the store.
  const { theme, toggleTheme } = useThemeStore()

  // 2. This effect synchronizes the state from the store to the <html> tag.
  //    This is what makes your globals.css theme rules apply correctly.
  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      theme,
    )
  }, [theme])

  const iconColorClasses =
    theme === 'light-sunset'
      ? 'text-neutral-800 hover:text-black'
      : 'text-gray-400 hover:text-white'

  return (
    <Button
      variant='ghost'
      size='icon'
      className={`h-9 w-9 rounded-full hover:bg-black/10 ${iconColorClasses}`}
      onClick={toggleTheme}
      aria-label='Toggle Theme'
    >
      {theme === 'dark' ? (
        <Sun className='h-5 w-5' />
      ) : (
        <Moon className='h-5 w-5' />
      )}
      <span className='sr-only'>Toggle Theme</span>
    </Button>
  )
}
