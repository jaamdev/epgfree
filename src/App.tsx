import db from './db/db.json'
import Header from './components/Header.tsx'
import Timer from './components/Timer.tsx'
import GameList from './components/GameList.tsx'

export default function App() {
  const hasGames = db.length > 0
  const dateTime = hasGames ? db[0].dateInMiliseconds : 0

  return <main>
    <Header />
    <Timer dateTime={dateTime} />
    {hasGames && <GameList list={db} />}
  </main>
}
