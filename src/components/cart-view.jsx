'use client'

import dynamic from 'next/dynamic'
import { CartItems } from '@/components/cart-items'
import { CouponInput } from '@/components/coupon-input'
import { CartTotals } from '@/components/cart-totals'
import { Button } from '@/components/ui/button'
import { useStore } from '@/lib/store'
import { useRouter } from 'next/navigation'
import { useUiStore } from '@/lib/ui-store'
import { Checkbox } from '@/components/ui/checkbox'
import { useState } from 'react'

const DeliveryOptions = dynamic(
  () =>
    import('@/components/delivery-options').then(
      (mod) => mod.DeliveryOptions,
    ),
  {
    ssr: false,
    loading: () => (
      <div className='space-y-6 animate-pulse'>
        <div className='h-8 w-1/2 bg-gray-800 rounded-md'></div>
        <div className='h-24 w-full bg-gray-900 rounded-xl'></div>
        <div className='h-24 w-full bg-gray-900 rounded-xl'></div>
      </div>
    ),
  },
)

export function CartView({ promos, puntos }) {
  const { cart, deliveryOption, deliveryDetails } =
    useStore()
  const router = useRouter()
  const { openTermsModal } = useUiStore()
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [showDeliveryError, setShowDeliveryError] =
    useState(false)

  const handleTermsLabelClick = (e) => {
    openTermsModal()
  }

  const goToCheckout = () => {
    let missingFields = false
    if (deliveryOption === 'delivery') {
      if (
        !deliveryDetails.name ||
        !deliveryDetails.phone ||
        !deliveryDetails.address
      ) {
        missingFields = true
      }
    } else if (deliveryOption === 'interior') {
      if (
        !deliveryDetails.name ||
        !deliveryDetails.phone ||
        !deliveryDetails.ci ||
        !deliveryDetails.addressInterior ||
        !deliveryDetails.city
      ) {
        missingFields = true
      }
    }

    setShowDeliveryError(missingFields)
    if (!missingFields) {
      router.push('/checkout')
    }
  }

  if (cart.length === 0) {
    return (
      <div className='px-4 py-8 text-center'>
        <h1 className='text-2xl font-brand mb-4'>
          TU CARRITO ESTÁ VACÍO
        </h1>
        <Button
          onClick={() => router.push('/')}
          className='bg-[#C1121F] hover:bg-[#91090f]'
        >
          CONTINUAR COMPRANDO
        </Button>
      </div>
    )
  }

  return (
    <div className='px-4 space-y-6 pb-24'>
      <h1 className='text-2xl mt-4 font-brand'>
        TU CARRITO
      </h1>
      <CartItems />
      <CouponInput promos={promos} />
      <DeliveryOptions
        venues={puntos}
        showError={showDeliveryError}
      />
      <CartTotals />
      <div className='fixed bottom-0 left-0 right-0 p-4 glass-effect border-t border-gray-800 md:relative md:bg-transparent md:border-0 md:p-0 rounded-xl'>
        <div className='flex items-center py-3 md:py-8 px-3 space-x-2'>
          <Checkbox
            id='terms'
            checked={acceptTerms}
            onCheckedChange={setAcceptTerms}
            className={'bg-gray-900 border-gray-600'}
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
          onClick={() => goToCheckout()}
          disabled={!acceptTerms}
        >
          CONTINUAR AL PAGO
        </Button>
      </div>
    </div>
  )
}
