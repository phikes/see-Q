import './App.scss'
import { WelcomeMessage } from '@/components/WelcomeMessage'
import { ShowWelcomeMessage } from '@/components/ShowWelcomeMessage'

export const App = () => {
  return <main className="p-3">
    <WelcomeMessage />
    <ShowWelcomeMessage />
  </main>
}
