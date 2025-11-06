'use client'

import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useStore } from '@/lib/store'
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import Image from 'next/image'

export function CityChangeDialog({ open, onOpenChange }) {
  const {
    changeCityAndClearCart,
    selectedCity: currentCity,
  } = useStore()
  const [selectedCity, setSelectedCity] =
    useState(currentCity)

  useEffect(() => {
    if (open) {
      setSelectedCity(currentCity)
    }
  }, [open, currentCity])

  const handleConfirm = () => {
    if (!selectedCity || selectedCity === currentCity)
      return

    changeCityAndClearCart(selectedCity)
    onOpenChange(false)
    setSelectedCity(currentCity)
  }

  const handleCancel = () => {
    onOpenChange(false)
    setSelectedCity(null)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className='bg-border border-gray-700 text-gray-300 w-11/12 md:w-full md:mx-auto max-w-sm'
      >
        <Image
          src='/imgs/VAPPEO-LOGO-BLANCO.png'
          width={150}
          height={150}
          className='mx-auto'
          alt='Vappeo logo'
        />
        <DialogHeader>
          <DialogTitle className='text-center font-brand text-xl'>
            CAMBIAR CIUDAD
          </DialogTitle>
        </DialogHeader>
        <div className='space-y-6 text-center'>
          {/* City Selection */}
          <div className='space-y-3'>
            <p className=' font-semibold'>
              Selecciona tu ciudad
            </p>
            <RadioGroup
              value={selectedCity}
              onValueChange={setSelectedCity}
              className='flex flex-col md:flex-row justify-center gap-4'
            >
              <div className='flex items-center space-x-3 p-2 rounded-xl bg-red-100 text-gray-700'>
                <RadioGroupItem
                  value='cochabamba'
                  id='cochabamba-change'
                  className='border-[#C1121F] data-[state=checked]:text-red-900 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-inherit'
                />
                <Label
                  htmlFor='cochabamba-change'
                  className='text-lg font-semibold cursor-pointer'
                >
                  Cochabamba
                </Label>
              </div>
              <div className='flex items-center space-x-3 p-2 rounded-xl bg-red-100 text-gray-700'>
                <RadioGroupItem
                  value='santa cruz'
                  id='santa-cruz-change'
                  className='border-[#C1121F] data-[state=checked]:text-red-900 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-inherit'
                />
                <Label
                  htmlFor='santa-cruz-change'
                  className='text-lg font-semibold cursor-pointer'
                >
                  Santa Cruz
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Action Buttons */}
          <div className='flex w-full justify-center space-x-4 pt-4'>
            <Button
              onClick={handleCancel}
              variant='outline'
              className='w-fit cursor-pointer border-1 bg-transparent hover:bg-gray-800'
            >
              Cancelar
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={
                !selectedCity ||
                selectedCity === currentCity
              }
              className='w-fit cursor-pointer bg-[#C1121F] hover:bg-[#4b0004] font-semibold disabled:bg-gray-600 disabled:cursor-not-allowed'
            >
              Cambiar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
