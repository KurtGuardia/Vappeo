"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { useStore } from "@/lib/store"

export function CartItems() {
  const { cart, removeFromCart } = useStore()

  return (
    (<div className="space-y-4">
      {cart.map((item, index) => (
        <Card key={index} className="bg-gray-900 border-gray-700">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-brand text-lg">{item.name}</h3>
                <div className="space-y-1 mt-2">
                  {item.flavors.map((flavor, flavorIndex) => (
                    <div key={flavorIndex} className="text-sm text-gray-400">
                      {flavor.name} × {flavor.quantity}
                    </div>
                  ))}
                </div>
                <div className="text-lg font-semibold text-[#C1121F] mt-2">
                  Bs. {item.price * item.flavors.reduce((sum, f) => sum + f.quantity, 0)}
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeFromCart(index)}
                className="text-red-400 hover:text-red-300 hover:bg-red-900/20">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>)
  );
}
