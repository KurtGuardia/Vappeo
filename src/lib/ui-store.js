'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useThemeStore = create(
  persist(
    (set) => ({
      // The state still holds the name of the CSS theme
      theme: 'dark', // Default to your cyber-red theme

      // The action now simply flips between your two chosen themes
      toggleTheme: () =>
        set((state) => ({
          theme:
            state.theme === 'dark'
              ? 'light-sunset'
              : 'dark',
        })),
    }),
    {
      name: 'vappeo-theme-storage',
    },
  ),
)

export const useUiStore = create((set) => ({
  isTermsModalOpen: false,
  openTermsModal: () => set({ isTermsModalOpen: true }),
  closeTermsModal: () => set({ isTermsModalOpen: false }),
}))
