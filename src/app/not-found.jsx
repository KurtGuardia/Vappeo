import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Frown } from 'lucide-react'

export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4 text-center'>
      <div className='space-y-6'>
        <div className='flex justify-center'>
          <Frown className='h-20 w-20 text-amber-400' />
        </div>

        <h1 className='text-6xl font-brand text-white tracking-wider'>
          404
        </h1>

        <div className='space-y-2'>
          <h2 className='text-3xl font-brand bg-gradient-to-r from-red-500 to-amber-500 bg-clip-text text-transparent'>
            PÁGINA NO ENCONTRADA
          </h2>
          <p className='text-gray-400 max-w-md mx-auto'>
            Lo sentimos, la página que buscas no existe o ha
            sido movida. Revisa la URL o regresa al inicio.
          </p>
        </div>

        <Link href='/'>
          <Button className='bg-[#C1121F] hover:bg-[#91090f] text-lg font-semibold px-8 py-6'>
            VOLVER AL INICIO
          </Button>
        </Link>
      </div>
    </div>
  )
}
