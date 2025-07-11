'use client'
import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useStore } from '@/lib/store'
import { Minus, Plus } from 'lucide-react'

export function FlavorDialog({
  product,
  inventario,
  open,
  onClose,
}) {
  const { cart, setCartItem } = useStore()
  const [flavors, setFlavors] = useState([])

  useEffect(() => {
    // This effect now runs when the dialog opens OR if the cart changes while it's open.
    const cartProduct = cart.find(
      (item) => item.id === product.id,
    )

    // Initialize the dialog's state based on inventory AND what's already in the cart.
    const initialFlavors = inventario.map((inv) => {
      const quantityInCart =
        cartProduct?.flavors.find(
          (f) => f.name === inv.sabor,
        )?.quantity || 0
      return {
        id: inv.sabor,
        name: inv.sabor,
        stock: parseInt(inv.stock || 0, 10),
        etiqueta: inv.etiqueta,
        quantity: quantityInCart, // Start with the quantity from the cart
      }
    })
    setFlavors(initialFlavors)
  }, [open, product.id, inventario, cart]) // Depend on `cart` to react to changes

  const totalQuantity = flavors.reduce(
    (sum, f) => sum + f.quantity,
    0,
  )

  const updateQuantity = (flavorId, change) => {
    setFlavors((prevFlavors) =>
      prevFlavors.map((f) => {
        if (f.id === flavorId) {
          // The new quantity is clamped between 0 and the total available stock.
          const newQuantity = Math.min(
            f.stock,
            Math.max(0, f.quantity + change),
          )
          return { ...f, quantity: newQuantity }
        }
        return f
      }),
    )
  }

  const handleSetCartItem = () => {
    const selectedFlavors = flavors
      .filter((f) => f.quantity > 0)
      .map(({ id, name, quantity }) => ({ name, quantity })) // Clean up the object for the store

    if (selectedFlavors.length > 0) {
      setCartItem({
        id: product.id,
        name: product.nombre,
        price: product.price,
        flavors: selectedFlavors,
      })
      onClose()
    }
  }

  const getStockFlag = (flavor) => {
    if (flavor.etiqueta) return flavor.etiqueta
    if (flavor.stock === 0) return 'AGOTADO'
    if (flavor.stock > 0 && flavor.stock <= 5)
      return 'QUEDAN_POCOS'
    return 'OK'
  }

  const getFlavorStyles = (flag) => {
    if (!flag || flag === 'OK') {
      return {
        containerClass: 'bg-gray-900 border-gray-700',
        borderClass: '',
        message: '',
        messageColor: '',
      }
    }

    switch (flag) {
      case 'QUEDAN_POCOS':
        return {
          containerClass: 'bg-gray-900 border-amber-600',
          borderClass: 'border-b-14 border-b-amber-600',
          message: 'ÚLTIMAS',
        }
      case 'AGOTADO':
        return {
          containerClass:
            'bg-gray-900 border-red-600 opacity-60',
          borderClass: 'border-b-14 border-b-red-600',
          message: 'AGOTADO',
        }
      case 'TOP':
        return {
          containerClass: 'bg-gray-900 border-green-600',
          borderClass: 'border-b-14 border-b-green-600',
          message: 'TOP MÁS VENDIDO',
        }
      case 'NUEVO':
        return {
          containerClass: 'bg-gray-900 border-blue-500',
          borderClass: 'border-b-14 border-b-blue-500',
          message: 'NUEVO',
        }
      default:
        return {
          containerClass: 'bg-gray-900 border-gray-700',
          borderClass: '',
          message: '',
        }
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className='bg-black border-gray-700 max-w-sm mx-auto max-h-[80vh] overflow-y-auto'
      >
        <DialogHeader>
          <DialogTitle className='font-brand text-xl'>
            {product.nombre} - SABORES
          </DialogTitle>
        </DialogHeader>

        <div className='space-y-4'>
          {flavors.map((flavor) => {
            const stockFlag = getStockFlag(flavor)
            const styles = getFlavorStyles(stockFlag)
            const isPlusDisabled =
              flavor.quantity >= flavor.stock ||
              stockFlag === 'AGOTADO'
            const isMinusDisabled =
              flavor.quantity === 0 ||
              stockFlag === 'AGOTADO'
            return (
              <div
                key={flavor.id}
                className={`text-white relative flex items-center justify-between p-3 rounded-lg border ${styles.containerClass} ${styles.borderClass}`}
              >
                <div className='flex-1'>
                  <span>{flavor.name}</span>
                </div>
                <div className='flex items-center space-x-2'>
                  <Button
                    size='sm'
                    variant='outline'
                    onClick={() =>
                      updateQuantity(flavor.id, -1)
                    }
                    disabled={isMinusDisabled}
                  >
                    <Minus className='h-4 w-4' />
                  </Button>
                  <Input
                    type='number'
                    value={flavor.quantity}
                    onChange={(e) => {
                      const newQuantity = Math.max(
                        0,
                        Number.parseInt(e.target.value) ||
                          0,
                      )
                      setFlavors((prev) =>
                        prev.map((f) =>
                          f.id === flavor.id
                            ? {
                                ...f,
                                quantity: newQuantity,
                              }
                            : f,
                        ),
                      )
                    }}
                    readOnly
                    className='w-16 text-center bg-gray-800 cursor-default focus:ring-0'
                    min='0'
                    max={flavor.stock}
                    disabled={
                      flavor.stockFlag === 'AGOTADO'
                    }
                  />
                  <Button
                    size='sm'
                    variant='outline'
                    onClick={() =>
                      updateQuantity(flavor.id, 1)
                    }
                    disabled={isPlusDisabled}
                  >
                    <Plus className='h-4 w-4' />
                  </Button>
                </div>
                {styles.message && (
                  <div
                    className={`absolute -bottom-2 right-2 text-xs tracking-widest font-semibold transform translate-y-1/2`}
                  >
                    {styles.message}
                  </div>
                )}
              </div>
            )
          })}

          <div className='border-t border-gray-700 pt-4'>
            <div className='text-lg font-semibold mb-4'>
              Total: {totalQuantity} unidades
            </div>
            <Button
              className='w-full bg-[#C1121F] hover:bg-[#91090f]'
              onClick={handleSetCartItem}
              disabled={totalQuantity === 0}
            >
              AGREGAR AL CARRITO
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
