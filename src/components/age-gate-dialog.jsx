'use client'

import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

export function AgeGateDialog() {
  const [open, setOpen] = useState(true)

  useEffect(() => {
    const hasConfirmedAge =
      sessionStorage.getItem('age-confirmed')
    if (!hasConfirmedAge) {
      setOpen(true)
    }
  }, [])

  const handleConfirm = () => {
    sessionStorage.setItem('age-confirmed', 'true')
    setOpen(false)
  }

  const handleDecline = () => {
    // Redirects to the client's Instagram page.
    // TODO: Replace with the actual Instagram URL.
    window.location.href = 'https://www.instagram.com'
  }

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent
        showCloseButton={false}
        className='bg-black border-gray-700 mx-auto'
      >
        <DialogHeader>
          <DialogTitle className='text-center font-brand text-xl'>
            VERIFICACIÓN DE EDAD
          </DialogTitle>
        </DialogHeader>
        <div className='space-y-4 text-center'>
          <p className='text-gray-300 font-semibold'>
            ¿Eres mayor de 18 años?
          </p>
          <p className='text-sm text-gray-400'>
            Debes ser mayor de edad para acceder a este
            sitio
          </p>
          <div className='flex w-full justify-center space-x-4 pt-2'>
            <Button
              onClick={handleDecline}
              variant='outline'
              className='w-fit border-0 hover:bg-gray-800'
            >
              No
            </Button>
            <Button
              onClick={handleConfirm}
              className='w-fit bg-[#C1121F] hover:bg-[#91090f] font-semibold'
            >
              Sí
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
