'use client'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useStore } from '@/lib/store'
import { Minus, Plus } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'

export function ProductCatalog({ productos, inventario }) {
  const {
    selectedCity,
    cart,
    addFlavorToCart,
    decrementFlavorInCart,
  } = useStore()

  const [animations, setAnimations] = useState({})

  const availableProducts = productos.filter((p) =>
    inventario.some(
      (inv) =>
        inv?.producto_id === p.id &&
        inv?.ciudad?.toLowerCase() === selectedCity,
    ),
  )

  const getStockFlag = (flavor) => {
    if (flavor.etiqueta) return flavor.etiqueta
    if (parseInt(flavor.stock || 0, 10) === 0)
      return 'AGOTADO'
    if (
      parseInt(flavor.stock || 0, 10) > 0 &&
      parseInt(flavor.stock || 0, 10) <= 5
    )
      return 'QUEDAN_POCOS'
    return 'OK'
  }

  const getTagStyles = (flag) => {
    if (!flag || flag === 'OK') {
      return {
        borderClass:
          'border-[var(--foreground)]/5 border-t-2 pt-4',
        message: '',
      }
    }

    switch (flag) {
      case 'QUEDAN_POCOS':
        return {
          borderClass: 'border-amber-600',
          message: 'ÚLTIMAS',
        }
      case 'AGOTADO':
        return {
          borderClass: 'border-red-600/50 opacity-50',
          message: 'AGOTADO',
        }
      case 'TOP':
        return {
          borderClass: 'border-green-600/50',
          message: 'TOP MÁS VENDIDO',
        }
      case 'NUEVO':
        return {
          borderClass: 'border-blue-500/50',
          message: 'NUEVO',
        }
      default:
        return {
          borderClass:
            'border-[var(--foreground)]/5 border-t-2 pt-4',
          message: '',
        }
    }
  }

  return (
    <div className='space-y-8' id='catalog'>
      <h2 className='text-3xl font-brand text-center'>
        NUESTROS PRODUCTOS
      </h2>
      <div className='flex justify-center flex-wrap gap-0 md:gap-[100%]'>
        {availableProducts.map((product) => {
          const cityInventory = inventario.filter(
            (inv) =>
              inv?.producto_id === product.id &&
              inv?.ciudad?.toLowerCase() === selectedCity,
          )

          return (
            <React.Fragment key={product.id}>
              <Card className='glass-effect rounded-2xl overflow-hidden flex flex-col p-3 mx-5'>
                <CardContent className='flex flex-col flex-1 items-center gap-2 text-center text-sm md:text-lg'>
                  <h3 className='font-brand text-2xl'>
                    {product.nombre}
                  </h3>
                  <div className='relative w-md h-96'>
                    <Image
                      src={
                        product.imagen ||
                        '/imgs/placeholder.png'
                      }
                      alt={product.nombre}
                      fill
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                  <p className=''>{product.descripcion}</p>
                  <h4 className='font-bold underline'>
                    Especificaciones:
                  </h4>
                  {product.specs && (
                    <ul className=' list-disc list-inside text-left'>
                      {product.specs
                        .split(',')
                        .map((spec, index) => (
                          <li key={index}>{spec.trim()}</li>
                        ))}
                    </ul>
                  )}
                  <h4 className='font-bold underline'>
                    Incluye:
                  </h4>
                  <p className=''>{product.pack}</p>
                </CardContent>
              </Card>

              {cityInventory.length > 0 && (
                <div className='mt-8 mb-18 mx-5'>
                  <h3 className='pb-3 font-bold text-2xl w-fit m-auto'>
                    Sabores:
                  </h3>
                  <div className='grid grid-cols-2 gap-4'>
                    {cityInventory.map((inv) => {
                      const stockFlag = getStockFlag(inv)
                      const tag = getTagStyles(stockFlag)
                      const stock = parseInt(
                        inv.stock || 0,
                        10,
                      )
                      const cartProduct = cart.find(
                        (item) => item.id === product.id,
                      )
                      const quantity =
                        cartProduct?.flavors.find(
                          (f) => f.name === inv.sabor,
                        )?.quantity || 0
                      const isPlusDisabled =
                        quantity >= stock ||
                        stockFlag === 'AGOTADO'
                      const isMinusDisabled =
                        quantity === 0 ||
                        stockFlag === 'AGOTADO'
                      return (
                        <Card
                          key={inv.sabor}
                          className={`relative rounded-2xl flex flex-col py-0 border-2 border-t-[16px] ${tag.borderClass}`}
                        >
                          {tag.message && (
                            <div className='absolute left-1/2 -top-3.5 -translate-x-1/2 text-xs font-semibold whitespace-nowrap '>
                              {tag.message}
                            </div>
                          )}
                          <CardContent className='p-2 md:p-4 flex flex-col items-center text-center'>
                            <h3 className='text-lg md:text-2xl font-semibold mb-0 md:mb-2'>
                              {inv.sabor}
                            </h3>
                            <div className='relative w-24 h-22 md:h-96 md:w-md'>
                              <Image
                                src={
                                  inv.img ||
                                  '/imgs/placeholder.png'
                                }
                                alt={inv.sabor}
                                fill
                                style={{
                                  objectFit: 'contain',
                                }}
                              />
                            </div>
                            <span className='text-xl font-bold mb-0 md:mb-3'>
                              {inv.precio
                                ? `${inv.precio} Bs.`
                                : ''}
                            </span>
                            <div className='relative flex items-center'>
                              <Button
                                size='sm'
                                variant='outline'
                                onClick={() => {
                                  decrementFlavorInCart({
                                    productId: product.id,
                                    flavorName: inv.sabor,
                                  })
                                  setAnimations((prev) => ({
                                    ...prev,
                                    [inv.sabor]: 'remove',
                                  }))
                                  setTimeout(
                                    () =>
                                      setAnimations(
                                        (prev) => {
                                          const newAnims = {
                                            ...prev,
                                          }
                                          delete newAnims[
                                            inv.sabor
                                          ]
                                          return newAnims
                                        },
                                      ),
                                    2000,
                                  )
                                }}
                                disabled={isMinusDisabled}
                              >
                                <Minus className='h-4 w-4' />
                              </Button>
                              <span className='w-8 text-center text-sm'>
                                {quantity}
                              </span>
                              <Button
                                size='sm'
                                variant='outline'
                                onClick={() => {
                                  addFlavorToCart({
                                    productId: product.id,
                                    productName:
                                      product.nombre,
                                    price: inv.precio,
                                    flavorName: inv.sabor,
                                    maxStock: stock,
                                  })
                                  setAnimations((prev) => ({
                                    ...prev,
                                    [inv.sabor]: 'add',
                                  }))
                                  setTimeout(
                                    () =>
                                      setAnimations(
                                        (prev) => {
                                          const newAnims = {
                                            ...prev,
                                          }
                                          delete newAnims[
                                            inv.sabor
                                          ]
                                          return newAnims
                                        },
                                      ),
                                    2000,
                                  )
                                }}
                                disabled={isPlusDisabled}
                              >
                                <Plus className='h-4 w-4' />
                              </Button>
                              {animations[inv.sabor] ===
                                'add' && (
                                <span className='absolute top-[-24px] -right-8 bg-green-700/60 text-white px-2 py-1 rounded text-xs font-semibold animate-bounce'>
                                  Agregado
                                </span>
                              )}
                              {animations[inv.sabor] ===
                                'remove' && (
                                <span className='absolute top-[-24px] -left-8 bg-red-700/60 text-white px-2 py-1 rounded text-xs font-semibold animate-bounce'>
                                  Quitado
                                </span>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                </div>
              )}
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}
