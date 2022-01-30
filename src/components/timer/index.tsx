import { FaPlay, FaPause } from 'react-icons/fa'
import { useTimerContext } from '~/contexts/timer'
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
  onPause,
  onResume
}: TimerProps) {
  const { currentTask } = useTimerContext()

  const { minutes: formattedMinutes, seconds: formattedSeconds } =
    toMinutesAndSeconds({ hours, minutes, seconds })

  const { getProgressPercentage } = useTimerProgressPercentage({
    currentTaskDurationInMinutes: currentTask.duration,
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
