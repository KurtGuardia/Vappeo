'use client'

import { useEffect, useRef, useState } from 'react'
import {
  parseISO,
  isValid,
  isAfter,
  startOfToday,
} from 'date-fns'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useStore } from '@/lib/store'

/**
 * Checks if a coupon is active based on its 'activo' property.
 * Handles "Si" and expiration dates like "YYYY-MM-DD".
 * @param {object} promo The promotion object from the database.
 * @returns {boolean} True if the coupon is active, false otherwise.
 */
function isCouponActive(promo) {
  if (!promo || !promo.activo) {
    return false
  }

  const status = promo.activo?.trim() || ''

  // Case 1: Coupon is explicitly active
  if (status.toLowerCase() === 'si') {
    return true
  }

  // Case 2: Check if the status is a valid date
  if (/^\d{4}-\d{2}-\d{2}$/.test(status)) {
    const expirationDate = parseISO(status)

    if (!isValid(expirationDate)) return false

    // A coupon is valid if its expiration date is today or any time after today.
    return (
      isAfter(expirationDate, startOfToday()) ||
      expirationDate.toDateString() ===
        new Date().toDateString()
    )
  }

  // Case 3: Any other value ("No", empty, etc.) is considered inactive
  return false
}

export function CouponInput({ promos }) {
  const [couponInput, setCouponInput] = useState('')
  const [feedback, setFeedback] = useState({
    success: [],
    errors: [],
  })
  const { setAppliedCoupons } = useStore()
  const feedbackTimeoutRef = useRef(null)

  useEffect(() => {
    return () => clearTimeout(feedbackTimeoutRef.current)
  }, [])

  const handleApplyCoupons = () => {
    // Clear any existing feedback timeout
    if (feedbackTimeoutRef.current) {
      clearTimeout(feedbackTimeoutRef.current)
    }

    if (!couponInput.trim()) return

    const codes = couponInput
      .split(/[, ]+/)
      .filter(Boolean)
      .map((c) => c.toUpperCase())
    const uniqueCodes = [...new Set(codes)]
    const validCoupons = []
    const invalidCodes = []

    uniqueCodes.forEach((code) => {
      const promo = promos?.find(
        (p) => p.codigo?.toUpperCase() === code,
      )

      // FIX 2: Use our new validation function
      if (promo && isCouponActive(promo)) {
        validCoupons.push({
          codigo: promo.codigo,
          type: promo.tipo,
          discount: parseFloat(promo.valor),
        })
      } else {
        invalidCodes.push(code)
      }
    })

    // Update the global store with all valid coupons
    setAppliedCoupons(validCoupons)

    // Set detailed feedback
    setFeedback({
      success: validCoupons.map((c) => c.codigo),
      errors: invalidCodes,
    })

    feedbackTimeoutRef.current = setTimeout(() => {
      setFeedback({ success: [], errors: [] })
    }, 5000)
  }

  return (
    <div className='space-y-2'>
      <div className='flex space-x-2'>
        <Input
          placeholder='Código de cupón'
          value={couponInput}
          onChange={(e) => setCouponInput(e.target.value)}
          className='flex-1'
        />
        <Button
          onClick={handleApplyCoupons}
          variant='outline'
          className='border-[#C1121F] text-[#C1121F] hover:bg-[#C1121F] hover:text-white bg-transparent'
        >
          APLICAR
        </Button>
      </div>
      {feedback.success.length > 0 && (
        <div className='text-sm text-green-400 animate-in fade-in'>
          ✓ Cupones aplicados: {feedback.success.join(', ')}
        </div>
      )}
      {feedback.errors.length > 0 && (
        <div className='text-sm text-red-400 animate-in fade-in'>
          ✗ Códigos no válidos o expirados:{' '}
          {feedback.errors.join(', ')}
        </div>
      )}
    </div>
  )
}
