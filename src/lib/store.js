'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useStore = create()(
  persist(
    (set, get) => ({
      selectedCity: 'cochabamba',
      cart: [],
      deliveryOption: 'pickup',
      coupon: null,
      subtotal: 0,
      discount: 0,
      total: 0,
      pickupPointId: null,
      deliveryDetails: {
        name: '',
        phone: '',
        address: '',
        observations: '',
        city: '', // For 'interior'
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

      applyCoupon: (coupon) => {
        set({ coupon })
        get().calculateTotals()
      },

      calculateTotals: () => {
        const { cart, coupon } = get()
        const subtotal = cart.reduce(
          (sum, item) =>
            sum +
            item.price *
              item.flavors.reduce(
                (flavorSum, f) => flavorSum + f.quantity,
                0,
              ),
          0,
        )
        let discount = 0
        if (coupon) {
          discount =
            coupon.type === 'percentage'
              ? subtotal * (coupon.discount / 100)
              : coupon.discount
        }
        const total = subtotal - discount
        set({ subtotal, discount, total })
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
