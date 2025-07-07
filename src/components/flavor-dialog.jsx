"use client";
import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useStore } from "@/lib/store"
import { Minus, Plus } from "lucide-react"

export function FlavorDialog({
  product,
  open,
  onClose
}) {
  const { addToCart } = useStore()
  const [flavors, setFlavors] = useState([])
  const [totalQuantity, setTotalQuantity] = useState(0)

  useEffect(() => {
    // TODO: Replace with actual API call to /api/sheets/products/{id}/flavors
    const mockFlavors = [
      { id: "1", name: "Menta Fresca", stockFlag: "TOP_24H" },
      { id: "2", name: "Frutas del Bosque" },
      { id: "3", name: "Sandía", stockFlag: "QUEDAN_5" },
      { id: "4", name: "Uva" },
      { id: "5", name: "Mango" },
      { id: "6", name: "Fresa", stockFlag: "AGOTADO" },
    ]

    setFlavors(mockFlavors.map((f) => ({ ...f, quantity: 0 })))
  }, [product.id])

  useEffect(() => {
    setTotalQuantity(flavors.reduce((sum, f) => sum + f.quantity, 0))
  }, [flavors])

  const updateQuantity = (flavorId, change) => {
    setFlavors((prev) =>
      prev.map(
        (f) => (f.id === flavorId ? { ...f, quantity: Math.max(0, f.quantity + change) } : f)
      ))
  }

  const handleAddToCart = () => {
    const selectedFlavors = flavors.filter((f) => f.quantity > 0)
    if (selectedFlavors.length > 0) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        flavors: selectedFlavors,
      })
      onClose()
    }
  }

  const getFlavorStyles = (flag) => {
    if (!flag || flag === "OK") {
      return {
        containerClass: "bg-gray-900 border-gray-700",
        borderClass: "",
        message: "",
        messageColor: "",
      }
    }

    switch (flag) {
      case "QUEDAN_5":
        return {
          containerClass: "bg-gray-900 border-amber-600",
          borderClass: "border-b-4 border-b-amber-600",
          message: "ÚLTIMAS 5",
          messageColor: "text-amber-200",
        }
      case "AGOTADO":
        return {
          containerClass: "bg-gray-900 border-red-600 opacity-60",
          borderClass: "border-b-4 border-b-red-600",
          message: "AGOTADO",
          messageColor: "text-red-200",
        }
      case "TOP_24H":
        return {
          containerClass: "bg-gray-900 border-[#C1121F]",
          borderClass: "border-b-4 border-b-[#C1121F]",
          message: "TOP 24H",
          messageColor: "text-red-200",
        }
      default:
        return {
          containerClass: "bg-gray-900 border-gray-700",
          borderClass: "",
          message: "",
          messageColor: "",
        }
    }
  }

  return (
    (<Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="bg-black border-gray-700 max-w-sm mx-auto max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-brand text-xl">{product.name} - SABORES</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {flavors.map((flavor) => {
            const styles = getFlavorStyles(flavor.stockFlag)
            return (
              (<div
                key={flavor.id}
                className={`relative flex items-center justify-between p-3 rounded-lg border ${styles.containerClass} ${styles.borderClass}`}>
                <div className="flex-1">
                  <span>{flavor.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateQuantity(flavor.id, -1)}
                    disabled={flavor.quantity === 0 || flavor.stockFlag === "AGOTADO"}>
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    type="number"
                    value={flavor.quantity}
                    onChange={(e) => {
                      const newQuantity = Math.max(0, Number.parseInt(e.target.value) || 0)
                      setFlavors(
                        (prev) => prev.map((f) => (f.id === flavor.id ? { ...f, quantity: newQuantity } : f))
                      )
                    }}
                    className="w-16 text-center"
                    min="0"
                    disabled={flavor.stockFlag === "AGOTADO"} />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateQuantity(flavor.id, 1)}
                    disabled={flavor.stockFlag === "AGOTADO"}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {styles.message && (
                  <div
                    className={`absolute bottom-0 right-2 text-xs font-semibold ${styles.messageColor} transform translate-y-1/2`}>
                    {styles.message}
                  </div>
                )}
              </div>)
            );
          })}

          <div className="border-t border-gray-700 pt-4">
            <div className="text-lg font-semibold mb-4">Total: {totalQuantity} unidades</div>
            <Button
              className="w-full bg-[#C1121F] hover:bg-[#91090f]"
              onClick={handleAddToCart}
              disabled={totalQuantity === 0}>
              AGREGAR AL CARRITO
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>)
  );
}
