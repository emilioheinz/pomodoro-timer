import Head from 'next/head'
import { useEffect } from 'react'
import Button from '~/components/button'
import { ButtonTypes } from '~/components/button/types'
import Timer from '~/components/timer'
import { useCountdownTimer } from '~/hooks/use-count-down-timer'
import { Container } from '~/styles/pages/home'

export default function Home() {
  const { formattedTimeLeft, isTimerRunning, setStartTime, start, reset } =
    useCountdownTimer()

  useEffect(() => {
    setStartTime(100000)
  }, [])

  return (
    <div>
      <Head>
        <title>Pomodoro Timer</title>
      </Head>

      <main>
        <Container>
          <Timer timeLeft={formattedTimeLeft} />
          <Button
            label={isTimerRunning ? 'Parar' : 'Começar'}
            onClick={isTimerRunning ? reset : start}
            type={isTimerRunning ? ButtonTypes.outlined : ButtonTypes.solid}
          />
        </Container>
      </main>
    </div>
  )
}
