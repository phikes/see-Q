import { Transceivers } from "@ham-js/cat"
import { Field, useFormikContext } from "formik"
import { filter, find, isEmpty, sortBy } from "lodash-es"
import { useEffect, useId } from "react"
import { Form } from "react-bootstrap"
import type { TransceiverConfig } from ".."
import { customizeValidator } from "@rjsf/validator-ajv8"
import { RJSFForm } from "./RJSFForm"
import type { IChangeEvent } from "@rjsf/core"
import { FormattedMessage } from "react-intl"

export const TransceiverInput = () => {
  const { setFieldValue, values: { transceiver, vendor } } = useFormikContext<TransceiverConfig>()
  const id = useId()
  const vendorTransceivers = sortBy(
    filter(
      Transceivers,
      {deviceVendor: vendor}
    ),
    "deviceName")
  const TransceiverConstructor = find(Transceivers, {deviceName: transceiver, deviceVendor: vendor})!

  useEffect(() => {
    setFieldValue("transceiver", vendorTransceivers[0].deviceName)
  }, [setFieldValue, vendorTransceivers])


  const handleOptionsChange = ({ formData }: IChangeEvent) => setFieldValue("transceiverOptions", formData)
  const validator = customizeValidator<ConstructorParameters<typeof TransceiverConstructor>[1]>()

  // reset transceiver options when transceiver is changed
  useEffect(() => {
    setFieldValue("transceiverOptions", {})
  }, [setFieldValue, transceiver])

  return <div>
  <Form.Group className="mb-3" controlId={id}>
    <Form.Label><FormattedMessage defaultMessage="Transceiver" /></Form.Label>
    <Field as={Form.Select} name="transceiver">
      {vendorTransceivers.map((transceiver) => <option key={transceiver.deviceName}>{transceiver.deviceName}</option>)}
    </Field>
  </Form.Group>
  {
    !isEmpty(TransceiverConstructor?.deviceSchema) &&
    <RJSFForm<ConstructorParameters<typeof TransceiverConstructor>[1]>
          onChange={handleOptionsChange} 
          schema={TransceiverConstructor.deviceSchema}
          validator={validator}
        />
      }
  </div>
}
