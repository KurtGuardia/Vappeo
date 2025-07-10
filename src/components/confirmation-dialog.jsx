// src/components/confirmation-dialog.jsx
'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

export function ConfirmationDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='bg-black border-gray-700 mx-auto'>
        <DialogHeader>
          <DialogTitle className='text-center font-brand text-xl text-amber-400'>
            {title}
          </DialogTitle>
        </DialogHeader>
        <div className='py-4 text-center text-gray-300'>
          <p>{description}</p>
        </div>
        <DialogFooter className='flex-row w-full justify-center space-x-4'>
          <Button
            onClick={onClose}
            variant='outline'
            className='w-fit border-0 hover:bg-gray-800'
          >
            Cancelar
          </Button>
          <Button
            onClick={() => {
              onConfirm()
              onClose() // Close the dialog after confirming
            }}
            className='w-fit bg-[#C1121F] hover:bg-[#91090f] font-semibold'
          >
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
