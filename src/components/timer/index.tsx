import { FaPlay, FaPause } from 'react-icons/fa'
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
  const { minutes: formattedMinutes, seconds: formattedSeconds } =
    toMinutesAndSeconds({ hours, minutes, seconds })

  function renderButton() {
    if (isRunning) return <IconButton Icon={FaPause} onClick={onPause} />

    return <IconButton Icon={FaPlay} onClick={onResume} />
  }

  return (
    <Container progressPercentage={10}>
      <TimeWrapper>
        <span>{`${formattedMinutes}:${formattedSeconds}`}</span>
      </TimeWrapper>
      {renderButton()}
    </Container>
  )
}
