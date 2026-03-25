import './App.scss'
import { WelcomeMessage } from '@/components/WelcomeMessage'
import { ShowWelcomeMessage } from '@/components/ShowWelcomeMessage'
import { Transceivers } from '@/components/Transceivers'

export const App = () => {
  return <main className="p-3">
    <WelcomeMessage />
    <Transceivers />
    <ShowWelcomeMessage />
  </main>
}
