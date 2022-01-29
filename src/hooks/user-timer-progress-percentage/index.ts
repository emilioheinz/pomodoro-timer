import { useCallback } from 'react'
import { UseTimerProgressPercentageParams } from './types'

export default function useTimerProgressPercentage({
  minutesLeft,
  secondsLeft,
  currentTaskDurationInMinutes
}: UseTimerProgressPercentageParams) {
  const getProgressPercentage = useCallback(() => {
    const timeLeftInMinutes = minutesLeft + secondsLeft / 60
    const progress = currentTaskDurationInMinutes - timeLeftInMinutes
    return (progress / currentTaskDurationInMinutes) * 100
  }, [minutesLeft, secondsLeft])

  return { getProgressPercentage }
}
