import { create } from "zustand"
import type { TransceiverConfig } from "../TransceiverModal"
import { persist } from "zustand/middleware"

interface TransceiverConfigsState {
  addTransceiverConfig: (transceiverConfig: TransceiverConfig) => void
  transceiverConfigs: TransceiverConfig[]
}

export const useTransceiverConfigsStore = create<TransceiverConfigsState>()(
  persist(
    (set) => ({
      transceiverConfigs: [],
      addTransceiverConfig: (transceiverConfig: TransceiverConfig) =>
      set(({ transceiverConfigs, ...state }) => ({
        ...state,
        transceiverConfigs: [...transceiverConfigs, transceiverConfig]
      }))
    }),
    {name: "transceiver-config-store"}
  )
)
