import { DriverType, TransceiverVendor } from "@ham-js/cat"
import { Field, Formik, Form } from "formik"
import { useCallback, useId, useMemo } from "react"
import { Button, Form as BSForm, Modal, type ModalProps } from "react-bootstrap"
import { TransceiverInput } from "./TransceiverInput"
import { DriverInput } from "./DriverInput"

export interface Values {
  driver: DriverType
  driverOptions: {
    baudRate: number
  } | {
    url: string
  } | {}
  name: string
  transceiver: string
  vendor: TransceiverVendor
}

interface Props extends ModalProps {

}

export const TransceiverModal = ({ ...modalProps }: Props) => {
  const initialValues: Values = useMemo(() => ({
    driver: DriverType.WebSerialDriver,
    driverOptions: {},
    name: "",
    transceiver: "",
    vendor: TransceiverVendor.Yaesu
  }), [])

  const handleSubmit = useCallback(() => {

  }, [])

  const nameId = useId()
  const vendorId = useId()
  const vendorTextId = useId()

  const vendors = useMemo(() => Object.keys(TransceiverVendor).sort(), [])

  return <Modal {...modalProps}>
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {
        () => <Form>
          <Modal.Header closeButton>Add Transceiver</Modal.Header>
          <Modal.Body>
            <BSForm.Group className="mb-3" controlId={nameId}>
              <BSForm.Label>Name</BSForm.Label>
              <Field as={BSForm.Control} name="name" placeholder="Give your transceiver a name of your choice" />
            </BSForm.Group>
            <BSForm.Group className="mb-3" controlId={vendorId}>
              <BSForm.Label>Vendor</BSForm.Label>
              <Field aria-describedby={vendorTextId} as={BSForm.Select} name="vendor">
              {
                vendors.map((vendor) => <option key={vendor}>{TransceiverVendor[vendor as keyof typeof TransceiverVendor]}</option>)
              }
              </Field>
              <BSForm.Text id={vendorTextId}>The "Virtual" vendor can be used for demo purposes.</BSForm.Text>
            </BSForm.Group>
            <TransceiverInput />
            <DriverInput />
          </Modal.Body>
          <Modal.Footer>
            <Button type="reset" variant="danger">Discard Transceiver</Button>
            <Button type="submit">Add Transceiver</Button>
          </Modal.Footer>
        </Form>
      }
    </Formik>
  </Modal>
}
