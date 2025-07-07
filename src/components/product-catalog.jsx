"use client";
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FlavorDialog } from "@/components/flavor-dialog"
import { useStore } from "@/lib/store"
import Image from "next/image"

export function ProductCatalog() {
  const { selectedCity } = useStore()
  const [products, setProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)

  useEffect(() => {
    // TODO: Replace with actual API call to /api/sheets/products
    const mockProducts = [
      {
        id: "1",
        name: "VAPE 3.5K",
        price: 35,
        image: "/placeholder.svg?height=200&width=200",
        description: "Perfecto para principiantes, sabor intenso",
      },
      {
        id: "2",
        name: "VAPE 20K",
        price: 120,
        image: "/placeholder.svg?height=200&width=200",
        description: "El más popular, duración extendida",
      },
      {
        id: "3",
        name: "VAPE 36K",
        price: 200,
        image: "/placeholder.svg?height=200&width=200",
        description: "Premium experience, máxima calidad",
      },
    ]
    setProducts(mockProducts)
  }, [selectedCity])

  return (
    (<div className="space-y-8">
      <h2
        className="text-2xl font-brand text-center bg-gradient-to-r from-[#C1121F] to-[#8B0000] bg-clip-text text-transparent">
        NUESTROS PRODUCTOS
      </h2>
      <div className="grid gap-6">
        {products.map((product) => (
          <Card
            key={product.id}
            className="glass-effect border-gray-700/50 card-hover overflow-hidden">
            <CardContent className="p-0">
              <div className="relative">
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 text-center">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={120}
                    height={120}
                    className="mx-auto rounded-xl mb-4 shadow-lg" />
                  <h3 className="font-brand text-2xl mb-2 text-white">{product.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{product.description}</p>
                  <div className="text-3xl font-bold text-[#C1121F] mb-4">Bs. {product.price}</div>
                  <Button
                    onClick={() => setSelectedProduct(product)}
                    className="w-full bg-gradient-to-r from-[#C1121F] to-[#8B0000] hover:from-[#91090f] hover:to-[#5a0000] text-white font-semibold py-3 rounded-xl shadow-lg transition-all duration-300">
                    ELEGIR SABORES
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {selectedProduct && (
        <FlavorDialog
          product={selectedProduct}
          open={!!selectedProduct}
          onClose={() => setSelectedProduct(null)} />
      )}
    </div>)
  );
}
