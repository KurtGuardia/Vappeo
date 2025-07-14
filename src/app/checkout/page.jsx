'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { useStore } from '@/lib/store'
import { useUiStore } from '@/lib/ui-store'

export default function CheckoutPage() {
  const {
    cart,
    total,
    subtotal,
    discount,
    selectedCity,
    deliveryOption,
    pickupPointId,
    deliveryDetails,
  } = useStore()
  const { openTermsModal } = useUiStore()
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [qrSrc, setQrSrc] = useState(`/qrs/qr-${total}.png`)
  const [isFallbackQr, setIsFallbackQr] = useState(false)

  useEffect(() => {
    setQrSrc(`/qrs/qr-${total}.png`)
    setIsFallbackQr(false)
  }, [total])

  const { puntos } = require('@/lib/mock-data').MOCK_DATA

  const selectedPickupPoint = puntos.find(
    (p) => p.id === pickupPointId,
  )

  const generateWhatsAppMessage = () => {
    // Array-based builder is more robust
    const messageParts = []

    // --- Header ---
    messageParts.push('✦  *Pedido Vappeo*  ✦')
    messageParts.push(`*Ciudad:* _${selectedCity}_`)
    messageParts.push('')

    // --- Delivery Info ---
    switch (deliveryOption) {
      case 'pickup':
        messageParts.push('*Método:* _Recoger en tienda_')
        messageParts.push(
          `*Punto:* _${
            selectedPickupPoint?.nombre || 'No seleccionado'
          }_`,
        )
        if (selectedPickupPoint?.direccion) {
          messageParts.push(
            `*Dirección:* _${selectedPickupPoint.direccion}_`,
          )
        }
        break

      case 'delivery':
        messageParts.push('*Método:* _Entrega a domicilio_')
        messageParts.push(
          `*Cliente:* _${deliveryDetails.name}_`,
        )
        if (deliveryDetails.phone)
          messageParts.push(
            `*Tel:* _${deliveryDetails.phone}_`,
          )
        messageParts.push(
          `*Dirección:* _${deliveryDetails.address}_`,
        )

        // THE NEW LOGIC IS HERE:
        // Conditionally add the Google Maps link if lat/lng exist.
        if (deliveryDetails.lat && deliveryDetails.lng) {
          const mapsLink = `https://maps.google.com/?q=${deliveryDetails.lat},${deliveryDetails.lng}`
          messageParts.push(
            `*Ubicación (Maps):* ${mapsLink}`,
          )
        }

        if (deliveryDetails.observations)
          messageParts.push(
            `*Obs:* _${deliveryDetails.observations}_`,
          )
        break

      case 'interior':
        messageParts.push('*Método:* _Envío al interior_')
        messageParts.push(
          `*Cliente:* _${deliveryDetails.name}_`,
        )
        if (deliveryDetails.phone)
          messageParts.push(
            `*Tel:* _${deliveryDetails.phone}_`,
          )
        messageParts.push(
          `*Ciudad Destino:* _${deliveryDetails.city}_`,
        )
        messageParts.push(
          `*Dirección:* _${deliveryDetails.address}_`,
        )
        if (deliveryDetails.urgent)
          messageParts.push('*(ENVÍO URGENTE)*')
        break
    }

    messageParts.push('')

    // --- Products ---
    messageParts.push('*Productos:*')
    cart.forEach((item) => {
      const totalUnits = item.flavors.reduce(
        (sum, f) => sum + f.quantity,
        0,
      )
      const flavorDetails = item.flavors
        .map((f) => `${f.name} × ${f.quantity}`)
        .join(', ')
      messageParts.push(
        `• _${item.name}_ → ${flavorDetails} *(${totalUnits} u)*`,
      )
    })

    messageParts.push('')

    // --- Totals ---
    messageParts.push('*Resumen de Pago:*')
    messageParts.push(
      `*Subtotal:* ${subtotal.toFixed(2)} Bs`,
    )
    if (discount > 0) {
      messageParts.push(
        `*Cupón:* -${discount.toFixed(2)} Bs`,
      )
    }
    messageParts.push(
      `*Total a pagar:* *${total.toFixed(2)} Bs*`,
    )

    messageParts.push('')

    // --- Footer ---
    messageParts.push(
      ` ✦  _Adjunto comprobante del QR de ${total.toFixed(
        2,
      )} Bs_  ✦ `,
    )

    // Use the reliable method for encoding newlines
    const finalMessage = messageParts.join('\n')
    return finalMessage.replace(/\n/g, '%0A')
  }

  const handleTermsLabelClick = (e) => {
    // This allows the checkbox to still be toggled, but also opens the modal.
    // It's a better UX than preventing the default action.
    openTermsModal()
  }

  return (
    <div className='px-4 space-y-6 pb-24'>
      <h1 className='text-2xl font-brand'>
        CONFIRMAR PEDIDO
      </h1>
      <Card className='bg-gray-900 border-gray-700'>
        <CardHeader>
          <CardTitle className='font-brand'>
            RESUMEN DEL PEDIDO
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          {cart.map((item, index) => (
            <div
              key={index}
              className='border-b border-gray-700 pb-2'
            >
              <div className='font-semibold'>
                {item.name}
              </div>
              <div className='text-sm text-gray-400'>
                {item.flavors
                  .map((f) => `${f.name} (${f.quantity})`)
                  .join(', ')}
              </div>
              <div className='text-right'>
                Bs.{' '}
                {item.price *
                  item.flavors.reduce(
                    (sum, f) => sum + f.quantity,
                    0,
                  )}
              </div>
            </div>
          ))}
          <div className='text-xl font-semibold text-right'>
            Total: Bs. {total}
          </div>
        </CardContent>
      </Card>
      <div className='text-center'>
        <div className='mb-4'>
          <div className='text-lg font-semibold mb-2'>
            ESCANEA PARA PAGAR
          </div>
          <div className='bg-white p-4 rounded-lg inline-block'>
            <Image
              src={qrSrc}
              alt='QR de pago'
              width={200}
              height={200}
              onError={() => {
                setQrSrc('/qrs/qr-abierto.png') // The fallback QR
                setIsFallbackQr(true)
              }}
            />
            {isFallbackQr && (
              <p className='text-sm text-amber-400 mt-2'>
                Monto no encontrado. Escanea este QR e
                ingresa manualmente: <b>Bs. {total}</b>
              </p>
            )}
          </div>
        </div>
      </div>
      <div className='flex items-center space-x-2'>
        <Checkbox
          id='terms'
          checked={acceptTerms}
          onCheckedChange={setAcceptTerms}
        />
        <label htmlFor='terms' className='text-sm'>
          Acepto los{' '}
          <span
            onClick={handleTermsLabelClick}
            className='underline text-[#C1121F] cursor-pointer'
          >
            Términos y Condiciones
          </span>
        </label>
      </div>
      <Button
        className='w-full bg-[#C1121F] hover:bg-[#91090f] text-lg font-semibold'
        disabled={!acceptTerms}
        onClick={() => {
          window.open(
            `https://wa.me/${
              process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
            }?text=${generateWhatsAppMessage()}`,
            '_blank',
          )
        }}
      >
        CONFIRMAR POR WHATSAPP
      </Button>
    </div>
  )
}
