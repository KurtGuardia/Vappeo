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

const MOCK_DATA = {
  productos: [
    {
      id: 'vape-3.5k',
      nombre: 'VAPE 3.5K',
      imagen_general: '/imgs/vape-3.5k-card.png',
      descripcion: 'Perfecto para principiantes.',
    },
    {
      id: 'vape-20k',
      nombre: 'VAPE 20K',
      imagen_general: '/imgs/vape-20k-card.png',
      descripcion: 'El más popular, duración extendida.',
    },
    {
      id: 'vape-36k',
      nombre: 'VAPE 36K',
      imagen_general: '/imgs/vape-36k-card.png',
      descripcion: 'Experiencia premium, máxima calidad.',
    },
  ],
  inventario: [
    {
      producto_id: 'vape-3.5k',
      sabor: 'Mango',
      ciudad: 'Cochabamba',
      precio: '80',
      stock: '15',
      etiqueta: null,
    },
    {
      producto_id: 'vape-3.5k',
      sabor: 'Uva',
      ciudad: 'Santa Cruz',
      precio: '85',
      stock: '20',
      etiqueta: 'NUEVO',
    },
    {
      producto_id: 'vape-20k',
      sabor: 'Blueberry Ice',
      ciudad: 'Cochabamba',
      precio: '150',
      stock: '12',
      etiqueta: 'TOP 24h',
    },
    {
      producto_id: 'vape-20k',
      sabor: 'Fresa Kiwi',
      ciudad: 'Cochabamba',
      precio: '150',
      stock: '8',
      etiqueta: 'QUEDAN POCOS',
    },
  ],
  puntos: [
    {
      id: 'cbba-norte',
      ciudad: 'Cochabamba',
      nombre: 'Sucursal Norte',
      direccion: 'Av. América #123',
      lat: '-17.37',
      lng: '-66.15',
    },
  ],
  marketing: [
    {
      id: 'hero_quote',
      valor:
        '🔥 ¡Lanzamiento de nuestra web usa el código "VAPEO" para un 10% de descuento! - Prueba el nuevo sabor Mango en vape de 20k - Ahora hacemos envíos al interior de país!',
    },
  ],
}

export default async function HomePage() {
  // const data = await getSheetsData(ranges)
  // console.log('Fetched data from Google Sheets:', data)

  // const productos = sheetsDataToObject(data[0].values)
  // const inventario = sheetsDataToObject(data[1].values)
  // const puntos = sheetsDataToObject(data[2].values)
  // const marketing = sheetsDataToObject(data[4].values)
  // console.log('Productos Maestros:', productos)

  const productos = MOCK_DATA.productos
  const inventario = MOCK_DATA.inventario
  const puntos = MOCK_DATA.puntos
  const marketing = MOCK_DATA.marketing

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
