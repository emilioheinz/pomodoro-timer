import { useEffect } from 'react'
import { FaPlay, FaStop } from 'react-icons/fa'
import { useCountdownTimer } from '~/hooks/use-count-down-timer'
import { IconButton } from '../icon-button'
import { Container, TimeWrapper } from './styles'

export default function Timer() {
  const { formattedTimeLeft, isTimerRunning, setStartTime, start, reset } =
    useCountdownTimer()

  useEffect(() => {
    setStartTime(100000)
  }, [])

  function renderButton() {
    if (isTimerRunning) return <IconButton Icon={FaStop} onClick={reset} />

    return <IconButton Icon={FaPlay} onClick={start} />
  }

  return (
    <Container>
      <TimeWrapper>
        <span>{formattedTimeLeft}</span>
      </TimeWrapper>
      {renderButton()}
    </Container>
  )
}
