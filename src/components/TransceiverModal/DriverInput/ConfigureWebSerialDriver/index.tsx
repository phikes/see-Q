import { Field, useFormikContext } from "formik"
import { useEffect, useId } from "react"
import { Form } from "react-bootstrap"
import { type Values } from "../.."

export const BAUD_RATES = [
  110,
  300,
  600,
  1200,
  2400,
  4800,
  9600,
  14400,
  19200,
  38400,
  57600,
  115200,
  128000,
  256000
]

export const ConfigureBaudRate = () => {
  const id = useId()
  const { values: { driverOptions }, setFieldValue } = useFormikContext<Values>()

  useEffect(() => {
    if ("baudRate" in driverOptions) return

    setFieldValue("driverOptions.baudRate", 115200)
  }, [])

  return <Form.Group controlId={id}>
    <Form.Label>Baud Rate</Form.Label>

    <Field as={Form.Select} name="driverOptions.baudRate">
      {BAUD_RATES.map((baudRate) => <option key={baudRate} value={baudRate}>{baudRate}</option>)}
    </Field>
  </Form.Group>
}
