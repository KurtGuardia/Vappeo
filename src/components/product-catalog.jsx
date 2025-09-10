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
        inv?.producto_id === p.id &&
        inv?.ciudad?.toLowerCase() === selectedCity,
    ),
  )

  return (
    <div className='space-y-8' id='catalog'>
      <h2 className='text-2xl font-brand text-center'>
        NUESTROS PRODUCTOS
      </h2>
      <div className='flex justify-center flex-wrap gap-12'>
        {availableProducts.map((product) => {
          // const cityInventoryItem = inventario.find(
          //   (inv) =>
          //     inv?.producto_id === product.id &&
          //     inv?.ciudad?.toLowerCase() === selectedCity,
          // )
          // // Fallback price if somehow not found, though your filter logic prevents this.
          // const price = cityInventoryItem.precio
          //   ? cityInventoryItem.precio
          //   : '[consultar]'

          return (
            <Card
              key={product.id}
              className='glass-effect rounded-2xl overflow-hidden flex flex-col w-ful md:w-1/4'
            >
              <CardContent className='p-6 flex flex-col flex-1 items-center text-center'>
                <div className='relative w-32 h-32 mb-4'>
                  <Image
                    src={
                      product.imagen || '/placeholder.svg'
                    }
                    alt={product.nombre}
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </div>
                <div className='flex-1'>
                  <h3 className='font-brand text-2xl'>
                    {product.nombre}
                  </h3>
                  <p className='00 text-sm mt-1 mb-4'>
                    {product.descripcion}
                  </p>
                  <h4 className='pb-3 font-bold underline'>
                    Especificaciones:
                  </h4>
                  {product.specs && (
                    <ul className='text-sm list-disc list-inside mb-4 text-left'>
                      {product.specs
                        .split(',')
                        .map((spec, index) => (
                          <li key={index}>{spec.trim()}</li>
                        ))}
                    </ul>
                  )}
                  <h4 className='pb-3 font-bold underline'>
                    Incluye:
                  </h4>
                  <p className='00 text-sm mt-1 mb-4'>
                    {product.pack}
                  </p>
                </div>

                <Button
                  onClick={() =>
                    setSelectedProduct({
                      ...product,
                      // price: parseFloat(price),
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
              inv?.producto_id === selectedProduct.id &&
              inv?.ciudad?.toLowerCase() === selectedCity,
          )}
          open={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  )
}
