import { DriverType, TransceiverVendor } from "@ham-js/cat"
import { Field, Formik, Form as FormikForm } from "formik"
import { useId } from "react"
import { Button, Form, Modal } from "react-bootstrap"
import { TransceiverInput } from "./TransceiverInput"
import { DriverInput } from "./DriverInput"
import { useTransceiverConfigsStore } from "@/components/Transceivers/useTransceiverConfigsStore"
import { useTransceiverModalStore } from "./useTransceiverModalStore"
import { object, string } from "yup"
import { FormattedMessage, useIntl } from "react-intl"

export interface TransceiverConfig {
  driver: DriverType
  driverOptions: {
    baudRate: number
  } | {
    url: string
  } | {}
  name: string
  transceiver: string
  uuid: string
  vendor: TransceiverVendor
}

export const TransceiverModal = () => {
  const intl = useIntl()
  const { showTransceiverModal, setShowTransceiverModal } = useTransceiverModalStore()
  const addTransceiverConfig = useTransceiverConfigsStore(({ addTransceiverConfig }) => addTransceiverConfig)
  const initialValues: TransceiverConfig = {
    driver: DriverType.WebSerialDriver,
    driverOptions: {},
    name: "",
    transceiver: "",
    uuid: self.crypto.randomUUID(),
    vendor: TransceiverVendor.Yaesu
  }

  const handleSubmit = (values: TransceiverConfig) => {
    addTransceiverConfig(values)
    setShowTransceiverModal(false)
  }

  const nameId = useId()
  const vendorId = useId()
  const vendorTextId = useId()

  const vendors = Object.keys(TransceiverVendor).sort()

  const validationSchema = object({
    name: string().required(intl.formatMessage({ defaultMessage: "Name is required" })),
    driverOptions: object()
    .when(
      "driver",
      {
        is: DriverType.WebSocketDriver,
        then: () => object({
          url: string().required(intl.formatMessage({ defaultMessage: "URL is required" }))
        }).required()
      }
    )
  })

  return <Modal show={showTransceiverModal} onHide={() => setShowTransceiverModal(false)}>
    <Formik initialValues={initialValues} onReset={() => setShowTransceiverModal(false)} onSubmit={handleSubmit} validationSchema={validationSchema}>
      {
        ({ errors, isValid }) => <FormikForm>
          <Modal.Header closeButton><FormattedMessage defaultMessage="Add Transceiver" /></Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId={nameId}>
              <Form.Label><FormattedMessage defaultMessage="Name" /></Form.Label>
              <Field as={Form.Control} isInvalid={errors.name} name="name" placeholder={intl.formatMessage({ defaultMessage: "Give your transceiver a name of your choice" })} />
              {errors.name && <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>}
            </Form.Group>
            <Form.Group className="mb-3" controlId={vendorId}>
              <Form.Label><FormattedMessage defaultMessage="Vendor" /></Form.Label>
              <Field aria-describedby={vendorTextId} as={Form.Select} name="vendor">
                {
                  vendors.map((vendor) => <option key={vendor}>{TransceiverVendor[vendor as keyof typeof TransceiverVendor]}</option>)
                }
              </Field>
              <Form.Text id={vendorTextId}><FormattedMessage defaultMessage='The "Virtual" vendor can be used for demo purposes.' /></Form.Text>
            </Form.Group>
            <TransceiverInput />
            <DriverInput />
          </Modal.Body>
          <Modal.Footer>
            <Button type="reset" variant="danger"><FormattedMessage defaultMessage="Discard transceiver" /></Button>
            <Button disabled={!isValid} type="submit"><FormattedMessage defaultMessage="Add transceiver" /></Button>
          </Modal.Footer>
        </FormikForm>
      }
    </Formik>
  </Modal>
}
