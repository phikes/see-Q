import type { Transceiver } from "@ham-js/cat"
import { create } from "zustand"

interface TransceiversState {
  transceivers: Transceiver<any>[]
}

export const useTransceiversStore = create<TransceiversState>((set) => ({
  transceivers: [],
  addTransceiver: (transceiver: Transceiver<any>) =>
  set(({ transceivers, ...state }) => ({
    ...state,
    transceivers: [...transceivers, transceiver]
  }))
}))
