import './App.scss'
import { WelcomeMessage } from '@/components/WelcomeMessage'
import { ShowWelcomeMessage } from '@/components/ShowWelcomeMessage'
import { Transceivers } from '@/components/Transceivers'
import { TransceiverModal } from "@/components/TransceiverModal"
import { IntlProvider } from 'react-intl'

export const App = () => {
  return <main className="p-3">
    <IntlProvider locale="en">
      <WelcomeMessage />
      <Transceivers />
      <ShowWelcomeMessage />
      <TransceiverModal />
    </IntlProvider>
  </main>
}
