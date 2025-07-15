import { Inter, Bebas_Neue } from 'next/font/google'
import './globals.css'
import 'leaflet/dist/leaflet.css'
import { Navbar } from '@/components/navbar'
import { AgeGateDialog } from '@/components/age-gate-dialog'
import { TermsDialog } from '@/components/terms-dialog'

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
    <html
      lang='es'
      className={`${bebas.variable}`}
      suppressHydrationWarning={true}
    >
      <body className={`${inter.className} min-h-screen`}>
        <div className='flex flex-col min-h-screen'>
          <Navbar />
          <main className='flex-1 pt-18'>{children}</main>
        </div>
        <AgeGateDialog />
        <TermsDialog />
      </body>
    </html>
  )
}
