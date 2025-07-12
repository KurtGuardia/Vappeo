'use client'

import { create } from 'zustand'

export const useUiStore = create((set) => ({
  isTermsModalOpen: false,
  openTermsModal: () => set({ isTermsModalOpen: true }),
  closeTermsModal: () => set({ isTermsModalOpen: false }),
}))
