"use client"

import { CartItems } from "@/components/cart-items"
import { CouponInput } from "@/components/coupon-input"
import { DeliveryOptions } from "@/components/delivery-options"
import { CartTotals } from "@/components/cart-totals"
import { Button } from "@/components/ui/button"
import { useStore } from "@/lib/store"
import { useRouter } from "next/navigation"

export default function CartPage() {
  const { cart, total } = useStore()
  const router = useRouter()

  if (cart.length === 0) {
    return (
      (<div className="px-4 py-8 text-center">
        <h1 className="text-2xl font-brand mb-4">TU CARRITO ESTÁ VACÍO</h1>
        <Button
          onClick={() => router.push("/")}
          className="bg-[#C1121F] hover:bg-[#91090f]">
          CONTINUAR COMPRANDO
        </Button>
      </div>)
    );
  }

  return (
    (<div className="px-4 space-y-6">
      <h1 className="text-2xl font-brand">TU CARRITO</h1>
      <CartItems />
      <CouponInput />
      <DeliveryOptions />
      <CartTotals />
      <div
        className="fixed bottom-20 left-0 right-0 p-4 bg-black border-t border-gray-800">
        <Button
          className="w-full bg-[#C1121F] hover:bg-[#91090f] text-lg font-semibold"
          onClick={() => router.push("/checkout")}>
          CONTINUAR AL PAGO
        </Button>
      </div>
    </div>)
  );
}
