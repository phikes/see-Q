import { create } from "zustand"

interface TransceiverModalState {
  setShowTransceiverModal: (showTransceiverModal: boolean) => void
  showTransceiverModal: boolean
}

export const useTransceiverModalStore = create<TransceiverModalState>((set) => ({
  showTransceiverModal: false,
  setShowTransceiverModal: (showTransceiverModal: boolean) =>
  set((state) => ({
    ...state,
    showTransceiverModal
  }))
}))
