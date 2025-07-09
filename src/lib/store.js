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
      pickupPointId: null, // e.g., 'cbba-norte'
      deliveryDetails: {
        name: '',
        phone: '',
        address: '',
        observations: '',
        city: '', // For 'interior'
        urgent: false,
      },

      setSelectedCity: (city) => {
        const confirmed = confirm(
          'Cambiar de ciudad vaciará tu carrito. ¿Continuar?',
        )
        if (confirmed) {
          set({
            selectedCity: city.toLowerCase(),
            cart: [],
            coupon: null,
          })
          get().calculateTotals()
        }
      },

      addToCart: (itemToAdd) => {
        const { cart } = get()
        const existingItemIndex = cart.findIndex(
          (item) => item.id === itemToAdd.id,
        )

        let newCart = [...cart]

        if (existingItemIndex !== -1) {
          const existingItem = newCart[existingItemIndex]
          const updatedFlavors = [...existingItem.flavors]

          itemToAdd.flavors.forEach((newFlavor) => {
            const existingFlavorIndex =
              updatedFlavors.findIndex(
                (f) => f.name === newFlavor.name,
              )
            if (existingFlavorIndex !== -1) {
              updatedFlavors[
                existingFlavorIndex
              ].quantity += newFlavor.quantity
            } else {
              updatedFlavors.push(newFlavor)
            }
          })

          existingItem.flavors = updatedFlavors.filter(
            (f) => f.quantity > 0,
          )
          newCart[existingItemIndex] = existingItem
        } else {
          // Item is new, add it to the cart.
          newCart.push(itemToAdd)
        }

        // Remove items that might have no flavors after an update
        newCart = newCart.filter(
          (item) => item.flavors.length > 0,
        )

        set({ cart: newCart })
        get().calculateTotals()
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
