import React from 'react'

export type TimerContextValues = {
  isRunning: boolean
  formattedTimeLeft: string
  progressPercentage: number
  start?: () => void
  reset?: () => void
  pause?: () => void
  setOnEndReachCallback?: (cb?: () => void) => void
  setCurrentTaskDuration?: (duration: number) => void
}

export type TimerContextProviderProps = {
  children: React.ReactNode
}
