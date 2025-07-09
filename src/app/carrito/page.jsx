import {
  getSheetsData,
  sheetsDataToObject,
} from '@/lib/sheets'
import { CartView } from '@/components/cart-view'

export default async function CartPage() {
  const mockPromos = [
    {
      codigo: 'BIENVENIDO',
      tipo: 'porcentaje',
      valor: '10',
      activo: 'Si',
    },
    {
      codigo: 'VAPPEO20',
      tipo: 'fijo',
      valor: '20',
      activo: 'Si',
    },
  ]
  const mockPuntos = [
    {
      id: 'cbba-norte',
      ciudad: 'Cochabamba',
      nombre: 'Sucursal Norte',
      direccion: 'Av. América #123',
    },
    {
      id: 'scz-centro',
      ciudad: 'Santa Cruz',
      nombre: 'Punto Central SCZ',
      direccion: 'Calle 21 de Mayo',
    },
  ]

  // const data = await getSheetsData(['Promo', 'Puntos']);
  // const promos = data ? sheetsDataToObject(data[0].values) : mockPromos;
  // const puntos = data ? sheetsDataToObject(data[1].values) : mockPuntos;

  return (
    <CartView promos={mockPromos} puntos={mockPuntos} />
  )
}
