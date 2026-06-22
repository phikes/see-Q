import { NoTransceivers } from "./NoTransceivers"
import { TransceiverNav } from "./TransceiverNav"
import { Transceiver } from "./Transceiver"
import { useState } from "react"
import { FormattedMessage } from "react-intl"

export const Transceivers = () => {
  const [activeUUID, setActiveUUID] = useState<string | null>()

  return <>
    <h1><FormattedMessage defaultMessage="Your transceivers" /></h1>
    <NoTransceivers />
    <TransceiverNav onSelect={(uuid) => setActiveUUID(uuid)} />
    {!!activeUUID && <Transceiver uuid={activeUUID} />}
  </>
}
