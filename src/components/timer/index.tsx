import { FaPlay, FaPause } from 'react-icons/fa'
import { useTimerContext } from '~/contexts/timer'
import { IconButton } from '../icon-button'
import { Container, TimeWrapper } from './styles'

export default function Timer() {
  const {
    pause,
    start,
    isTimerRunning,
    formattedTimeLeft,
    progressPercentage
  } = useTimerContext()

  function renderButton() {
    if (isTimerRunning) return <IconButton Icon={FaPause} onClick={pause} />

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
