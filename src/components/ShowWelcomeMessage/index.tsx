import { Button } from "react-bootstrap"
import { useWelcomeMessageStore } from "@/components/WelcomeMessage/useWelcomeMessageStore"
import { useShallow } from "zustand/shallow"
import { useCallback } from "react"

export const ShowWelcomeMessage = () => {
  const { hideWelcomeMessage, setHideWelcomeMessage } = useWelcomeMessageStore(
    useShallow((state) => ({
      hideWelcomeMessage: state.hideWelcomeMessage,
      setHideWelcomeMessage: state.setHideWelcomeMessage
    })
  ))

  const showWelcomeMessage = useCallback(() => setHideWelcomeMessage(false), [setHideWelcomeMessage])

  if (!hideWelcomeMessage) return

  return <Button onClick={showWelcomeMessage}>Show welcome message again</Button>
}
