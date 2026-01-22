import { useState, useEffect } from 'react'
import Clock from './Clock.tsx'

type Props = {
  dateTime: number
}

export default function Timer({ dateTime = 0 }: Props) {
  const [timeLeft, setTimeLeft] = useState(dateTime - new Date().getTime())

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = dateTime - new Date().getTime()
      setTimeLeft(newTimeLeft)

      if (newTimeLeft <= 0) {
        clearInterval(timer)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [dateTime])

  if (timeLeft <= 0) {
    return <h2
      className='w-full m-auto px-2 py-1 max-w-6xl text-2xl text-center'
    >
      ¡Tiempo terminado!
    </h2>
  }

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24))
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((timeLeft % (1000 * 60) / 1000))

  return <section>
    <Clock
      days={days}
      hours={hours}
      minutes={minutes}
      seconds={seconds}
    />
  </section>
}
