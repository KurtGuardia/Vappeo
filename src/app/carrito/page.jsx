import {
  getSheetsData,
  sheetsDataToObject,
} from '@/lib/sheets'
import { MOCK_DATA } from '@/lib/mock-data'
import { CartView } from '@/components/cart-view'

export default async function CartPage() {
  const { promos, puntos } = MOCK_DATA

  // const data = await getSheetsData(['Promo', 'Puntos']);
  // const promos = data ? sheetsDataToObject(data[0].values) : mockPromos;
  // const puntos = data ? sheetsDataToObject(data[1].values) : mockPuntos;

  return <CartView promos={promos} puntos={puntos} />
}
