import { Field, useFormikContext } from "formik"
import { useEffect, useId } from "react"
import { Form } from "react-bootstrap"
import { type TransceiverConfig } from "../.."
import { FormattedMessage, useIntl } from "react-intl"

export const ConfigureWebSocketDriver = () => {
  const { errors: { driverOptions: errors }, values: { driverOptions } , setFieldValue } = useFormikContext<TransceiverConfig>()
  const intl = useIntl()

  useEffect(() => {
    if ("url" in driverOptions) return

    setFieldValue("driverOptions.url", "")
  }, [driverOptions, setFieldValue])

  const error = errors && "url" in errors && errors.url
  const id = useId()

  return <Form.Group controlId={id}>
    <Form.Label><FormattedMessage defaultMessage="URL" /></Form.Label>

    <Field as={Form.Control} isInvalid={error} name="driverOptions.url" placeholder={intl.formatMessage({ defaultMessage: "e.g. ws://mywebsocket.com/socket"  })} type="url" />
    <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
  </Form.Group>
}
