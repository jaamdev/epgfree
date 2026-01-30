import data from './db/db.json'
import Header from './components/Header.tsx'
import Timer from './components/Timer.tsx'
import GameList from './components/GameList.tsx'
import type { IGame } from './types.ts'

export default function App() {
  const hasGames = data.length > 0
  const db: IGame[] = hasGames ? structuredClone(data) : []
  const dateTime = hasGames ? db[0].dateInMiliseconds : 0

  return <main>
    <Header />
    <Timer dateTime={dateTime} />
    <GameList list={db} />
  </main>
}
