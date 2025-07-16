// src/app/checkout/page.jsx

import {
  getSheetsData,
  sheetsDataToObject,
} from '@/lib/sheets'
import { CheckoutView } from '@/components/checkout-view' // Import our new client component

// This is a Server Component, so we can make it async
export default async function CheckoutPage() {
  // 1. Fetch only the data this page needs: Puntos
  const data = await getSheetsData(['Puntos'])

  // 2. Handle potential API errors gracefully
  if (!data) {
    throw new Error(
      'No se pudieron cargar los datos para el checkout. Por favor, intente de nuevo.',
    )
  }

  // 3. Process the data safely
  const puntos = data[0]?.values
    ? sheetsDataToObject(data[0].values)
    : []

  // 4. Render the client component and pass the live data down as a prop
  return <CheckoutView puntos={puntos} />
}
