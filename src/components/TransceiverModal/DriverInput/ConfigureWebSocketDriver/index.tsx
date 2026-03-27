import { Field, useFormikContext } from "formik"
import { useEffect } from "react"
import { Form } from "react-bootstrap"
import { type Values } from "../.."

export const ConfigureWebSocketDriver = () => {
  const { values: { driverOptions } , setFieldValue } = useFormikContext<Values>()

  useEffect(() => {
    if ("url" in driverOptions) return

    setFieldValue("driverOptions.url", "")
  }, [])

  return <Form.Group>
    <Form.Label>URL</Form.Label>

    <Field as={Form.Control} name="driverOptions.url" type="url" />
  </Form.Group>
}
