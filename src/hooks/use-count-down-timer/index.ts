import { useEffect, useState } from 'react'
import { msToMinutesAndSeconds } from '~/utils/time'

const ONE_SECOND_IN_MS = 1000
const END_COUNTING_MS = 0

export function useCountdownTimer() {
  const [isRunning, setisRunning] = useState(false)
  const [startTimeInMs, setStartTimeInMs] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [counterInterval, setCounterInterval] = useState<NodeJS.Timer | null>(
    null
  )
  const [onEndReachCallback, _setOnEndReachCallback] = useState<() => void>()
  const setOnEndReachCallback = (cb?: () => void) =>
    _setOnEndReachCallback(() => cb)

  const hasReachedTheEnd = timeLeft <= END_COUNTING_MS

  useEffect(() => {
    if (hasReachedTheEnd && counterInterval) {
      clearInterval(counterInterval)
      setCounterInterval(null)
      setisRunning(false)
    }
  }, [hasReachedTheEnd, counterInterval, isRunning])

  useEffect(() => {
    if (hasReachedTheEnd && isRunning) {
      onEndReachCallback?.()
    }
  }, [hasReachedTheEnd, onEndReachCallback])

  function start() {
    if (isRunning) return

    setisRunning(true)

    const calculateRemainingTime = () => {
      setTimeLeft(t => t - ONE_SECOND_IN_MS)
    }

    const interval = setInterval(calculateRemainingTime, ONE_SECOND_IN_MS)

    setCounterInterval(interval)
    return () => clearInterval(interval)
  }

  function pause() {
    setisRunning(false)

    if (!counterInterval) return

    clearInterval(counterInterval)
  }

  function reset() {
    setCounterInterval(null)
    setTimeLeft(startTimeInMs)
    setisRunning(false)

    if (!counterInterval) return

    clearInterval(counterInterval)
  }

  function setStartTime(duration: number) {
    if (isRunning) return

    setStartTimeInMs(duration)
    setTimeLeft(duration)
  }

  return {
    start,
    pause,
    reset,
    setStartTime,
    isRunning,
    setOnEndReachCallback,
    timeLeftInMilliseconds: timeLeft,
    formattedTimeLeft: msToMinutesAndSeconds(timeLeft)
  }
}
