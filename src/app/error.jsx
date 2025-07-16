'use client' // This is required for error components

import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AlertTriangle } from 'lucide-react'

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service in production
    // For now, we'll just log it to the console.
    console.error(error)
  }, [error])

  return (
    <div className='flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4 text-center'>
      <div className='space-y-6'>
        <div className='flex justify-center'>
          <AlertTriangle className='h-20 w-20 text-red-500' />
        </div>

        <div className='space-y-2'>
          <h2 className='text-3xl font-brand bg-gradient-to-r from-red-500 to-amber-500 bg-clip-text text-transparent'>
            OOPS, ALGO SALIÓ MAL
          </h2>
          <p className='text-gray-400 max-w-md mx-auto'>
            Se ha producido un error inesperado en la
            aplicación. Puedes intentar recargar la página o
            volver al inicio.
          </p>
        </div>

        {
          <pre className='text-left text-xs bg-gray-800 p-4 rounded-md overflow-x-auto text-red-300'>
            {error?.message}
          </pre>
        }

        <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
          <Button
            onClick={() => reset()}
            className='bg-transparent border border-[#C1121F] text-[#C1121F] hover:bg-[#C1121F] hover:text-white text-lg font-semibold px-8 py-6'
          >
            INTENTAR DE NUEVO
          </Button>
          <Link href='/'>
            <Button className='bg-[#C1121F] hover:bg-[#91090f] text-lg font-semibold px-8 py-6'>
              VOLVER AL INICIO
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
