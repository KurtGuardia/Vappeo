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
  const [qrMessage, setQrMessage] = useState('')

  useEffect(() => {
    if (deliveryOption === 'interior') {
      // Logic for "Envío al Interior"
      setQrSrc('/qrs/qr-abierto.png')
      setQrMessage(
        'Se necesita coordinar via WhatsApp para el envío. Luego usar este QR abierto:',
      )
    } else {
      // Logic for all other delivery types
      setQrSrc(`/qrs/qr-${total}.png`)
      // Check for fallback QR for standard orders
      // Note: we can't use onError here because the initial src might be the fallback
      // This logic assumes you have a way to know if qr-${total}.png exists.
      // For now, we'll reset the message.
      setQrMessage('')
    }
  }, [total, deliveryOption])

  const { puntos } = require('@/lib/mock-data').MOCK_DATA

  const selectedPickupPoint = puntos.find(
    (p) => p.id === pickupPointId,
  )

  const generateWhatsAppMessage = () => {
    // --- SPECIAL CASE: ENVÍO AL INTERIOR ---
    if (deliveryOption === 'interior') {
      const messageParts = []
      const shippingMethod = deliveryDetails.urgent
        ? 'por avión'
        : 'por tierra'

      // A clearer header for this specific purpose
      messageParts.push(
        ' ✦  *Solicitud de Cotización (Envío al Interior)*  ✦ ',
      )
      messageParts.push('')

      // Customer and destination details
      messageParts.push('*Datos del Cliente:*')
      messageParts.push(
        `${' '}• *Nombre:* _${deliveryDetails.name}_`,
      )
      messageParts.push(
        `${' '}• *C.I.:* _${deliveryDetails.ci}_`,
      )
      messageParts.push(
        `${' '}• *Teléfono:* ${deliveryDetails.phone}`,
      )
      messageParts.push(
        `${' '}• *Ciudad Destino:* _${
          deliveryDetails.city
        }_`,
      )
      messageParts.push(
        `${' '}• *Dirección:* _${deliveryDetails.address}_`,
      )
      messageParts.push(
        `${' '}• *Método de Envío:* _${shippingMethod}_`,
      )
      messageParts.push('')

      // THE KEY CHANGE: Detailed product list
      messageParts.push('*Productos a Cotizar:*')
      cart.forEach((item) => {
        const totalUnits = item.flavors.reduce(
          (sum, f) => sum + f.quantity,
          0,
        )
        const flavorDetails = item.flavors
          .map((f) => `${f.name} × ${f.quantity}`)
          .join(', ')
        // Use the same detailed format as the other messages
        messageParts.push(
          `• _${item.name}_ → ${flavorDetails} *(${totalUnits} u)*`,
        )
      })

      messageParts.push('')

      // Include the subtotal of the products for clarity
      messageParts.push(
        `*Subtotal de Productos:* ${subtotal.toFixed(
          2,
        )} Bs`,
      )
      messageParts.push('')

      // The final call to action
      messageParts.push(
        '*Por favor, cotizar el costo de envío para completar el pago total.*',
      )

      // Use the reliable encoding method
      const finalMessage = messageParts.join('\n')
      return finalMessage.replace(/\n/g, '%0A')
    }

    // --- DEFAULT CASE: PICKUP & DELIVERY ---
    // (This part remains unchanged from your last working version)
    const messageParts = []
    messageParts.push(' ✦  *Pedido Vappeo*  ✦ ')
    messageParts.push(`*Ciudad:* _${selectedCity}_`)
    messageParts.push('')

    if (deliveryOption === 'pickup') {
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
    } else {
      // 'delivery'
      messageParts.push('*Método:* _Entrega a domicilio_')
      messageParts.push(
        `*Cliente:* _${deliveryDetails.name}_`,
      )
      if (deliveryDetails.phone)
        messageParts.push(`*Tel:* ${deliveryDetails.phone}`)
      messageParts.push(
        `*Dirección:* _${deliveryDetails.address}_`,
      )
      if (deliveryDetails.lat && deliveryDetails.lng) {
        const mapsLink = `https://maps.google.com/?q=${deliveryDetails.lat},${deliveryDetails.lng}`
        messageParts.push(`*Ubicación (Maps):* ${mapsLink}`)
      }
      if (deliveryDetails.observations)
        messageParts.push(
          `*Obs:* _${deliveryDetails.observations}_`,
        )
    }

    messageParts.push('')
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
    messageParts.push('*Resumen de Pago:*')
    messageParts.push(
      `*Subtotal:* ${subtotal.toFixed(2)} Bs`,
    )
    if (discount > 0)
      messageParts.push(
        `*Cupón:* -${discount.toFixed(2)} Bs`,
      )
    messageParts.push(
      `*Total a pagar:* *${total.toFixed(2)} Bs*`,
    )
    messageParts.push('')
    messageParts.push(
      ` ✦  _Adjunto comprobante del QR de ${total.toFixed(
        2,
      )} Bs_  ✦ `,
    )
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
            {deliveryOption === 'interior'
              ? 'CONTACTO INICIAL'
              : 'ESCANEA PARA PAGAR'}
          </div>
          {qrMessage && (
            <p className='text-amber-400 font-semibold mb-3 text-center'>
              {qrMessage}
            </p>
          )}
          {qrSrc && (
            <div className='bg-white p-4 rounded-lg inline-block'>
              <Image
                src={qrSrc}
                alt='Código QR'
                width={200}
                height={200}
              />
            </div>
          )}
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
