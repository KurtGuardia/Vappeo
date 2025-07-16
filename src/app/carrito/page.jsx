import {
  getSheetsData,
  sheetsDataToObject,
} from '@/lib/sheets'
import { CartView } from '@/components/cart-view'

export default async function CartPage() {
  const data = await getSheetsData(['Promo', 'Puntos'])
  const promos = data && sheetsDataToObject(data[0].values)

  const puntos = data && sheetsDataToObject(data[1].values)

  return <CartView promos={promos} puntos={puntos} />
}
