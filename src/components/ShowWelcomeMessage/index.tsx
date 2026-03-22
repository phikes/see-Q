import { Button } from "react-bootstrap"
import { useWelcomeMessageStore } from "@/components/WelcomeMessage/useWelcomeMessageStore"
import { useShallow } from "zustand/shallow"

export const ShowWelcomeMessage = () => {
  const { hideWelcomeMessage, setHideWelcomeMessage } = useWelcomeMessageStore(
    useShallow((state) => ({
      hideWelcomeMessage: state.hideWelcomeMessage,
      setHideWelcomeMessage: state.setHideWelcomeMessage
    })
  ))

  if (!hideWelcomeMessage) return

    return <Button onClick={() => setHideWelcomeMessage(false)}>Show welcome message again</Button>
}
