'use client'

import { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { useStore } from '@/lib/store'
import Image from 'next/image'

export default function CheckoutPage() {
  const { cart, total, selectedCity, deliveryOption } =
    useStore()
  const [acceptTerms, setAcceptTerms] = useState(false)

  const [qrSrc, setQrSrc] = useState(`/qrs/qr-${total}.png`)
  const [isFallbackQr, setIsFallbackQr] = useState(false)

  useEffect(() => {
    setQrSrc(`/qrs/qr-${total}.png`)
    setIsFallbackQr(false)
  }, [total])

  const generateWhatsAppMessage = () => {
    const items = cart
      .map(
        (item) =>
          `${item.name} - ${item.flavors
            .map((f) => `${f.name} (${f.quantity})`)
            .join(', ')}`,
      )
      .join('\n')

    return encodeURIComponent(
      `¡Hola! Quiero confirmar mi pedido:\n\n${items}\n\nCiudad: ${selectedCity}\nEntrega: ${deliveryOption}\nTotal: Bs. ${total}\n\n¡Gracias!`,
    )
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
          Acepto los Términos y Condiciones
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
