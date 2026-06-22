import { create } from "zustand"
import type { TransceiverConfig } from "../TransceiverModal"

interface TransceiverConfigsState {
  addTransceiverConfig: (transceiverConfig: TransceiverConfig) => void
  transceiverConfigs: TransceiverConfig[]
}

export const useTransceiverConfigsStore = create<TransceiverConfigsState>((set) => ({
  transceiverConfigs: [],
  addTransceiverConfig: (transceiverConfig: TransceiverConfig) =>
  set(({ transceiverConfigs, ...state }) => ({
    ...state,
    transceiverConfigs: [...transceiverConfigs, transceiverConfig]
  }))
}))
