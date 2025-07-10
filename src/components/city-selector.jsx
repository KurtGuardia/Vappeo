'use client'

import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { useStore } from '@/lib/store'
import { useState } from 'react'
import { ConfirmationDialog } from './confirmation-dialog'

export function CitySelector() {
  const { selectedCity, cart, changeCityAndClearCart } =
    useStore()

  // State to manage the dialog
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [targetCity, setTargetCity] = useState('')

  const handleCityChange = (newCity) => {
    // Do nothing if the city is the same
    if (newCity === selectedCity) {
      return
    }

    // If the cart is empty, change city directly without confirmation
    if (cart.length === 0) {
      changeCityAndClearCart(newCity)
      return
    }

    // If the cart has items, open the confirmation dialog
    setTargetCity(newCity)
    setIsModalOpen(true)
  }

  const handleConfirmChange = () => {
    if (targetCity) {
      changeCityAndClearCart(targetCity)
    }
  }

  return (
    <>
      <div className='space-y-6'>
        <h2 className='text-2xl font-brand text-center bg-gradient-to-r from-[#C1121F] to-[#8B0000] bg-clip-text text-transparent'>
          SELECCIONA TU CIUDAD
        </h2>
        <RadioGroup
          value={selectedCity}
          onValueChange={handleCityChange}
          className='flex justify-center space-x-8'
        >
          <div className='flex items-center space-x-3 glass-effect p-4 rounded-xl'>
            <RadioGroupItem
              value='cochabamba'
              id='cochabamba'
              className='border-[#C1121F]'
            />
            <Label
              htmlFor='cochabamba'
              className='text-lg font-semibold cursor-pointer'
            >
              Cochabamba
            </Label>
          </div>
          <div className='flex items-center space-x-3 glass-effect p-4 rounded-xl'>
            <RadioGroupItem
              value='santa cruz'
              id='santa cruz'
              className='border-[#C1121F]'
            />
            <Label
              htmlFor='santa cruz'
              className='text-lg font-semibold cursor-pointer'
            >
              Santa Cruz
            </Label>
          </div>
        </RadioGroup>
      </div>

      <ConfirmationDialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmChange}
        title='¿CAMBIAR DE CIUDAD?'
        description='Si cambias de ciudad, tu carrito de compras se vaciará. ¿Estás seguro de que quieres continuar?'
      />
    </>
  )
}
