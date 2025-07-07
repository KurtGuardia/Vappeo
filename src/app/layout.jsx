import { Inter, Bebas_Neue } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/navbar'
import { AgeGateDialog } from '@/components/age-gate-dialog'

const inter = Inter({ subsets: ['latin'] })
const bebas = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
})

export const metadata = {
  title: 'VAPPEO',
  description: 'La mejor tienda de vapeo de Bolivia',
}

export default function RootLayout({ children }) {
  return (
    <html lang='es' className={`dark ${bebas.variable}`}>
      <body
        className={`${inter.className} bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white min-h-screen`}
      >
        <div className='flex flex-col min-h-screen'>
          <Navbar />
          <main className='flex-1 pt-20'>{children}</main>
        </div>
        <AgeGateDialog />
      </body>
    </html>
  )
}
