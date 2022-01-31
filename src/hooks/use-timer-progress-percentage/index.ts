import { useCallback } from 'react'
import { UseTimerProgressPercentageParams } from './types'

export default function useTimerProgressPercentage({
  timeLeftInMinutes,
  currentTaskDurationInMinutes
}: UseTimerProgressPercentageParams) {
  const getProgressPercentage = useCallback(() => {
    const progress = currentTaskDurationInMinutes - timeLeftInMinutes
    return (progress / currentTaskDurationInMinutes) * 100
  }, [timeLeftInMinutes])

  return { getProgressPercentage }
}
