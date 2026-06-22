import { Button, Nav } from "react-bootstrap"
import { useTransceiverConfigsStore } from "../useTransceiverConfigsStore"
import { useTransceiverModalStore } from "@/components/TransceiverModal/useTransceiverModalStore"

interface Props {
  onSelect: (uuid: string | null) => void
}

export const TransceiverNav = ({ onSelect }: Props) => {
  const setShowTransceiverModal = useTransceiverModalStore(({ setShowTransceiverModal }) => setShowTransceiverModal)

  const transceiverConfigs = useTransceiverConfigsStore(({ transceiverConfigs }) => transceiverConfigs)

  if (!transceiverConfigs.length) return null

  return <>
  <div className="d-flex gap-3">
    <Nav defaultActiveKey={transceiverConfigs[0].uuid} onSelect={onSelect} variant="tabs">
      {
        transceiverConfigs.map(({name, uuid}) => <Nav.Item key={name}>
          <Nav.Link eventKey={uuid}>{name}</Nav.Link>
        </Nav.Item>)
      }
    </Nav>
    <Button onClick={() => setShowTransceiverModal(true)}>Add transceiver</Button>
  </div>
</>
}
