import { NoTransceivers } from "./NoTransceivers"
import { useTransceiversStore } from "./useTransceiversStore"

export const Transceivers = () => {
  const transceivers = useTransceiversStore((({ transceivers }) =>  transceivers))

  return <>
    <h1>Your transceivers</h1>
    {transceivers.length === 0 && <NoTransceivers />}
  </>
}
