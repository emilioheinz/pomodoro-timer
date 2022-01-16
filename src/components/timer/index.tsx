import { FaPlay, FaStop } from 'react-icons/fa'
import { useTimerContext } from '~/contexts/timer'
import { IconButton } from '../icon-button'
import { Container, TimeWrapper } from './styles'

export default function Timer() {
  const {
    isTimerRunning,
    reset,
    start,
    formattedTimeLeft,
    progressPercentage
  } = useTimerContext()

  function renderButton() {
    if (isTimerRunning) return <IconButton Icon={FaStop} onClick={reset} />

    return <IconButton Icon={FaPlay} onClick={start} />
  }

  return (
    <Container progressPercentage={progressPercentage}>
      <TimeWrapper>
        <span>{formattedTimeLeft}</span>
      </TimeWrapper>
      {renderButton()}
    </Container>
  )
}
