import { Alert, Button } from "react-bootstrap"
import { useWelcomeMessageStore } from "./useWelcomeMessageStore"
import { useShallow } from "zustand/shallow"
import { useState } from "react"

export const WelcomeMessage = () => {
  const { hideWelcomeMessage, setHideWelcomeMessage } = useWelcomeMessageStore(
    useShallow((state) => ({
      hideWelcomeMessage: state.hideWelcomeMessage,
      setHideWelcomeMessage: state.setHideWelcomeMessage
    }))
  )
  const [wasVisible] = useState(!hideWelcomeMessage)

  if (hideWelcomeMessage && !wasVisible) return

  return <Alert>
    {
      !hideWelcomeMessage && <>
        <Alert.Heading as="h1">Welcome to see-Q!</Alert.Heading>
        <p>see-Q is an extensible interface for visually impaired amateur radio operators. It relies on a transceiver being connected to the computer via its CAT interface. Once connected the user can select from a list of modules which help them read back the frequency, read the S-meter and much more.</p>
        <Button onClick={() => setHideWelcomeMessage(true)}>Don't show this message again</Button>
      </>
    }
    {
      hideWelcomeMessage && <>
      <p>Ok, this message will not be shown again. If you want to display it again, you can click the button on the bottom of the page.</p>
      </>
    }
  </Alert>
}
