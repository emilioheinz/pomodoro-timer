import Head from 'next/head'
import { useEffect } from 'react'
import { IconButton } from '~/components/icon-button'
import { FaPlay, FaPause, FaStop } from 'react-icons/fa'
import Timer from '~/components/timer'
import { useCountdownTimer } from '~/hooks/use-count-down-timer'
import { ButtonsContainer, Container } from '~/styles/pages/home'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Pomodoro Timer</title>
      </Head>

      <main>
        <Container>
          <Timer />
        </Container>
      </main>
    </div>
  )
}
