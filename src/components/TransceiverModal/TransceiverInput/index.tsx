import { Transceivers } from "@ham-js/cat"
import { Field, useFormikContext } from "formik"
import { filter, sortBy } from "lodash-es"
import { useEffect, useId, useMemo } from "react"
import { Form } from "react-bootstrap"
import type { Values } from ".."

export const TransceiverInput = () => {
  const { setFieldValue, values: { vendor } } = useFormikContext<Values>()
  const id = useId()
  const vendorTransceivers = useMemo(() => sortBy(
    filter(
      Transceivers,
      {deviceVendor: vendor}
    ),
    "deviceName"),
    [vendor]
  )

  useEffect(() => {
    setFieldValue("transceiver", vendorTransceivers[0].deviceName)
  }, [setFieldValue, vendorTransceivers])

  return <Form.Group className="mb-3" controlId={id}>
    <Form.Label>Transceiver</Form.Label>
    <Field as={Form.Select} name="transceiver">
    {vendorTransceivers.map((transceiver) => <option key={transceiver.deviceName}>{transceiver.deviceName}</option>)}
    </Field>
  </Form.Group>
}
