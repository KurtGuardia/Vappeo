"use client"

import { useStore } from "@/lib/store"

export function CartTotals() {
  const { subtotal, discount, total } = useStore()

  return (
    (<div className="space-y-2 p-4 bg-gray-900 rounded-lg">
      <div className="flex justify-between">
        <span>Subtotal:</span>
        <span>Bs. {subtotal}</span>
      </div>
      {discount > 0 && (
        <div className="flex justify-between text-green-400">
          <span>Descuento:</span>
          <span>-Bs. {discount}</span>
        </div>
      )}
      <div className="border-t border-gray-700 pt-2">
        <div className="flex justify-between text-4xl font-semibold">
          <span>Total:</span>
          <span className="text-[#C1121F]">Bs. {total}</span>
        </div>
      </div>
    </div>)
  );
}
