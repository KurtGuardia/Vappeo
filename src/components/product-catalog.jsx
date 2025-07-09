'use client'
import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FlavorDialog } from '@/components/flavor-dialog'
import { useStore } from '@/lib/store'
import Image from 'next/image'

export function ProductCatalog({ productos, inventario }) {
  const { selectedCity } = useStore()
  const [selectedProduct, setSelectedProduct] =
    useState(null)

  const availableProducts = productos.filter((p) =>
    inventario.some(
      (inv) =>
        inv.producto_id === p.id &&
        inv.ciudad.toLowerCase() === selectedCity,
    ),
  )

  return (
    <div className='space-y-8'>
      <h2 className='text-2xl font-brand text-center bg-gradient-to-r from-[#C1121F] to-[#8B0000] bg-clip-text text-transparent'>
        NUESTROS PRODUCTOS
      </h2>
      <div className='grid gap-6'>
        {availableProducts.map((product) => {
          const cityInventoryItem = inventario.find(
            (inv) =>
              inv.producto_id === product.id &&
              inv.ciudad.toLowerCase() === selectedCity,
          )
          // Fallback price if somehow not found, though your filter logic prevents this.
          const price = cityInventoryItem
            ? cityInventoryItem.precio
            : 'N/A'

          return (
            <Card
              key={product.id}
              className='glass-effect rounded-2xl overflow-hidden flex flex-col'
            >
              <CardContent className='p-6 flex flex-col flex-1 items-center text-center'>
                <div className='relative w-32 h-32 mb-4'>
                  <Image
                    src={
                      product.imagen || '/placeholder.svg'
                    }
                    alt={product.nombre}
                    layout='fill'
                    objectFit='contain'
                  />
                </div>
                <div className='flex-1'>
                  <h3 className='font-brand text-2xl'>
                    {product.nombre}
                  </h3>
                  <p className='text-gray-400 text-sm mt-1 mb-4'>
                    {product.descripcion}
                  </p>
                </div>
                <div className='text-3xl font-bold text-[#C1121F] mb-4'>
                  Bs. {price}
                </div>
                <Button
                  onClick={() =>
                    setSelectedProduct({
                      ...product,
                      // Pass the correct numeric price to the dialog
                      price: parseFloat(price),
                    })
                  }
                  className='w-full bg-[#C1121F] hover:bg-[#91090f] text-lg font-semibold'
                >
                  ELEGIR SABORES
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
      {selectedProduct && (
        <FlavorDialog
          product={selectedProduct}
          inventario={inventario.filter(
            (inv) =>
              inv.producto_id === selectedProduct.id &&
              inv.ciudad.toLowerCase() === selectedCity,
          )}
          open={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  )
}
