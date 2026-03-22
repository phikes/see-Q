import { create } from "zustand"
import { persist } from "zustand/middleware"

interface WelcomeMessageState {
  hideWelcomeMessage: boolean
  setHideWelcomeMessage: (hideWelcomeMessage: boolean) => void
}

export const useWelcomeMessageStore = create<WelcomeMessageState>()(
  persist((set) => ({
    hideWelcomeMessage: false,
    setHideWelcomeMessage: (hideWelcomeMessage: boolean) => set((state) => ({ ...state, hideWelcomeMessage }))
  }),
  { name: "WelcomeMessage" })
)
