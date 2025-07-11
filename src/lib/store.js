'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useStore = create()(
  persist(
    (set, get) => ({
      selectedCity: 'cochabamba',
      cart: [],
      deliveryOption: 'pickup',
      appliedCoupons: [],
      subtotal: 0,
      discount: 0,
      total: 0,
      pickupPointId: null,
      deliveryDetails: {
        name: '',
        phone: '',
        address: '',
        addressInterior: '',
        observations: '',
        city: '',
        urgent: false,
      },

      changeCityAndClearCart: (city) => {
        set({
          selectedCity: city.toLowerCase(),
          cart: [],
          coupon: null,
        })
        get().calculateTotals()
      },

      setCartItem: (itemToSet) => {
        set((state) => {
          const newCart = [...state.cart]
          const existingItemIndex = newCart.findIndex(
            (item) => item.id === itemToSet.id,
          )

          // If the user selected any flavors...
          if (itemToSet.flavors.length > 0) {
            if (existingItemIndex !== -1) {
              // Item exists, so we replace it with the new version from the dialog.
              newCart[existingItemIndex] = itemToSet
            } else {
              // Item is new, add it to the cart.
              newCart.push(itemToSet)
            }
          } else {
            // If the user deselected all flavors, remove the item from the cart.
            if (existingItemIndex !== -1) {
              newCart.splice(existingItemIndex, 1)
            }
          }

          return { cart: newCart }
        })
        get().calculateTotals() // Recalculate totals after any change.
      },

      removeFromCart: (index) => {
        set((state) => ({
          cart: state.cart.filter((_, i) => i !== index),
        }))
        get().calculateTotals()
      },

      setDeliveryOption: (option) =>
        set({ deliveryOption: option }),

      setPickupPoint: (pointId) =>
        set({ pickupPointId: pointId }),

      setDeliveryDetails: (details) => {
        set((state) => ({
          deliveryDetails: {
            ...state.deliveryDetails,
            ...details,
          },
        }))
      },

      setAppliedCoupons: (coupons) => {
        set({ appliedCoupons: coupons })
        get().calculateTotals()
      },

      calculateTotals: () => {
        const { cart, appliedCoupons } = get()

        const subtotal = cart.reduce(
          (sum, item) =>
            sum +
            item.price *
              item.flavors.reduce(
                (flavorSum, flavor) =>
                  flavorSum + flavor.quantity,
                0,
              ),
          0,
        )

        let totalPercentageDiscountValue = 0
        let totalFixedDiscountValue = 0

        if (appliedCoupons && appliedCoupons.length > 0) {
          const totalPercentage = appliedCoupons
            .filter((c) => c.type === 'porcentaje')
            .reduce(
              (sum, c) => sum + parseFloat(c.discount),
              0,
            )

          totalPercentageDiscountValue =
            subtotal * (totalPercentage / 100)

          totalFixedDiscountValue = appliedCoupons
            .filter((c) => c.type === 'fijo')
            .reduce(
              (sum, c) => sum + parseFloat(c.discount),
              0,
            )
        }

        const finalDiscount =
          totalPercentageDiscountValue +
          totalFixedDiscountValue
        const finalTotal = Math.max(
          0,
          subtotal - finalDiscount,
        )

        set({
          subtotal: subtotal,
          discount: finalDiscount,
          total: finalTotal,
        })
      },
    }),
    {
      name: 'vappeo-store',
      storage: {
        getItem: (name) => {
          const str = sessionStorage.getItem(name)
          return str ? JSON.parse(str) : null
        },
        setItem: (name, value) => {
          sessionStorage.setItem(
            name,
            JSON.stringify(value),
          )
        },
        removeItem: (name) =>
          sessionStorage.removeItem(name),
      },
    },
  ),
)
