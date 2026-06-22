import { Field, useFormikContext } from "formik"
import { useEffect, useId } from "react"
import { Form } from "react-bootstrap"
import { type TransceiverConfig } from "../.."
import { BAUD_RATES } from "./BAUD_RATES"

export const ConfigureBaudRate = () => {
  const id = useId()
  const { values: { driverOptions }, setFieldValue } = useFormikContext<TransceiverConfig>()

  useEffect(() => {
    if ("baudRate" in driverOptions) return

    setFieldValue("driverOptions.baudRate", 115200)
  }, [driverOptions, setFieldValue])

  return <Form.Group controlId={id}>
    <Form.Label>Baud Rate</Form.Label>

    <Field as={Form.Select} name="driverOptions.baudRate">
    {BAUD_RATES.map((baudRate) => <option key={baudRate} value={baudRate}>{baudRate}</option>)}
    </Field>
  </Form.Group>
}
