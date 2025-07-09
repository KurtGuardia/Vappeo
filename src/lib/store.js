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

      setSelectedCity: (city) => {
        const confirmed = confirm(
          'Cambiar de ciudad vaciará tu carrito. ¿Continuar?',
        )
        if (confirmed) {
          set({
            selectedCity: city.toLowerCase(),
            cart: [],
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

      applyCoupon: (coupon) => {
        set({ coupon })
        get().calculateTotals()
      },

      calculateTotals: () => {
        const state = get()
        const subtotal = state.cart.reduce(
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

        let discount = 0
        if (state.coupon) {
          discount =
            state.coupon.type === 'percentage'
              ? subtotal * (state.coupon.discount / 100)
              : state.coupon.discount
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
