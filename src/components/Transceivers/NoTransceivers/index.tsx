import { useTransceiverModalStore } from "@/components/TransceiverModal/useTransceiverModalStore"
import { Alert, Button } from "react-bootstrap"
import { useTransceiverConfigsStore } from "../useTransceiverConfigsStore"
import { FormattedMessage } from "react-intl"

export const NoTransceivers = () => {
  const transceiverConfigs = useTransceiverConfigsStore((({ transceiverConfigs }) =>  transceiverConfigs))
  const setShowTransceiverModal = useTransceiverModalStore(({ setShowTransceiverModal }) => setShowTransceiverModal)
  const showTransceiverModal = () => setShowTransceiverModal(true)

  if (transceiverConfigs.length > 0) return

  return <>
  <Alert variant="primary">
    <Alert.Heading><FormattedMessage defaultMessage="You have not added any transceivers yet" /></Alert.Heading>
    <div>
      <Button onClick={showTransceiverModal}>Add transceiver</Button>
    </div>
  </Alert>
</>
}
