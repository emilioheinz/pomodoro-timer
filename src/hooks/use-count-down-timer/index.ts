import { useEffect, useState } from 'react'
import { msToMinutesAndSeconds } from '~/utils/time'

const ONE_SECOND_IN_MS = 1000
const END_COUNTING_MS = 0

export function useCountdownTimer(onEndReachCallback?: () => void) {
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [startTimeInMs, setStartTimeInMs] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [counterInterval, setCounterInterval] = useState<NodeJS.Timer | null>(
    null
  )

  const hasReachedTheEnd = timeLeft <= END_COUNTING_MS

  useEffect(() => {
    if (hasReachedTheEnd && counterInterval) {
      clearInterval(counterInterval)
      setCounterInterval(null)
      setIsTimerRunning(false)
    }
  }, [hasReachedTheEnd, counterInterval])

  useEffect(() => {
    if (hasReachedTheEnd) {
      onEndReachCallback?.()
    }
  }, [hasReachedTheEnd, onEndReachCallback])

  function start() {
    if (isTimerRunning) return

    setIsTimerRunning(true)

    const calculateRemainingTime = () => {
      setTimeLeft(t => t - ONE_SECOND_IN_MS)
    }

    const interval = setInterval(calculateRemainingTime, ONE_SECOND_IN_MS)

    setCounterInterval(interval)
    return () => clearInterval(interval)
  }

  function pause() {
    setIsTimerRunning(false)

    if (!counterInterval) return

    clearInterval(counterInterval)
  }

  function reset() {
    setCounterInterval(null)
    setTimeLeft(startTimeInMs)
    setIsTimerRunning(false)

    if (!counterInterval) return

    clearInterval(counterInterval)
  }

  function setStartTime(duration: number) {
    if (isTimerRunning) return

    setStartTimeInMs(duration)
    setTimeLeft(duration)
  }

  return {
    start,
    pause,
    reset,
    setStartTime,
    isTimerRunning,
    timeLeftInMilliseconds: timeLeft,
    formattedTimeLeft: msToMinutesAndSeconds(timeLeft)
  }
}
