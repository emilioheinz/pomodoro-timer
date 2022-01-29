import { FaPlay, FaPause } from 'react-icons/fa'
import useTimerProgressPercentage from '~/hooks/user-timer-progress-percentage'
import { toMinutesAndSeconds } from '~/utils/time'

import { IconButton } from '../icon-button'
import { Container, TimeWrapper } from './styles'
import { TimerProps } from './types'

export default function Timer({
  isRunning,
  hours,
  minutes,
  seconds,
  currentTaskDuration,
  onPause,
  onResume
}: TimerProps) {
  const { minutes: formattedMinutes, seconds: formattedSeconds } =
    toMinutesAndSeconds({ hours, minutes, seconds })

  const { getProgressPercentage } = useTimerProgressPercentage({
    currentTaskDurationInMinutes: currentTaskDuration,
    minutesLeft: Number(formattedMinutes),
    secondsLeft: Number(formattedSeconds)
  })

  function renderButton() {
    if (isRunning) return <IconButton Icon={FaPause} onClick={onPause} />

    return <IconButton Icon={FaPlay} onClick={onResume} />
  }

  return (
    <Container progressPercentage={getProgressPercentage()}>
      <TimeWrapper>
        <span>{`${formattedMinutes}:${formattedSeconds}`}</span>
      </TimeWrapper>
      {renderButton()}
    </Container>
  )
}
