import { Container, Time } from './styles'

interface TimerPropTypes {
  timeLeft: string
}

export default function Timer({ timeLeft = '00:00' }: TimerPropTypes) {
  return (
    <Container>
      <Time>{timeLeft}</Time>
    </Container>
  )
}
