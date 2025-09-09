import { HeroSection } from '@/components/hero-section'
import { ProductCatalog } from '@/components/product-catalog'
import { SocialMediaSection } from '@/components/social-media-section'
import { Footer } from '@/components/footer'
import {
  getSheetsData,
  sheetsDataToObject,
} from '@/lib/sheets'
import { ClientMapWrapper } from '@/components/client-map-wrapper'

export const revalidate = 60

export default async function HomePage() {
  const ranges = [
    'Productos',
    'Inventario',
    'Puntos',
    'Marketing',
  ]
  const data = await getSheetsData(ranges)
  const productos = sheetsDataToObject(data[0]?.values)
  const inventario = sheetsDataToObject(data[1]?.values)
  const puntos = sheetsDataToObject(data[2]?.values)
  const marketing = sheetsDataToObject(data[3]?.values)

  const quote =
    marketing.find((item) => item.id === 'hero_quote')
      ?.valor ||
    'Las mejor tienda de vapes en Bolivia, ahora con nueva marca y web.'

  return (
    <div className='space-y-12'>
      <HeroSection quote={quote} />
      <div className='space-y-20 mx-auto'>
        <ProductCatalog
          productos={productos}
          inventario={inventario}
        />
      </div>
      <ClientMapWrapper puntosRecojo={puntos} />
      <SocialMediaSection />
      <Footer />
    </div>
  )
}
