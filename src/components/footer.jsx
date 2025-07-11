import Link from 'next/link'

export function Footer() {
  const currentDate = `${new Date().getFullYear()}/${String(
    new Date().getMonth() + 1,
  ).padStart(2, '0')}`
  return (
    <footer className='bg-gray-900 p-6 text-center space-y-4'>
      <div className='flex justify-center space-x-6'>
        <Link
          href='/terminos'
          className='text-gray-400 hover:text-white text-sm'
        >
          Términos
        </Link>
        <Link
          href='/politica-edad'
          className='text-gray-400 hover:text-white text-sm'
        >
          Política de Edad
        </Link>
      </div>
      <p className='text-xs text-gray-500'>
        © {currentDate} VAPPEO dev by{' '}
        <a
          href='https://www.kurtguardia.com'
          target='_blank'
          rel='noopener noreferrer'
          className='text-blue-400 hover:text-blue-300'
        >
          Kurt Guardia
        </a>
        . Todos los derechos reservados.
      </p>
    </footer>
  )
}
