import { useEffect, useMemo } from 'react'
import { FaPlay, FaStop } from 'react-icons/fa'
import { useCountdownTimer } from '~/hooks/use-count-down-timer'
import { IconButton } from '../icon-button'
import { Container, TimeWrapper } from './styles'
import { TimerProps } from './types'

export default function Timer({
  formattedTimeLeft,
  isTimerRunning,
  ranPercentage,
  start,
  reset
}: TimerProps) {
  function renderButton() {
    if (isTimerRunning) return <IconButton Icon={FaStop} onClick={reset} />

    return <IconButton Icon={FaPlay} onClick={start} />
  }

  return (
    <Container ranPercentage={ranPercentage}>
      <TimeWrapper>
        <span>{formattedTimeLeft}</span>
      </TimeWrapper>
      {renderButton()}
    </Container>
  )
}
