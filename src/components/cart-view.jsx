'use client'

import dynamic from 'next/dynamic'
import { CartItems } from '@/components/cart-items'
import { CouponInput } from '@/components/coupon-input'
import { CartTotals } from '@/components/cart-totals'
import { Button } from '@/components/ui/button'
import { useStore } from '@/lib/store'
import { useRouter } from 'next/navigation'

const DeliveryOptions = dynamic(
  () =>
    import('@/components/delivery-options').then(
      (mod) => mod.DeliveryOptions,
    ),
  {
    ssr: false, // This is the crucial part
    loading: () => (
      // A loading skeleton that matches the component's approximate size
      <div className='space-y-6 animate-pulse'>
        <div className='h-8 w-1/2 bg-gray-800 rounded-md'></div>
        <div className='h-24 w-full bg-gray-900 rounded-xl'></div>
        <div className='h-24 w-full bg-gray-900 rounded-xl'></div>
      </div>
    ),
  },
)

export function CartView({ promos, puntos }) {
  const { cart } = useStore()
  const router = useRouter()

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
      <DeliveryOptions venues={puntos} />
      <CartTotals />
      <div className='fixed bottom-0 left-0 right-0 p-4 glass-effect border-t border-gray-800 md:relative md:bg-transparent md:border-0 md:p-0'>
        <Button
          className='w-full bg-[#C1121F] hover:bg-[#91090f] text-lg font-semibold'
          onClick={() => router.push('/checkout')}
        >
          CONTINUAR AL PAGO
        </Button>
      </div>
    </div>
  )
}
