import { useEffect, useMemo } from 'react'
import { FaPlay, FaStop } from 'react-icons/fa'
import { useCountdownTimer } from '~/hooks/use-count-down-timer'
import { IconButton } from '../icon-button'
import { Container, TimeWrapper } from './styles'
import { TimerProps } from './types'

export default function Timer({ startTimeInMs, onEndReach }: TimerProps) {
  const {
    start,
    reset,
    setStartTime,
    isTimerRunning,
    formattedTimeLeft,
    timeLeftInMilliseconds
  } = useCountdownTimer(onEndReach)

  const ranPercentage = useMemo(
    () => ((startTimeInMs - timeLeftInMilliseconds) / startTimeInMs) * 100,
    [startTimeInMs, timeLeftInMilliseconds]
  )

  useEffect(() => {
    setStartTime(startTimeInMs)
  }, [startTimeInMs])

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
