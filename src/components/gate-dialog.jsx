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

export function GateDialog() {
  const { changeCityAndClearCart } = useStore()
  const [open, setOpen] = useState(false) // Start false, let useEffect handle it
  const [selectedCity, setSelectedCity] = useState(null)

  useEffect(() => {
    const hasConfirmed =
      sessionStorage.getItem('age-confirmed')
    if (!hasConfirmed) {
      setOpen(true)
    }
  }, [])

  const handleConfirm = () => {
    if (!selectedCity) return // Button should be disabled, but as a safeguard

    changeCityAndClearCart(selectedCity)
    sessionStorage.setItem('age-confirmed', 'true')
    setOpen(false)
  }

  const handleDecline = () => {
    window.location.href = 'https://www.instagram.com'
  }

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent
        showCloseButton={false}
        className='bg-border border-gray-700 w-11/12 md:w-full md:mx-auto max-w-sm'
      >
        <Image
          src='/imgs/vappeo_logo_transparent.png'
          width={150}
          height={150}
          className='mx-auto'
          alt='Vappeo logo'
        />
        <DialogHeader>
          <DialogTitle className='text-center font-brand text-xl'>
            BIENVENIDO A VAPPEO
          </DialogTitle>
        </DialogHeader>
        <div className='space-y-6 text-center'>
          {/* City Selection */}
          <div className='space-y-3'>
            <p className='text-gray-300 font-semibold'>
              Selecciona tu ciudad
            </p>
            <RadioGroup
              onValueChange={setSelectedCity}
              className='flex flex-col md:flex-row justify-center gap-4'
            >
              <div className='flex items-center space-x-3 p-2 rounded-xl bg-red-100 text-gray-700'>
                <RadioGroupItem
                  value='cochabamba'
                  id='cochabamba-gate'
                  className='border-[#C1121F] data-[state=checked]:text-red-900'
                />
                <Label
                  htmlFor='cochabamba-gate'
                  className='text-lg font-semibold cursor-pointer'
                >
                  Cochabamba
                </Label>
              </div>
              <div className='flex items-center space-x-3 p-2 rounded-xl bg-red-100 text-gray-700'>
                <RadioGroupItem
                  value='santa cruz'
                  id='santa-cruz-gate'
                  className='border-[#C1121F] data-[state=checked]:text-red-900'
                />
                <Label
                  htmlFor='santa-cruz-gate'
                  className='text-lg font-semibold cursor-pointer'
                >
                  Santa Cruz
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Age Confirmation */}
          <div className='space-y-2'>
            <p className='text-gray-300 font-semibold'>
              ¿Eres mayor de 18 años?
            </p>
            <p className='text-sm'>
              Debes ser mayor de edad para acceder a este
              sitio.
            </p>
          </div>

          {/* Action Buttons */}
          <div className='flex w-full justify-center space-x-4 pt-4'>
            <Button
              onClick={handleDecline}
              variant='outline'
              className='w-fit cursor-pointer border-1 bg-transparent hover:bg-gray-800'
            >
              No
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={!selectedCity}
              className='w-fit cursor-pointer bg-[#C1121F] hover:bg-[#91090f] font-semibold disabled:bg-gray-600 disabled:cursor-not-allowed'
            >
              Sí
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
