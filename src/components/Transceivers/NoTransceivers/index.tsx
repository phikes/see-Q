import { TransceiverModal } from "@/components/TransceiverModal"
import { useCallback, useState } from "react"
import { Alert, Button } from "react-bootstrap"

export const NoTransceivers = () => {
  const [showTransceiverModal, setShowTransceiverModal] = useState(false)

  return <>
  <Alert variant="primary">
    <Alert.Heading>You have not added any transceivers yet</Alert.Heading>
    <div>
      <Button onClick={useCallback(() => setShowTransceiverModal(true), [])}>Add your transceiver</Button>
    </div>
  </Alert>
  <TransceiverModal onHide={useCallback(() => setShowTransceiverModal(false), [])} show={showTransceiverModal} />
</>
}
