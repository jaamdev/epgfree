type Props = {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function Clock(
  { days = 0, hours = 0, minutes = 0, seconds = 0 }: Props
) {
  const dd = days.toString().padStart(2, '0')
  const hh = hours.toString().padStart(2, '0')
  const mm = minutes.toString().padStart(2, '0')
  const ss = seconds.toString().padStart(2, '0')

  const daysDashoffset = 440 - (440 * days) / 7
  const hoursDashoffset = 440 - (440 * hours) / 24
  const minutesDashoffset = 440 - (440 * minutes) / 60
  const secondsDashoffset = 440 - (440 * seconds) / 60

  const daysRotate = `rotateZ(${days * 51.428}deg)`
  const hoursRotate = `rotateZ(${hours * 15}deg)`
  const minutesRotate = `rotateZ(${minutes * 6}deg)`
  const secondsRotate = `rotateZ(${seconds * 6}deg)`

  return <div id='time'>
    {
      days > 0 && (
        <div className='circle'>
          <div
            className='dots day_dot'
            style={{ transform: daysRotate }}
          ></div>
          <svg>
            <circle cx='70' cy='70' r='70' />
            <circle cx='70' cy='70' r='70' strokeDashoffset={daysDashoffset} />
          </svg>
          <div id='days'>{dd}<br /><span>Días</span></div>
        </div>
      )
    }

    {
      hours > 0 && (
        <div className='circle'>
          <div
            className='dots hr_dot'
            style={{ transform: hoursRotate }}
          ></div>
          <svg>
            <circle cx='70' cy='70' r='70' />
            <circle cx='70' cy='70' r='70' strokeDashoffset={hoursDashoffset} />
          </svg>
          <div id='hours'>{hh}<br /><span>Horas</span></div>
        </div>
      )
    }

    <div className='circle'>
      <div
        className='dots min_dot'
        style={{ transform: minutesRotate }}
      ></div>
      <svg>
        <circle cx='70' cy='70' r='70' />
        <circle cx='70' cy='70' r='70' strokeDashoffset={minutesDashoffset} />
      </svg>
      <div id='minutes'>{mm}<br /><span>Minutos</span></div>
    </div>

    <div className='circle'>
      <div
        className='dots sec_dot'
        style={{ transform: secondsRotate }}
      ></div>
      <svg>
        <circle cx='70' cy='70' r='70' />
        <circle cx='70' cy='70' r='70' strokeDashoffset={secondsDashoffset} />
      </svg>
      <div id='seconds'>{ss}<br /><span>Segundos</span></div>
    </div>
  </div>
}
