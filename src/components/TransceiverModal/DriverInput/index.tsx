import { useEffect, useId, useMemo } from "react"
import { Driver, DriverType, Transceivers } from "@ham-js/cat"
import { find } from "lodash-es"
import { Field, useFormikContext } from "formik"
import { type Values } from ".."
import { Form } from "react-bootstrap"
import { ConfigureBaudRate } from "./ConfigureWebSerialDriver"
import { ConfigureWebSocketDriver } from "./ConfigureWebSocketDriver"
{/* import { ConfigureCP210xDriver } from "./ConfigureCP210xDriver" */}
{/* import { ConfigureWebSocketDriver } from "./ConfigureWebSocketDriver" */}
{/* import { ConfigureWebSerialDriver } from "./ConfigureWebSerialDriver" */}

export type DriverFactory = () => Driver | Promise<Driver | undefined> | undefined

const SUPPORTED_DRIVER_TYPES = [
  DriverType.CP210xWebUSBDriver,
  DriverType.DummyDriver,
  DriverType.WebSerialDriver,
  DriverType.WebSocketDriver
] as const

const DriverTypeLabels: Record<typeof SUPPORTED_DRIVER_TYPES[number], string> = {
  [DriverType.CP210xWebUSBDriver]: "Silicon Labs CP210x (WebUSB)",
  [DriverType.DummyDriver]: "Dummy Driver",
  [DriverType.WebSerialDriver]: "WebSerial",
  [DriverType.WebSocketDriver]: "WebSocket",
}

export const DriverInput = () => {
  const { setFieldValue, values: { driver, vendor, transceiver } } = useFormikContext<Values>()
  const driverTypes = useMemo(() => find(Transceivers, {deviceVendor: vendor, deviceName: transceiver})?.supportedDrivers ?? [], [vendor, transceiver])

  const filteredDriverTypes = useMemo(
    () =>
      driverTypes.filter((driverType) => (SUPPORTED_DRIVER_TYPES as readonly DriverType[]).includes(driverType)),
    [driverTypes]
  ) as Array<typeof SUPPORTED_DRIVER_TYPES[number]>

  // set webserial driver upon transceiver change or first supported driver if that is not available
  useEffect(() => {
    if(filteredDriverTypes.includes(driver as any)) return

    if (filteredDriverTypes.includes(DriverType.WebSerialDriver)) setFieldValue("driver", DriverType.WebSerialDriver)
    else setFieldValue("driver", filteredDriverTypes[0])
  }, [filteredDriverTypes, driver, setFieldValue])

  // reset driver options for drivers without options
  useEffect(() => {
    if (driver !== DriverType.DummyDriver) return

    setFieldValue("driverOptions", {})
  }, [driver])

  const id = useId()
  const textId = useId()

  return <Form.Group controlId={id} className="mb-3">
    <Form.Label>Driver</Form.Label>

    <Field aria-describedby={textId} as={Form.Select} name="driver">
      {
        filteredDriverTypes.map((type) => <option key={type} value={type}>
          {DriverTypeLabels[type]}
        </option>)
      }
    </Field>
    <Form.Text className="d-inline-block mb-3" id={textId}>The WebSerial driver should be supported on a wide variety of platforms. You might need to install a driver for your transceiver before it becomes available in the list of devices your browser presents to you after submitting this form. Try a WebUSB-based driver on mobile devices if the WebSerial driver is not working.</Form.Text>

    {(driver === DriverType.WebSerialDriver || driver === DriverType.CP210xWebUSBDriver) && <ConfigureBaudRate />}
    {driver === DriverType.WebSocketDriver && <ConfigureWebSocketDriver />}
  </Form.Group>
}
