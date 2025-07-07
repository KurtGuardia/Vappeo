"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useStore } from "@/lib/store"

export function CouponInput() {
  const [couponCode, setCouponCode] = useState("")
  const [feedback, setFeedback] = useState(null)
  const { applyCoupon } = useStore()

  const handleApplyCoupon = async () => {
    // TODO: Replace with actual API call to /api/sheets/promos
    const mockCoupons = {
      DESCUENTO10: { discount: 10, type: "percentage" },
      PROMO20: { discount: 20, type: "fixed" },
    }

    const coupon = mockCoupons[couponCode.toUpperCase()]

    if (coupon) {
      applyCoupon(coupon)
      setFeedback({ type: "success", message: "Cupón aplicado correctamente" })
    } else {
      setFeedback({ type: "error", message: "Cupón inválido" })
    }

    setTimeout(() => setFeedback(null), 3000)
  }

  return (
    (<div className="space-y-2">
      <div className="flex space-x-2">
        <Input
          placeholder="Código de cupón"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          className="flex-1" />
        <Button
          onClick={handleApplyCoupon}
          variant="outline"
          className="border-[#C1121F] text-[#C1121F] hover:bg-[#C1121F] hover:text-white bg-transparent">
          APLICAR
        </Button>
      </div>
      {feedback && (
        <div
          className={`text-sm ${feedback.type === "success" ? "text-green-400" : "text-red-400"}`}>
          {feedback.message}
        </div>
      )}
    </div>)
  );
}
