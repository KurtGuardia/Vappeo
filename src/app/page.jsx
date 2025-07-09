import { HeroSection } from '@/components/hero-section'
import { CitySelector } from '@/components/city-selector'
import { ProductCatalog } from '@/components/product-catalog'
import { MapSection } from '@/components/map-section'
import { SocialMediaSection } from '@/components/social-media-section'
import { Footer } from '@/components/footer'
import {
  getSheetsData,
  sheetsDataToObject,
} from '@/lib/sheets'
import { MOCK_DATA } from '@/lib/mock-data'

export default async function HomePage() {
  // const data = await getSheetsData(ranges)
  // console.log('Fetched data from Google Sheets:', data)

  // const productos = sheetsDataToObject(data[0].values)
  // const inventario = sheetsDataToObject(data[1].values)
  // const puntos = sheetsDataToObject(data[2].values)
  // const marketing = sheetsDataToObject(data[4].values)
  // console.log('Productos Maestros:', productos)
  const { productos, inventario, puntos, marketing } =
    MOCK_DATA

  const quote =
    marketing.find((item) => item.id === 'hero_quote')
      ?.valor ||
    'Las mejor tienda de vapes en Bolivia, ahora con nueva marca y web.'

  return (
    <div className='space-y-12'>
      <HeroSection quote={quote} />
      <div className='px-4 space-y-12 max-w-sm mx-auto'>
        <CitySelector />
        <ProductCatalog
          productos={productos}
          inventario={inventario}
        />
      </div>
      <MapSection puntosRecojo={puntos} />
      <SocialMediaSection />
      <Footer />
    </div>
  )
}
