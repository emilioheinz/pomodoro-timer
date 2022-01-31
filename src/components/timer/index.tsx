import { FaPlay, FaPause } from 'react-icons/fa'

import { IconButton } from '../icon-button'
import { Container, TimeWrapper } from './styles'
import { TimerProps } from './types'

export default function Timer({
  isRunning,
  formattedTimeLeft,
  onPauseClick,
  onResumeClick,
  progressPercentage
}: TimerProps) {
  function renderButton() {
    if (isRunning)
      return (
        <IconButton
          ariaLabel="Pause timer"
          Icon={FaPause}
          onClick={onPauseClick}
        />
      )

    return (
      <IconButton
        ariaLabel="Start timer"
        Icon={FaPlay}
        onClick={onResumeClick}
      />
    )
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
